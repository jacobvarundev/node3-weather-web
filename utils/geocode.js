const request = require('request')
const key='pk.eyJ1Ijoic2luZ2hrb3JhIiwiYSI6ImNrMG1uZXkwbDE4bGszaG80b3dwYnE4eWIifQ.PkyJHyaJqO2ihEviNUAAHA';
const limit=1;
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${key}&limit=${limit}`
    console.log(url);
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode