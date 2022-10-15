const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const url = "mongodb://127.0.0.1:27017/backup";

MongoClient.connect(url).then(client => {
    console.log("DB connected");

    const db = client.db("backup")

    // db.createCollection("user").then(result => {
    //     console.log("collection creted");
    // })

    const u1 = { name: "Vidhan", email: "vidhan@gmail.com", pass: "v@123", phno: 958635252 };
    const u2 = { name: "Vaibhav", email: "vaibhav@gmail.com", Pass: "v@123", phno: 958635252 };
    const u3 = { name: "Jenish", pass: "v@123", phno: 958635252 };
    const u4 = { name: "dhaval", email: "dhaval@gmail.com", pass: "v@123", };



    // db.collection("user").insertOne(u1).then(result => {
    //     console.log(result);
    // })

    db.collection("user").insertMany([u1, u2, u3, u4]).then(result => {
        console.log(result);
    })




}).catch(err => {
    console.log(err);
})