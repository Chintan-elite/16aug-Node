const express = require("express")
const app = express()
const PORT = 9000
const Razorpay = require('razorpay');
const cors = require("cors")
app.use(cors())

app.get("/payment", async (req, resp) => {

    var amt = Number(req.query.amt);

    var instance = new Razorpay({ key_id: 'rzp_test_D7fyiKPK2FeOfs', key_secret: 'quU8u1CxPEdpXCeabbyVjiQ2' })

    var order = await instance.orders.create({
        amount: amt * 100,
        currency: "INR",
        receipt: "order_rcptid_11"
    })

    // resp.json({
    //     "success": true,
    //     order
    // })
    resp.send(order)


})


app.listen(PORT, () => {
    console.log("server running on port : " + PORT);
})
