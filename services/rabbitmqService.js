const amqp = require('amqplib')
const { rabbitmqUri } = require('../config/rabbitmq')

class RabbitmqService {
    constructor() {
        this.connection = null,
        this.channel = null
        this.connect()
    }

    async connect() {
        try {
            this.connection = await amqp.connect(rabbitmqUri)
            this.channel = await this.connection.createChannel()
            console.log('RabbitMQ connection established successfully.')
            return this.connection
        } catch (error) {
            console.error('Error in RabbitMQ connection:', error)
            throw error
        }
    }

    async publishMessage(queue, message) {
        try {
            if (!this.connection || !this.channel) {
                this.connect
            }
            const res = await this.channel.assertQueue(queue, {durable: true})
            this.channel.sendToQueue(queue, Buffer.from(message))
            console.log(`Message sent to queue ${queue}: ${message}`)
        } catch (error) {
            console.error('Error in publishing message:', error)
            throw error
        }
    }

    async close() {
        if (!this.connection) {
            console.log('No RabbitMQ conenction to close.')
            return
        }

        await this.connection.close()
        console.log('RabbitMQ connection closed successfully.')
    }
}

module.exports = RabbitmqService