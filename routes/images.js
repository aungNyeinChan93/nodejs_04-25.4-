const router = require('express').Router()

const { singleImageUpload, multiFileUpload } = require('../middlewares/imageUpload')

const ImageController = require('../controllers/imageController');

// single upload
router.post('/single', singleImageUpload, ImageController.singleUpload)

// multi upload
router.post('/multi', multiFileUpload, ImageController.multiUpload)

// fileDeleteByName
router.post('/deleteByName', ImageController.deleteFileByName)

// fileDeleteByLink
router.post('/deleteByLink', ImageController.deleteFileByLink)



module.exports = router;