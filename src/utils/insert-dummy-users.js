const MongoDBConnection = require('../connection/MongoDBConnection')
const { generateDummyUserData } = require('../utils/generate-dummy-users')

const insertDummyUsers = async (number = 5) => {
    const mongoConnection = new MongoDBConnection()
    
    try {
        await mongoConnection.connect()
        const db = mongoConnection.getDB()

        const users = generateDummyUserData(number)
        const result = await mongoConnection.insertMany('users', users)
        return result
    } catch (error) {
        console.error('Error:', error)
    } finally {
        await mongoConnection.close()
    }
}


module.exports = {
    insertDummyUsers
}