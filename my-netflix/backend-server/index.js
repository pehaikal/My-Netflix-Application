const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/authRoute')

dotenv.config()

mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')

}).catch((error) => {
    console.log('Error connecting to MongoDB: ' + error.message)
})

app.use(express.json())
app.use("/backend-server/auth", authRoute)

const PORT = 4500
app.listen(4500, function() {
  console.log(`Backend server is running on http://localhost:${PORT}`)
})