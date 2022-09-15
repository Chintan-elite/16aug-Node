const axios = require("axios")


const getWeatherData = (lat, lng, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=64d523d203504ad1495a20a4bd72c842&units=metric`;

    axios.get(url).then(result => {
        const main = result.data.main
        const temp = main.temp;
        const pressure = main.pressure;
        const humidity = main.humidity

        // console.log(`

        // Temp : ${temp},
        // Pressure : ${pressure},
        // Humidity : ${humidity}

        // `);

        callback(undefined, {
            Temp: temp,
            Pressure: pressure,
            Humidity: humidity
        })



    }).catch(err => {
        callback(err)
    })

}

module.exports = { getWeatherData }

