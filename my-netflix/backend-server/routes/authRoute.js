const express = require('express') // Import express
const Router = express.Router(); // Create a new Router instance
const userModel = require('../models/userModel') // Import user model
const bcrypt = require('bcrypt') // Import bcrypt module
const jwt = require('jsonwebtoken') // Import jsonwebtoken module

// Register a new user
Router.post('/register', async (request, response) => {
    const { email, password, username } = request.body

    // Check if user email is not empty and if password is greater than 6 characters
    if((email && email !== "") && (password && password !== "" && password.length >= 6)) {
        const hash = bcrypt.hashSync(password, 10) // Hash the password
        
        try {
            const User = new userModel({
                username: username,
                email: email,
                password: hash
            })
            const user = await User.save()
            return response.status(200).json(user)

        } catch (error) {
            return response.status(500).json({ "msg": error.message })

        }} else {
            response.status(500).json({ "msg": "Email and Password are required! Password must be at least 6 characters" })
        }
})


// Login a user
Router.post('/login', async (request, response) => {
    const { email, password } = request.body

    try{
        // Check if user email and password are not empty
        if((email && email !== "") && (password && password !== "")) {
            const user = await userModel.findOne({ "email": email })
            
            if(user) {
                const isMatch = bcrypt.compareSync(password, user.password)

                if(isMatch) {
                    accessToken = jwt.sign({
                        id: user._id, isAdmin: user.isAdmin },
                        process.env.JWT_SECRET,
                        { expiresIn: '7d'
                    })

                    const { password, ...userData } = user._doc

                    return response.status(200).json({ ...userData, accessToken })
                
                } else {
                    return response.status(500).json({ "msg": "Password is incorrect!" }) // Return error message
                }
    
            } else {
                return response.status(500).json({ "msg": "User not found!! Please check your Email!" })
            }

        } else {
            return response.status(500).json({ "msg": "Email and Password are required!" })
        }

    } catch (error) {
        return response.status(500).json({ "msg": error.message })
    }
})

module.exports = Router // Export Router