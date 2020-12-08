const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://amd597:K6T5rswZJtpWWaTJ@cluster0-shard-00-00.ktqxt.mongodb.net:27017,cluster0-shard-00-01.ktqxt.mongodb.net:27017,cluster0-shard-00-02.ktqxt.mongodb.net:27017/listking?ssl=true&replicaSet=atlas-10myl8-shard-0&authSource=admin&retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {
       const db = client.db("listking")
       const listCollection = db.collection("lists")
       console.log("Connected to Mongodb")
      
        app.get("/", (req, res) => {
           db.collection("lists").find().toArray()
           .then(results => {
            console.log(results)
            res.render("index.ejs", {lists: results})
        
           })
        })   
        
       app.post("/lists", (req, res) => {
           listCollection.insertOne(req.body)
           .then(result => {
               res.redirect("/")
           })

       
        })

        app.delete("/lists", (req, res) => {
            listCollection.deleteOne(
                { name: req.body.name }
            )
            .then(result => {
                res.json('Deleted Item')
            })

        })
        
        }) 
    .catch(error => console.error(error))
    





app.listen(3000, function(){
    console.log('Listening on port 3000.')
})