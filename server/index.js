const express = require('express');
const weaviate = require('weaviate-client');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const { SCHEMA_CREATED, IMAGES_LOADED } = process.env;

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
})

const schemaConfig = {
    'class': 'Fashion',
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
            'name': 'productID',
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

// @TODO Change it after the frontend is ready

app.get('/api', async (req, res) => {
    const test = Buffer.from(fs.readFileSync('./test/test.jpg')).toString('base64');
    const resImage = await client
        .graphql
        .get()
        .withClassName("Fashion")
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

const PORT = process.env.PORT || 5000;

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
            .withProperties({ image: bg4, productID: file })
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

loadImages()
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




