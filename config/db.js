require('dotenv').config()

module.exports = {
    mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017',
    mongoDB: process.env.MONGO_DBNAME || test
}