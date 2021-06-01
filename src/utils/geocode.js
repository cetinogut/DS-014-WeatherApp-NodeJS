const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=1&access_token=pk.eyJ1IjoiY29ndXQiLCJhIjoiY2twODA4cHk3MDVodTJucG54bndnYTA3NSJ9.KGxUKPjrDe54pGFLk48tVQ';

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.message || body.message == 'Forbidden' || body.features.length === 0){ // if in ilk iki bölümü mapbox api deki . ? gibi bir karakter ile yer arandığında meydana gele nçökmeyi engellemek için eklendi
            callback('Unable to find location.Try another search.', undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1], // search term i birşey geitrmeyince features undefined olacak. undefined in [0] ı da hata verecek bunu önlemek için yukarıda features[] in length ini kontro lediyoruz.
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            } )
        }
    });
}

module.exports = geocode;
