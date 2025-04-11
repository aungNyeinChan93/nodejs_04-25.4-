const router = require('express').Router()
const ImageController = require('../controllers/imageController');
const { singleImageUpload, multiFileUpload } = require('../middlewares/imageUpload')

// single upload
router.post('/single', singleImageUpload, ImageController.singleUpload)

// multi upload
router.post('/multi', multiFileUpload, ImageController.multiUpload)

// fileDeleteByName
router.post('/deleteByName', ImageController.deleteFileByName)

// fileDeleteByLink
router.post('/deleteByLink', ImageController.deleteFileByLink)

// error handle
router.use((err, req, res, next) => {
    // response(res, err, null, 400);
    res.status(400).json({ error: err.message })
})


module.exports = router;