const RabbitMQConnection = require('./src/connection/RabbitMQConnection')
const { getUserData } = require('./src/utils/get-user-data')

;(async _ => {
    const rabbitMQConnection = new RabbitMQConnection()
    try {
        // Connect to RabbitMQ
        await rabbitMQConnection.connect()
    
        // Publish a message
        const users = await getUserData({synced: 0}, 2)
    
        const queue = 'persons'
    
        if (Array.isArray(users)) {
            for (user of users) {
                const message = JSON.stringify(user)
                await rabbitMQConnection.publishMessage(queue, message)
            }
        } else {
            const message = JSON.stringify(users)
            await rabbitMQConnection.publishMessage(queue, message)
        }
    } catch (error) {
        console.error(error)
    } finally {
        await rabbitMQConnection.close()
    }
})()
