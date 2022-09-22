const express = require("express")
const app = express();
const dotenv = require("dotenv")
dotenv.config();
const PORT = process.env.PORT
const path = require("path")
const hbs = require("hbs")
const geocode = require("../util/geocode")
const wather = require("../util/weatherdata")

const viewPath = path.join(__dirname, "../templetes/views")
const publicpath = path.join(__dirname, "../public")

app.use(express.static(publicpath))

app.set("view engine", "hbs")
app.set("views", viewPath)

app.get("/", (req, resp) => {
    resp.render("home")
})

app.get("/weatherdata", (req, resp) => {

    const city = req.query.location

    geocode.getGeocode(city, (err, data) => {
        if (err)
            return console.log(err);


        wather.getWeatherData(data.lat, data.lng, (err, tdata) => {


            console.log(`

            city : ${data.city},
            lat : ${data.lat},
            lng : ${data.lng},
            Temp : ${tdata.Temp},
            Pressure : ${tdata.Pressure},
            humidity : ${tdata.Humidity}

            `);

        })

    })


})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

