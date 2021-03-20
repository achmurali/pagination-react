const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const dataRouter = require('./controllers/dataService');
const logger = require('./logger')
const app = express()

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

mongoose.set('debug', true);
app.use('/data', dataRouter);

app.get('/', (req, res) => {
    res.send('Hello World')
})

module.exports = app