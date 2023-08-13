
import express from 'express';
import weaviate from 'weaviate-client';
import dotenv from 'dotenv';
import fs from 'fs';
import cors from "cors"
import bodyParser from "body-parser"
import { db } from "./firebase.js"

dotenv.config();

const { SCHEMA_CREATED, IMAGES_LOADED } = process.env;

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
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
    if (SCHEMA_CREATED) {
        console.log('Schema already created');
        return;
    }

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

app.get('/test', (req, res) => { res.send('Hello World!') })

// @TODO Change it after the frontend is ready

app.get('/api', async (req, res) => {
    const test = Buffer.from(fs.readFileSync('./test/test.jpg')).toString('base64');

    fs.writeFileSync('./test/test.txt', test);



    const resImage = await client
        .graphql
        .get()
        .withClassName("FashionY")
        .withFields(['image'])
        .withNearImage({ image: test })
        .withLimit(2)
        .do()



    const res1 = resImage.data.Get.Fashion[0].image
    const res2 = resImage.data.Get.Fashion[1].image

    const res1Buffer = Buffer.from(res1, 'base64');
    const res2Buffer = Buffer.from(res2, 'base64');

    fs.writeFileSync('./test/res1.jpg', res1Buffer);
    fs.writeFileSync('./test/res2.jpg', res2Buffer);

    res.send({ "done": "done" })

});

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

app.post("/related-products/:cnt", async (req, res) => {
    const { cnt } = req.params
    const { base64Image } = req.body


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
        console.log(productID)
        const productData = await db.collection("metadata").where("productID", "==", productID).get()
        const product = productData.docs[0].data()
        products.push(product)

    }

    res.send(products)
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


    newfiles.forEach(async (file) => {

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

        console.log(res)
    })
}

// loadImages()
// temp()
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




