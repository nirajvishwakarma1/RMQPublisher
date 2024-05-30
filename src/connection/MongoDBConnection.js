const { MongoClient } = require('mongodb')
require('dotenv').config()

class MongoDBConnection  {
    constructor(
        uri = process.env.MONGODB_URI,
        dbName = process.env.MONGODB_NAME
    ) {
        this.uri = uri
        this.dbName = dbName
        this.client = new MongoClient(this.uri)
    }

    async connect() {
        try {
            await this.client.connect()
            console.log('MongnoDB connected successully!')
            this.db = this.client.db(this.dbName)
        } catch (error) {
            console.error('MongoDB connection failed:', error)
            throw error
        }
    }

    getDB() {
        if (!this.db) throw new Error('Database not connected call connect() first.')
        return this.db 
    }

    async insertOne(collectionName, document) {
        try {
            const collection = this.getDB().collection(collectionName)
            const result = await collection.insertOne(document)
            console.log('Document inserted with _id:', result.insertedId)
            return result
        } catch (error) {
            console.error('Insert one failed:', error)
            throw error
        }
    }

    async insertMany(collectionName, documents) {
        try {
            const collection = this.getDB().collection(collectionName)
            const result = await collection.insertMany(documents)
            console.log(`${result.insertedCount} documents insrted`)
            return result
        } catch (error) {
            console.error('Insert many failed:', error)
            throw error
        }
    }

    async close() {
        try {
            this.client.close()
            console.log('MongoDB connection closed.')
        } catch (error) {
            console.error('Error closing MongoDB connection:', error)
            throw error
        }
    }
}

module.exports = MongoDBConnection