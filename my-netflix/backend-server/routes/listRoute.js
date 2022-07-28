const express = require('express')
const listModel = require('../models/listModel')
const Router = express.Router()
const ListModel = require('../models/listModel')
const verifyJWToken = require('../verifyJWToken')

// Create a new list
Router.post('/', verifyJWToken, async (request, response) => {
    const { isAdmin } = request.decoded

    if (isAdmin) {
        const newList = listModel(request.body)

        try {
            const createList = await newList.save()
            return response.status(200).json(createList)

        } catch (error) {
            return response.status(500).json({ "msg": error.message })
        }

    }else {
        return response.status(403).json({ "msg": "Access denied! Admin only allowed to create!" })
    }
})


// Delete a list
Router.delete('/:id', verifyJWToken, async (request, response) => {
    const { id } = request.params
    const { isAdmin } = request.decoded

    if (isAdmin) {
        try {
            await listModel.function(id)
            return response.status(200).json({ "msg": "List deleted successfully!" })

        } catch (error) {
            return response.status(500).json({ "msg": error.message })
        }

    }else {
        return response.status(403).json({ "msg": "Access denied! Admin only allowed to delete!" })
    }
})

// Get all lists
Router.get("/", verifyJWToken, async (request, response) => {
    const type_Query = request.query.type
    const genre_Query = request.query.genre

    let list = []

    try {
        if (type_Query) {
            if (genre_Query) {
                list = await listModel.aggregate([
                    { $sample: { size: 10 }},
                    { $match: { type: type_Query, genre: genre_Query }}
                ])
            
            } else {
                list = await listModel.aggregate([
                    { $sample: { size: 10 }},
                    { $match: { type: type_Query }}
                ])
            }

        } else {
            list = await listModel.aggregate([
                {$sample: { size: 10 }}
            ])
        }
        return response.status(200).json(list)

    } catch (error) {
        response.status(500).json({ "msg": error.message });
    }
})

module.exports = Router