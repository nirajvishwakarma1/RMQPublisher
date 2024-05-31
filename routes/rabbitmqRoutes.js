const express = require('express')
const router = express.Router()
const RabbitMQService = require('../services/rabbitmqService')

const rabbitmqService = new RabbitMQService()

// Route to publish a message
router.post('/publish', async (req, res) => {
    try {
        const queueName = 'persons'
        
        if (!req.body || 0 === Object.keys(req.body).length) {
            console.log('Request body is empty.')
            res.status(400).send({error: 'Empty request body.'})
        }

        // Publish the message to the queue
        if (Array.isArray(req.body)) {
            for (user of req.body) {
                const message = JSON.stringify(user)
                await rabbitmqService.publishMessage(queueName, message)
            }
        } else {

            const message = JSON.stringify(req.body)
            await rabbitmqService.publishMessage(queueName, message)
        }

        console.log('Message published to RabbitMQ')
        res.status(200).send({message: 'Message published to RabbitMQ'})
    } catch (error) {
        console.log('Error publishing message to RabbitMQ:', error)
        res.status(500).send({error: 'Internal server error'})
    }
})

module.exports = router