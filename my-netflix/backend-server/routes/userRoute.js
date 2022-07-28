const express = require('express')
const Router = express.Router()
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const verifyJWToken = require('../verifyJWToken')

// Update a user
Router.put('/:id', verifyJWToken, async (request, response) => {
    const { id } = request.params
    const { isAdmin } = request.decoded
    const { password } = request.body

    if (id || isAdmin) {
        if (password) {
            user.password = bcrypt.hashSync(password, 10)
        }

        try{
            const updateUser = await userModel.findByIdAndUpdate(id, {
                $set:request.body },
                { new: true })

                return response.status(200).json(updateUser)

        }catch(error){
            return response.status(500).json({ "msg": error.message })
        }

    }else {
        return response.status(403).json({ "msg": "You can only update your own account!" })
    }
})


// Delete a user
Router.delete('/:id', verifyJWToken, async (request, response) => {
    const { id } = request.params
    const { isAdmin } = request.decoded

    if (id || isAdmin) {
        try{
            await userModel.findByIdAndDelete(id)
            return response.status(200).json({ "msg": "User deleted successfully!" })

        }catch(error){
            return response.status(500).json({ "msg": error.message })
        }

    }else {
        return response.status(403).json({ "msg": "You can only delete your own account!" })
    }
})


// Get a user by id
Router.get('/find/:id', async (request, response) => {
    const { id } = request.params

    try{
        const getUserById = await userModel.findById(id)
        const { password, ...userData } = getUserById._doc

        return response.status(200).json(userData)

    }catch(error){
        return response.status(500).json({ "msg": error.message })
    }
})


// Get all users
Router.get('/', verifyJWToken, async (request, response) => {
    const { isAdmin } = request.decoded
    const query = request.query.new

    if (isAdmin) {
        try{
            const getAllUsers = query ? await userModel.find().limit(5).sort({ createdAt: -1 }) : await userModel.find()
            return response.status(200).json(getAllUsers)
        
        }catch(error){
            return response.status(500).json({ "msg": error.message })
        }

    }else {
        return response.status(403).json({ "msg": "You aren't allowed to fetch all users" })
    }
})


// Get user stats
Router.get("/stats", async (request, response) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);
  
    try {
    const data = await userModel.aggregate([
        {
        $project: {
            // year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
        }
        },

        {
        $group: {
            _id: "$month",
            // _id: "$year",
            total: { $sum: 1 }
        }
        }
    ])
    return response.status(200).json(data)

    } catch (error) {
        return response.status(500).json({ "msg": error.message })
    }
})

module.exports = Router