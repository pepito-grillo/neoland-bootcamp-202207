const { connect, disconnect } = require('mongoose')
const { createLogger } = require('./utils')
const logger = createLogger(module)
const cors = require('cors')

connect('mongodb://localhost:27017/postits')
    .then(() => {
        logger.info('db connected')

        const express = require('express')
        
        const api = express()
        
        const { usersRouter, notesRouter } = require('./routes')   
        
        api.use(cors())
        
        api.get('/', (req, res) => res.send('PostIts API v1.0 ;)'))

        api.use('/api', usersRouter, notesRouter)

        api.listen(8080, () => logger.info('api started'))

        process.on('SIGINT', () => {
            if (!process.stopped) {
                process.stopped = true

                logger.info('\napi stopped')

                disconnect()
                    .then(() => {
                        logger.info('db disconnected')

                        process.exit(0)
                    })
            }
        })
    })
    .catch(error => {
        logger.error(error)
    })