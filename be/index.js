const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const userApi = require('./api/user.js')

const port = 3001;
const app = express()
const jsonParser = bodyParser.json()

app.use(cors());

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

userApi(app, jsonParser)

app.put('/user', (req, res) => res.send('Rework, Sapience'))

app.get('/', function (req, res) {

  res.send('Run success.')
})

app.listen(port)
console.log('Running on :  http://localhost:'+port)








































