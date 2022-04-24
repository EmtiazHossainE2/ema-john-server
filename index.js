//1
const express = require('express');
const app = express()
const port = process.env.PORT || 5000 


//2
app.get('/' , (req,res) => {
    res.send("Ema john server running")
})

app.listen(port , ()=> {
    console.log("Ema john running on ", port);
})