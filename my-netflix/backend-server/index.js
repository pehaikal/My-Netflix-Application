const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const movieRoute = require('./routes/movieRoute')
const listRoute = require('./routes/listRoute')

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
app.use("/backend-server/users", userRoute)
app.use("/backend-server/movies", movieRoute)
app.use("/backend-server/lists", listRoute)

const PORT = 4500
app.listen(4500, function() {
  console.log(`Backend server is running on http://localhost:${PORT}`)
})