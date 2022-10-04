const geocode = require("./geocode")
const weatherdata = require("./weatherdata")
const city = process.argv[2];


geocode.getGeocode(city).then(result => {
    console.log(result);
    return weatherdata.getWeatherData(result.lat, result.lng)
}).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
})

