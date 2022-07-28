const jwt = require('jsonwebtoken')

function verifyJWToken(request, response, next) {
    const bearerHeader = request.headers.token
    
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1]

        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return response.status(401).json({ "msg": "Token is not valid!" })
            }

            request.decoded = decoded
            next()
        })

    } else {
        return response.status(403).json({ "msg": "Access denied!" })
    }
}

module.exports = verifyJWToken