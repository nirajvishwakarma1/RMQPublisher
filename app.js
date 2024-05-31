const express = require('express')
const app = express()
const rabbitmqRoutes = require('./routes/rabbitmqRoutes')
require('./config/dotenv')

app.use(express.json())

// Use the RabbitMQ routes
app.use('/message', rabbitmqRoutes)

app.use('/', (req, res) => {
    res.status(200).send({message: 'Welcome!'})
})

// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})