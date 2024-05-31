const MongoDBService = require('../services/mongodbService')
const { faker } = require('@faker-js/faker')

class UserController {
    generateDummyUserData(length = 2) {
        const users = []
        for (let i = 0; i < length; i++) {
            const name = faker.internet.displayName()
            const email = faker.internet.email(name)
            const city = faker.location.city()
            const country = faker.location.country()
            const dob = faker.date.birthdate()
            const synced = 0

            users.push({name, email, city, country, dob, synced})
        }
        return users
    }

    insertUserData = async (users) => {
        const mongoService = new MongoDBService()
        
        try {
            await mongoService.connect()
            const result = await mongoService.insertMany('users', users)
            return result
        } catch (error) {
            console.error('Error:', error)
        } finally {
            await mongoService.close()
        }
    }

    getUsers = async (query = {}, limit = 10) => {
        const mongoService = new MongoDBService()
        
        try {
            await mongoService.connect()
            const db = mongoService.getDB()
    
            let users = await db.collection('users').find(query).limit(limit).toArray()
            return users
        } catch (error) {
            console.log('Error:', error)
        } finally {
            await mongoService.close()
        }
    }
}

module.exports = UserController