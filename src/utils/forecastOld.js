
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

    request({ url: url, json: true}, (error, response) => {
        if(error){
            callback('unable to connect to weather service...!', undefined)
        } else if (response.body.error){
            callback('Unable to find location.Try another search.', undefined)
        } else{
            callback(undefined, (response.body.current.weather_descriptions[0] + `. It is currently ${response.body.current.temperature} degrees out there. It feels like ${response.body.current.feelslike} out`))
        }

    });
}

module.exports = forecast;

// const url = 'http://api.weatherstack.com/current?access_key=baf1c913844086a0c29764a26689eb91&query=37.8367,-122.4233&units=f';

// request({ url: url, json: true}, (error, response) => { // error veya response tan aynı anda sadece bir object olabilir, diğeri undefined tir.
//     //console.log(response);
//     //const data = JSON.parse(response.body); // yukarıda json:true yapınca artık parse etmeye gerek kalmayacak, otomatik olarak yapılacak
//     //console.log(data);
//     //console.log(data.current);
//     //console.log(response.body.current);

//     //console.log(error);
//     if(error){ // bu error OS ten gelir deri nseviye
//         console.log('unable to connect to weather service...')
//     } else if(response.body.error){ // bu error ise servisten geliyor, query string de hata var..
//         console.log('unable to find the location...')
//     }
//     else {
//         console.log( response.body.current.weather_descriptions[0] + `. It is currently ${response.body.current.temperature} degrees out there. It feels like ${response.body.current.feelslike} out`);
//     }
// } )