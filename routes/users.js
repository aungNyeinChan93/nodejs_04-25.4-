const router = require('express').Router();
const UserController = require('../controllers/UserController')
const { response } = require('../utils/base')

// middleware
router.use('/', (req, res, next) => {
    console.log(`Hit /api/users`);
    next();
})

// register
router.post('/register', UserController.register);

// login
router.post('/login', UserController.login)

// error handle
router.use((err, req, res, next) => {
    // response(res, err, null, 400);
    res.status(400).json({ error: err.message })
})

module.exports = router;