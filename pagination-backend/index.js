const app = require('./app')
const config = require('./config')
const http = require('http')
const logger = require('./logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})