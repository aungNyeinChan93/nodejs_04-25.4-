const router = require('express').Router();
const UserController = require('../controllers/UserController')
const { response } = require('../utils/base')
const verifyToken = require('../middlewares/verifyToken')

// middleware
router.use('/', (req, res, next) => {
    console.log(`Hit /api/users`);
    next();
})

// register
router.post('/register', UserController.register);

// login
router.post('/login', UserController.login)

// profile
router.use('/profile', (req, res, next) => {
    console.log(`profile pre middleware!! `);
    next();
})
router.get('/profile', verifyToken, UserController.profile);

// error handle
router.use((err, req, res, next) => {
    // response(res, err, null, 400);
    res.status(400).json({ error: err.message })
})

module.exports = router;