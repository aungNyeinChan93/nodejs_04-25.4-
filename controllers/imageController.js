const path = require('path')
const { response } = require('../utils/base')
const fs = require('fs')


const singleUpload = async (req, res, next) => {
    try {
        if (req.imageLink) {
            response(res, 'Single File Upload', { imageLink: req.imageLink }, 201)
        }
    } catch (error) {
        next(new Error(error))
    }
}

const multiUpload = async (req, res, next) => {
    try {
        if (req.imageLinks) {
            response(res, 'Multi File Upload', { imageLinks: req.imageLinks }, 201)
        }
    } catch (error) {
        next(new Error(error))
    }
}

const deleteFileByName = async (req, res, next) => {
    const name = req.body.name;
    const filePath = path.join(__dirname, '../public/images/') + name;
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    response(res, "File Delete Success", { image: filePath }, 200)
}

const deleteFileByLink = async (req, res, next) => {
    const link = req.body.link;
    const name = link.split("/").pop();
    const filePath = path.join(__dirname, '../public/images/') + name;
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    response(res, "File Delete Success", { image: filePath }, 200)
}

module.exports = {
    singleUpload, multiUpload, deleteFileByName, deleteFileByLink
}