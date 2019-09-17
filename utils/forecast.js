const request = require('request')
const token='17bee7522073a2efe3e65e16cbd4d136';
const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${token}/${latitude},${longitude}`
    console.log(url);
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast