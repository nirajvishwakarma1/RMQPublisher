require('dotenv').config()

module.exports = {
    rabbitmqUri: process.env.RMQ_CONN_URL || 'amqp://127.0.0.1:5672'
}