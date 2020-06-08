const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlers engine and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('/', (req, res) => {
//     console.log('This is the req header ' + req.headers)
// })


// app.use('', (req, res, next) => {
//     console.log(req);
//     next();
// })

app.get('', (req, res)  => {
    res.render('index', {
        title: 'Weather App',
        name:'Adeola Onads'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Adeola Onads'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is a help page',
        name: 'Adeola Onads'
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Adeola Onads',
        errorMessage: 'Help article not found',
        
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={} ) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
    // res.send({
    //     forecast: 'It is a sunny day',
    //     location: 'Abuja',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
       return res.send({
            error:' You must provide a seacrh term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('*', (req, res) => {
    res.sendStatus(500)
})
// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Adeola Onads',
//         errorMessage: 'Page not found',
        
//     })
// })



app.get('/help/*', (req, res) => {
    res.send('Help article not found')
})

app.get('*', (req, res) => {
    res.send('My 404 Page')
})

// console.log(__dirname)
// console.log(__filename)

// console.log(path.join(__dirname, '../public'))

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'Adeola',
//             age: 27
//         },
//         {
//             name: 'Opeyemi',
//             age: 28
//         }
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>This is the About page</h1>')
// })




app.listen(port, () => {
    console.log('Server is up on port ' + port);
})

//app.com
//app.com/help
//app.com/about

