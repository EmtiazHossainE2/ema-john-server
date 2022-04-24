//1
const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000 

//3 
const cors = require('cors');

//4 middleware
app.use(cors())
app.use(express.json())

//5 from mongodb 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4nssg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('mongo is connected');
  // perform actions on the collection object
  client.close();
});



//2
app.get('/' , (req,res) => {
    res.send("Ema john server running")
})

app.listen(port , ()=> {
    console.log("Ema john running on ", port);
})