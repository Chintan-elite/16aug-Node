const axios = require("axios")


const getGeocode = (city) => {

    return new Promise((resolve, reject) => {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=faed4d9eb29d483a866000c901ccb680`;

        axios.get(url).then(result => {
            const data = result.data.results[0].geometry;
            const city = result.data.results[0].formatted
            const lat = data.lat;
            const lng = data.lng;

            // console.log(`
            // city : ${city}
            // lat : ${lat},
            // lng : ${lng}`);

            // callback(undefined, {
            //     city: city,
            //     lat: lat,
            //     lng: lng
            // })

            return resolve({
                city: city,
                lat: lat,
                lng: lng
            })


        }).catch(err => {
            //console.log(err);
            // callback(err)
            return reject(err)
        })
    })


}


module.exports = { getGeocode }
