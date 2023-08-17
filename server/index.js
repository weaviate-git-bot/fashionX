
import express from 'express';
import weaviate from 'weaviate-client';
import dotenv from 'dotenv';
import fs from 'fs';
import cors from "cors"
import bodyParser from "body-parser"
import axios from 'axios';
import { db } from "./firebase.js"
import pbkdf2 from 'pbkdf2';
import stripe from "stripe"






dotenv.config();

const stripeInstance = stripe(process.env.STRIPE_PRIVATE_KEY)


const { SCHEMA_CREATED, IMAGES_LOADED } = process.env;

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8081',
})

const schemaConfig = {
    'class': 'FashionY',
    'vectorizer': 'img2vec-neural',
    'vectorIndexType': 'hnsw',
    'moduleConfig': {
        'img2vec-neural': {
            'imageFields': ['image'],
        }
    },
    'properties': [
        {
            'name': 'image',
            'dataType': ['blob'],
            'description': 'The image of the fashion item',
        },
        {
            'name': 'product_id',
            'dataType': ['string'],
            'description': 'The product ID of the fashion item',
        }
    ]
}

async function createSchema() {


    const schemaRes = await client
        .schema
        .classCreator()
        .withClass(schemaConfig)
        .do()

    console.log(schemaRes);
}



const app = express();
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(bodyParser.json({ limit: "50mb" }))



app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: "https://localhost:3000/success",
            cancel_url: "https://knowyourmeme.com/failure",
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.productName
                        },
                        unit_amount: item.productPrice * 100,

                    },
                    quantity: 1
                }
            })
        })
        res.json({ url: session.url })
    } catch (error) {
        console.log(error)
        res.status(500).send("error")
    }
})


app.get("/frontpage/:count", async (req, res) => {
    //get random images from the database

    const count = req.params.count
    const data = await db.collection("metadata").get()
    const images = data.docs.map(doc => doc.data())
    const randomImages = []
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * images.length)
        randomImages.push(images[randomIndex])
    }
    res.send(randomImages)
})

async function getRelatedProducts(base64Image, cnt) {
    const resImage = await client
        .graphql
        .get()
        .withClassName("FashionY")
        .withFields(['image', 'product_id'])
        .withNearImage({ image: String(base64Image) })
        .withLimit(cnt)
        .do()

    const products = []

    for (let i = 0; i < resImage.data.Get.FashionY.length; i++) {
        const productID = resImage.data.Get.FashionY[i].product_id
        const productData = await db.collection("metadata").where("productID", "==", productID).get()
        const product = productData.docs[0].data()
        products.push(product)

    }

    return products;

}


async function convertImageToBase64(imageUrl) {
    let image = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    return Buffer.from(image.data).toString('base64');

}

app.post("/related-products/:cnt", async (req, res) => {
    const { cnt } = req.params
    const { image_url } = req.body
    const base64Image = await convertImageToBase64(image_url)

    const products = await getRelatedProducts(base64Image, cnt)

    res.send(products.slice(1))


})

app.get("/product/:productID", async (req, res) => {
    const { productID } = req.params
    const productData = await db.collection("metadata").where("productID", "==", productID).get()
    const product = productData.docs[0].data()
    res.send(product)
})

function getAuthenticationHeader(public_key, secret_key) {

    let time = parseInt(Date.now() / 1000);
    var derivedKey = pbkdf2.pbkdf2Sync(secret_key, time.toString(), 128, 32, 'sha256');
    derivedKey = derivedKey.toString('hex');

    return {
        "public_key": public_key,
        "one_time_code": derivedKey,
        "timestamp": time,
    }
}

app.get("/models", async (req, res) => {
    const headers = getAuthenticationHeader("46933177823fe9817e394f404b278836", "3f37d756fa4fed2b5694e673ce422cee")
    const { data } = await axios.get("https://api.revery.ai/console/v1/get_model_list", {
        headers
    })

    const models = []

    for (let i = 0; i < data.model_files.length; i++) {
        models.push({
            url: `https://media.revery.ai/generated_model_image/${data.model_files[i]}.png`,
            model_id: data.models[i]
        })
    }

    res.send(models)
})

app.post("/virtual-try-on", async (req, res) => {
    const { imageURL, modelID } = req.body
    const headers = getAuthenticationHeader("46933177823fe9817e394f404b278836", "3f37d756fa4fed2b5694e673ce422cee")

    const { data } = await axios.post("https://api.revery.ai/console/v1/process_new_garment", {
        "category": "tops",
        "gender": "male",
        "garment_img_url": imageURL
    }, { headers })


    const resp = await axios.post("https://api.revery.ai/console/v1/request_tryon",
        {
            "garments": {
                "tops": data.garment_id,
                "bottoms": "46933177823fe9817e394f404b278836_T1t5aLqZHK7q"
            },
            "model_id": modelID,
            "background": "studio"
        }, { headers })

    res.send(`https://media.revery.ai/generated_model_image/${resp.data.model_metadata.model_file}.png`)

})


app.post("/prompt", async (req, res) => {
    // const prompt = {
    //     "prompt": req.body.prompt,
    //     "n": 1,
    //     "size": "1024x1024"
    // }

    // const { data } = await axios.post("https://api.openai.com/v1/images/generations", prompt, {
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    //     }
    // })

    // const imageUrl = data.data[0].url
    // const base64Image = await convertImageToBase64(imageUrl)

    // const relatedProducts = await getRelatedProducts(base64Image, 3)

    res.send({
        "image_url": "https://www.nicepng.com/png/detail/802-8027356_fashion-clipart-fashion-icon-fashion-icon-png.png",
        // "related_products": relatedProducts
    })

})




const PORT = process.env.PORT || 8080;



async function loadImages() {

    if (IMAGES_LOADED) {
        console.log('Images already loaded');
        return;
    }

    const dir = './img';
    const fs = require('fs');
    const files = fs.readdirSync(dir);
    files.forEach(async (file) => {
        const fileData = fs.readFileSync(`${dir}/${file}`);
        const bg4 = Buffer.from(fileData).toString('base64');
        const res = await client.data.creator().withClassName("Fashion")
            .withProperties({ image: bg4, "product_id": file })
            .do()

        console.log(res)
    })
}

createSchema()
    .then(() => {
        console.log('Schema created');
    })
    .catch((err) => {
        console.log(err);
    });


const temp = async () => {

    const dir = "./images"
    const files = fs.readdirSync(dir);
    const newfiles = files.filter(file => !file.endsWith(".json")).map(file => file.substring(0, file.lastIndexOf(".")))


    newfiles.forEach(async (file, i) => {

        // const imageMetaData = fs.readFileSync(`${dir}/${file}.json`);
        // const imageMetaDataJson = JSON.parse(imageMetaData);
        // imageMetaDataJson.productID = file

        // db.collection("metadata").add(imageMetaDataJson)
        console.log(file)

        const imageData = fs.readFileSync(`${dir}/${file}.jpg`);
        const bg4 = Buffer.from(imageData).toString('base64');
        const res = await client.data.creator().withClassName("FashionY")
            .withProperties({ image: bg4, "product_id": file })
            .do()

        console.log(`Image ${i} uploaded`)
    })
}



// temp()
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




