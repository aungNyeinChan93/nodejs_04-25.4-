const { response } = require('../utils/base')

const singleUpload = async (req, res, next) => {
    try {
        if (req.imageLink) {
            response(res, 'Single File Upload', { imageLink: req.imageLink }, 201)
        }
    } catch (error) {
        next(new Error(error))
    }
}

module.exports = {
    singleUpload
}