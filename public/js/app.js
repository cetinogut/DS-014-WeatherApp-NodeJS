console.log('Client side JS file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => { // fetch data from this url and then run this method
    response.json().then( (data) => {
        console.log(data)
    })
})

/* fetch('http://api.weatherstack.com/current?access_key=baf1c913844086a0c29764a26689eb91&query=boston&units=f').then((response) => { // fetch data from this url and then run this method
    response.json().then( (data) => {
        console.log(data)
    })
}) */

// b ıfetch ile browser in console ine yazdırabiliyoruz. Test için kullanabiliriz.
//fetch('http://localhost:3000/weather?address=!').then((response) => { // fetch data from this url and then run this method
fetch('/weather?address=!').then((response) => { // heroku ya deploy ederken burayı local host tan kurtararak generik hale getirdik.
    response.json().then( (data) => { // we get the parsed json data
        console.log(data)
        if(data.error){
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }


    })
})

const weatherForm = document.querySelector('form') // html deki form elemanı için
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => { // bu listener html deki submit elemnını dinleyecek, e event object için kısaltmadır.
    e.preventDefault() // default olarak refresh browser behaviorunu engelelemek için yazdık

    const location = search.value
    console.log(location) // browser console a yazacak
    messageOne.textContent = 'Loading...' // birinci p ye yazacak id message-1
    messageTwo.textContent = '' // ikinci p ye yazacak

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error) // browser console a yazacak
                messageOne.textContent = data.error  // birinci p ye yazacak id message-1
            } else {
                console.log(data.location) // browser console a yazacak
                console.log(data.forecast) // browser console a yazacak
                messageOne.textContent = data.location // birinci p ye yazacak id message-1
                messageTwo.textContent = data.forecast // ikinci p ye yazacak
            }
        })
    })
})

// app.js:33 Uncaught TypeError: Cannot read property 'addEventListener' of null
// bu hata index.html içindeki app.js in body'nin üstünde yer almasından dolayı geliyor. app.js sayfa render edildikten sonra devreye girmeliki oradaki elemanla buton, input field s. ulaşabilsin.
