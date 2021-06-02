
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=baf1c913844086a0c29764a26689eb91&query=' + latitude  + ',' + longitude   + '&units=f'

    request({ url, json: true}, (error, { body }) => { // url:url idie shorthand için kısalttık, yukarıdaki url variable ile function inki aynı olmalı
                                // error yanında response object olarak vardı ve bunun hepsini çağırıyorduk ama aslında aşağıda sadece body ye ihtiyacımız var. Bu durumda {body} doğrudan tanımlayabiliriz.
        if(error){
            callback('unable to connect to weather service...!', undefined)
        } else if (body.error){
            callback('Unable to find location.Try another search.', undefined)
        } else{
            callback(undefined, (body.current.weather_descriptions[0] + `. It is currently ${body.current.temperature} degrees out there. It feels like ${body.current.feelslike} out.. The humidity is ${body.current.humidity} and pressure is ${body.current.pressure} `))
        }
    });
}

module.exports = forecast;

