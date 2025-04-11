const router = require('express').Router();
const CategoryController = require('../controllers/categoryController')
const verifyToken = require('../middlewares/verifyToken')
const { multiFileUpload, singleImageUpload } = require('../middlewares/imageUpload')

// middleware
router.use('/', verifyToken, (req, res, next) => {
    console.log(`hit => /api/categories/`);
    next();
})

router.route('/')
    .get(CategoryController.all)
    .post(singleImageUpload, CategoryController.create)

router.route('/:id')
    .get(CategoryController.show)
    .put(singleImageUpload, CategoryController.update)
    .delete(CategoryController.destroy)

router.use((err, req, res, next) => {
    res.status(400).json({ error: err.message })
})

module.exports = router;