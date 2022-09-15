const request = require('request')

const forecast = (longitude, latitude, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=cb15331c5e4f2d748c6307f80658a36a&query='+ latitude + ',' + longitude +'&units=f'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect Weatherstack.', undefined)
        } else if (body.error) {
            callback('Please check your coordinates.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out. Humidity is ' + body.current.humidity + '.')
        }
    })
}

module.exports = forecast