const router = require('express').Router()

const { singleImageUpload } = require('../middlewares/singleImageUpload')

const ImageController = require('../controllers/imageController');

// single upload
router.post('/single', singleImageUpload, ImageController.singleUpload)


module.exports = router;