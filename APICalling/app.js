const geocode = require("./geocode")
const weatherdata = require("./weatherdata")
const city = process.argv[2];

const weather = () => {
    geocode.getGeocode(city, (err, data) => {
        if (err)
            return console.log(err);


        weatherdata.getWeatherData(data.lat, data.lng, (err, tdata) => {

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



}


weather();
