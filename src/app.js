
const path = require('path') // this is a core module in node.js (core modules comes before npm modules liike express. It is good to be organised)
const express = require('express') // express is loafding a function not an object
const hbs = require('hbs')
const geocode= require('./utils/geocode')// now both geocode and forecast functions are available in app.js
const forecast= require('./utils/forecast') // now we can use these two func. in route handler down for /weather


console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname))
console.log(path.join(__dirname, '../public')) // public in route ını öğrenmmek için yaptık

const app = express()
const port = process.env.PORT ||3000 // heroku nun env den uygun port u alabilmesi için ekledik, local de yine 300 de çalışacak

//define paths for express congfig
const publicDirectoryPath = path.join(__dirname, '../public')
// proje dosyası içinde views diye bir klasör varsa problem yok. Bu default değerdir ve views in içindeki hbsleri çalıştırmaya hazırdır. Ama eğer views başka bir yerede ise veya dı başka birşey ise bu durumda bunu yeniden set etmek ve tanımlamak gerekir
// mesela views i templates in altındaki bir views olarak değiştirelim..
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('views', viewsPath)
//app.set('views', path.join(__dirname, '../templates')) // yukarıdaki iki satırı böyle birleştirebilirdik.
app.set('view engine', 'hbs') // handelbar is set up and ready to use / tells express we are using view engine called hbs
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('/', (req, res) => {
    res.render('index', { // bu index views altındaki index.hbs dir.
        title: 'Dastugo Weather Service',
        name: 'cogut'
    })
})

app.get('/about', (req, res) => {
    res.render('about', { // bu about views altındaki about.hbs dir.
        title: 'ABOUT',
        name: 'cogut'
    })
    console.dir(req.hostname)
    console.dir(req.ip)
})

app.get('/help', (req, res) => {
    res.render('help', { // bu help views altındaki help.hbs dir.
        title: 'HELP',
        messageBody: 'This is a comprehensive help page',
        name: 'cogut'
    })
})

app.get('/weather', (req, res) =>{
    //res.send('welcome to the VİEW WEATHER page')
    console.log(req.query)// prints {} empty object if no seach term provided
    console.log(req.query.search) // prints undefined if no search term provided
    
    if(!req.query.address){// this will run when there is no address provided
        return res.send({ // sending an error object as a response
            error:'You must provide an address item'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} ={}) => {
        
        if(error){
            return res.send( { error })  // return res.send( { error: error})
        }

        forecast( latitude, longitude, ( error, forecastData) => {
            if(error){
                return res.send( { error })  // return res.send( { error: error})
            }

            res.send({
                forecast: forecastData, // 
                location, // shorthand for location: location
                address: req.query.address
            })
        })
    })

    /* res.send({
        forecast:'it is sunny',
        location: 'ankara',
        address: req.query.address
    }) */
})



/* app.get('/products', (req, res) => { // this was a trial handler
    //console.log(req.query)// prints {} empty object if no seach term provided
    //console.log(req.query.search) // prints undefined if no search term provided
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})
 */
app.get('/help/*', (req, res) =>{ // match anything that is not matched in routes
    //res.send('Help article not found')
    res.render('404', { // bu 404 views altındaki 404.hbs dir.
        title: '404',
        errorMessage: 'Help article not found',
        name: 'cogut'
    })
})

app.get('*', (req, res) =>{ // match anything that is not matched in routes
    //res.send('my 404 page')
    res.render('404', { // bu 404 views altındaki 404.hbs dir.
        title: '404',
        errorMessage: 'Page not found',
        name: 'cogut'
    })
})


//start the  server
/* app.listen(3000, () => {
    console.log('Server is running on port 3000...')
}) */

app.listen(port, () => {
    console.log('Server is running on port ' + port + ' ...')
})