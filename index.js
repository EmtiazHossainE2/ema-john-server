//1
const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

//3 
const cors = require('cors');
require('dotenv').config()

//4 middleware
app.use(cors())
app.use(express.json())

//5 from mongodb 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4nssg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//6 
async function run() {
    try {
        //7
        await client.connect();
        const productCollection = client.db("ema-john").collection("product");

        //8
        app.get('/product', async (req, res) => {
            console.log('query', req.query);
            const page = parseInt(req.query.page)
            const pageProduct = parseInt(req.query.pageProduct)
            const query = {}
            const cursor = productCollection.find(query)
            let products;
            if (page || pageProduct) {
                // 0 --> skip: 0 get: 0-10(10): 
                // 1 --> skip: 1*10 get: 11-20(10):
                // 2 --> skip: 2*10 get: 21-30 (10):
                // 3 --> skip: 3*10 get: 21-30 (10):
                products = await cursor.skip(page*pageProduct).limit(pageProduct).toArray()
            }
            else {
                products = await cursor.toArray()
            }
            res.send(products)
        })

        //13 count 
        app.get('/productCollection', async (req, res) => {
            const count = await productCollection.estimatedDocumentCount()
            res.send({ count })
        })

        // 14 use post to get products by ids
        app.post('/productsByKeys' , async(req,res) =>{
            const keys = req.body 
            const ids = keys.map(id => ObjectId(id))
            const query = {_id : {$in : ids}}
            const cursor = productCollection.find(query)
            const products = await cursor.toArray()
            console.log(keys);
            res.send(products)
        })

    }
    finally {

    }
}
run().catch(console.dir);


//2
app.get('/', (req, res) => {
    res.send("Ema john server running")
})

app.listen(port, () => {
    console.log("Ema john running on ", port);
})