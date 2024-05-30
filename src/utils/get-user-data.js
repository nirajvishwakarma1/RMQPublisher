const MongoDBConnection = require('../connection/MongoDBConnection')
const { insertDummyUsers } = require('../utils/insert-dummy-users')
require('dotenv').config()

const getUserData = async (query = {}, limit = 10) => {
    const mongoConnection = new MongoDBConnection()
    
    try {
        await mongoConnection.connect()
        const db = mongoConnection.getDB()

        let users = await db.collection('users').find(query).limit(limit).toArray()
        if (0 == users.length) {
            await insertDummyUsers(limit)
            users = await getUserData(query, limit)
        }
        return users
    } catch (error) {
        console.log('Error:', error)
    } finally {
        await mongoConnection.close()
    }
}

module.exports = {
    getUserData
}