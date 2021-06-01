const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=1&access_token=pk.eyJ1IjoiY29ndXQiLCJhIjoiY2twODA4cHk3MDVodTJucG54bndnYTA3NSJ9.KGxUKPjrDe54pGFLk48tVQ';

    request({ url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find location.Try another search.', undefined)
        } else{
            callback(undefined, {
                latitude: response.body.features[0].center[1], // search term i birşey geitrmeyince features undefined olacak. undefined in [0] ı da hata verecek bunu önlemek için yukarıda features[] in length ini kontro lediyoruz.
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            } )
        }

    });
}

module.exports = geocode;

// const geocodeUrl ='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?limit=1&access_token=pk.eyJ1IjoiY29ndXQiLCJhIjoiY2tvdTJyOHVxMDJyeTJvazM2andkb2R3OSJ9.ChxeNgvP1TYTtCYazH398Q';
// request({ url: geocodeUrl, json: true}, (error, response) => {
   
//     //console.log(response.body.features);
//     //console.log(response.body.features[0].center);

    
//     if(error){ // bu error OS ten gelir deri nseviye
//         console.log('unable to connect to location service...')
//     } else if(response.body.message || response.body.features.length === 0){ // bu error ise servisten geliyor, query string de hata var..
//         console.log('unable to find the location... try another search')
//     }
//     else {
//         const latidude = response.body.features[0].center[1]; // search term i birşey geitrmeyince features undefined olacak. undefined in [0] ı da hata verecek bunu önlemek için yukarıda features[] in length ini kontro lediyoruz.
//         const longitude = response.body.features[0].center[0];

//         console.log('Los Angeles Latidute: ' + latidude );
//         console.log('Los Angeles Longitude: ' + longitude);
//     }
    

// } )
