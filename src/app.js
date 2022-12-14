const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocoding')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup heandlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Richa Idnani'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Richa Idnani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'this is a help message.',
        title: 'Help',
        name: 'Richa Idnani'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provider an address parameter.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
             return res.send({
                error,
             })
        }
        forecast(longitude, latitude, (error, forecastData) => {
             if (error) {
                  return res.send({
                    error,
                  })
             }
             res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
           })
   })
    
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Richa Idnani',
        title: '404 Page',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Richa Idnani',
        title: '404 Page',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})