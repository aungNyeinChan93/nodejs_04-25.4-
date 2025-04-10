const path = require('path')

const generateFileName = (name) => {
    let updateName = name.replace(/[^a-zA-Z0-9]/g, '')
    return new Date().valueOf() + "_anc_" + updateName
};

const filePathGenerate = (fileName) => path.join(__dirname, "../public/images/", fileName);

const singleImageUpload = async (req, res, next) => {

    let fileName = generateFileName(req.files.image.name);
    let filePath = filePathGenerate(fileName)

    await req.files.image.mv(filePath)

    const imageLink = process.env.IMAGES_URL + fileName

    req.imageLink = imageLink;

    next()
}

const multiFileUpload = async (req, res, next) => {
    const files = req.files.images;
    let imageLinks = []
    files.forEach(file => {
        let fileName = generateFileName(file.name);
        let filePath = filePathGenerate(fileName)
        file.mv(filePath)
        imageLinks.push(process.env.IMAGES_URL + fileName)
    });
    req.imageLinks = imageLinks;
    next();
}

// const deleteFileByName = async()

module.exports = { singleImageUpload, multiFileUpload }