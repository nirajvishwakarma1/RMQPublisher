const RabbitmqService = require('./services/rabbitmqService')
const UserController = require('./controllers/userController')

;(async _ => {
    const rabbitmqService = new RabbitmqService()
    const userController = new UserController()
    try {
        // Connect to RabbitMQ
        await rabbitmqService.connect()
    
        // Publish a message
        const users = await userController.getUsers({synced: 0}, 2)
        const queueName = 'persons'
    
        if (Array.isArray(users)) {
            for (user of users) {
                const message = JSON.stringify(user)
                await rabbitmqService.publishMessage(queueName, message)
            }
        } else {
            const message = JSON.stringify(users)
            await rabbitmqService.publishMessage(queueName, message)
        }
    } catch (error) {
        console.error(error)
    } finally {
        await rabbitmqService.close()
    }
})()
