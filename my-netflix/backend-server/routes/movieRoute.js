const express = require('express')
const Router = express.Router()
const movieModel = require('../models/movieModel')
const verifyJWToken = require('../verifyJWToken')

// Create a new movie
Router.post('/', verifyJWToken, async (request, response) => {
    const { isAdmin } = request.decoded

    if (isAdmin) {
        const newMovie = movieModel(request.body)

        try {
            const createMovie = await newMovie.save()
            return response.status(200).json(createMovie)

        } catch (error) {
            return response.status(500).json({ "msg": error.message })
        }

    }else {
        return response.status(403).json({ "msg": "Access denied! Admin only allowed to create!" })
    }
})


// Update a movie
Router.put('/:id', verifyJWToken, async (request, response) => {
    const { id } = request.body
    const { isAdmin } = request.decoded

    if (isAdmin) {
        try {
            const updatedMovie = await movieModel.findByIdAndUpdate(id, {
                $set: request.body },
                { new: true})
                
                return response.status(200).json(updatedMovie)

        } catch (error) {
            return response.status(500).json({ "msg": error.message })
        }

    }else {
        return response.status(403).json({ "msg": "Access denied! Admin only allowed to update!" })
    }
})


// Delete a movie
Router.delete('/:id', verifyJWToken, async (request, response) => {
    const { id } = request.body
    const { isAdmin } = request.decoded

    if (isAdmin) {
        try {
            await movieModel.findByIdAndDelete(id)
            return response.status(200).json({ "msg": "Movie deleted successfully!" })

        } catch (error) {
            return response.status(500).json({ "msg": error.message })
        }

    }else {
        return response.status(403).json({ "msg": "Access denied! Admin only allowed to delete!" })
    }
})


// Get a movie by id
Router.get("/find/:id", verifyJWToken, async (request, response) => {
    const { id } = request.params

    try {
      const getMovieById = await movieModel.findById(id)
      return response.status(200).json(getMovieById)

    } catch (error) {
      return response.status(500).json({ "msg": error.message })
    }
})


// Get random movie/serie
Router.get("/random", verifyJWToken, async (request, response) => {
    const type = request.query.type
    let movieChoice = []

    try {
      if (type === "series") {
        movieChoice = await movieModel.aggregate([
          { $match: { isSeries: true }},
          { $sample: { size: 1 }}
        ])

      } else {
        movieChoice = await movieModel.aggregate([
          { $match: { isSeries: false }},
          { $sample: { size: 1 }}
        ])
      }
      return response.status(200).json(movieChoice)

    } catch (error) {
      return response.status(500).json({ "msg": error.message })
    }
})


// Get all movies
Router.get("/", verifyJWToken, async (request, response) => {
    const { isAdmin } = request.decoded

    if (isAdmin) {
      try {
        const getAllMovies = await movieModel.find().sort({ createdAt: -1 }) 
        return response.status(200).json(getAllMovies)

      } catch (error) {
        return response.status(500).json({ "msg": error.message });
      }

    } else {
      return response.status(403).json({ "msg": "Access denied! Admin only is allowed to fetch all movies/series" });
    }
})

module.exports = Router