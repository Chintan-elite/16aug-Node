const mongo = require("mongodb")
const MongoClient = mongo.MongoClient;

const url = "mongodb://127.0.0.1:27017/16aug"


MongoClient.connect(url).then(database => {
    //console.log("Db created");
    const dbo = database.db("16aug");

    // dbo.createCollection("user").then(() => {
    //     console.log("collection created");
    // }).catch(err => {
    //     console.log(err);
    // })

    // const dt1 = { name: "Vaibhav", email: "vaibhav@gmail.com", phno: 9088563635 }
    // const dt2 = { name: "Jenish", email: "jenish@gmail.com", phno: 8563524152 }
    // const dt3 = { name: "dhaval", email: "dhaval@gmail.com", phno: 23256987452 }

    // dbo.collection("user").insertOne(dt1).then(result => {
    //     console.log(result);
    // }).catch(err => {
    //     console.log(err);
    // })

    // dbo.collection("user").insertMany([dt1, dt2, dt3]).then(result => {
    //     console.log(result);
    // }).catch(err => {
    //     console.log(err);
    // })

    // dbo.collection("user").find().toArray().then(result => {
    //     console.log(result)
    // }).catch(err => {
    //     console.log(err);
    // })

    // dbo.collection("user").findOne({ name: "Jenish" }).then(result => {
    //     console.log(result.email);
    // }).catch(err => {
    //     console.log(err);
    // })

    dbo.collection("user").deleteOne({name:"Vaibhav"}).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })


}).catch(err => {
    console.log(err);
})
