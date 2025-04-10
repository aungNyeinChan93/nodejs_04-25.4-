const path = require('path')

const generateFileName = (name) => new Date().valueOf() + "_anc_" + name;

const filePathGenerate = (fileName) => path.join(__dirname, "../public/images/", fileName);

const singleImageUpload = async (req, res, next) => {

    let fileName = generateFileName(req.files.image.name);
    let filePath = filePathGenerate(fileName)

    await req.files.image.mv(filePath)

    const imageLink = process.env.IMAGES_URL + fileName

    req.imageLink = imageLink;

    next()
}

module.exports = { singleImageUpload }