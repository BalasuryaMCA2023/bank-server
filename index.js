const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('WELCOME TO MONGODB')
})

app.listen(8080,()=>{
    console.log(`server is running ${8080}`);
})
mongoose.connect("mongodb+srv://Balasurya:balasuryamongoDB@cluster0.qatidji.mongodb.net/").then(console.log("MongoDB Connected"))

//create a schema
var newSchema = new mongoose.Schema({
    id:Number,
    name:String,
    email:String,
    password:String,
    amount:Number
})

//model
let Data = mongoose.model('mca',newSchema)

//Create a data for testing
// let data1 = new Data(
//     {
//         // name:"Aravind",
//         // email:"varavindaplur@gmail.com",
//         // password:"Aravind143",
//         // amount:1000
//     }
// )
// data1.save()

app.get('/data',function(req, res){
    Data.find().then((item) => res.send((item)))
  })
  app.post('/create',function(req, res){
    Data.create(req.body).then((item) => res.send((item)))
  })
  app.put('/update/:id',async(req,res)=>{
    console.log(req.params.id);
     console.log(req.body);
   const amount = req.body.amount;
   
  const userUpdate= await Data.findByIdAndUpdate(req.params.id,{amount:amount},{new:true,});
    res.json({
     data:userUpdate
})
})
app.delete('/delete/:id',async(req,res)=>{
    console.log(req.params.id);
    const userDelete= await Data.findByIdAndDelete(req.params.id);
    res.json({
     data:userDelete
})
})