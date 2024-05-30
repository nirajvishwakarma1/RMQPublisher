const amqp = require('amqplib')
require('dotenv').config()

class RabbitMQConnection {
    constructor() {
        this.amqpServer = process.env.RMQ_CONN_URL
        this.connection = null
    }

    async connect() {
        try {
            this.connection = await amqp.connect(this.amqpServer)
            console.log('RabbitMQ connection established successfully.')
            return this.connection
        } catch (error) {
            console.error('Error in RabbitMQ connection:', error)
            throw error
        }
    }

    async close() {
        if (!this.connection) {
            console.log('No RabbitMQ connection to close.')
            return
        }

        await this.connection.close()
        console.log('RabbitMQ connection closed successfully.')
        this.connection = null
    }

    async createChannel() {
        if (!this.connection) {
            await this.connect()
        }
        if (!this.channel) {
            this.channel = await this.connection.createChannel()
        }
        return this.channel
    }

    async publishMessage(queue, message) {
        try {
            const channel = await this.createChannel()
            await channel.assertQueue(queue, {durable: true})
            channel.sendToQueue(queue, Buffer.from(message))
            console.log('Message published successfully.')
        } catch(error) {
            console.error('Error in publishing message:', error)
            throw error
        }
    }
}

module.exports = RabbitMQConnection