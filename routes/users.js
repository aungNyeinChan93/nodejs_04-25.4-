const router = require('express').Router();
const UserController = require('../controllers/UserController')
const { response, JWT } = require('../utils/base')

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

const verifyToken = (req, res, next) => {
    const authToken = req.headers.authorization
    if (!authToken) {
        return next(new Error('Token is required!'))
    }
    console.log(`verfiyToken! => ${authToken.split(" ")[1]}`);
    token = authToken.split(" ")[1];

    const decodedToken = JWT.verify(token, next);
    if (decodedToken) req.userId = decodedToken.id
    next();
}
router.get('/profile', verifyToken, UserController.profile);

// error handle
router.use((err, req, res, next) => {
    // response(res, err, null, 400);
    res.status(400).json({ error: err.message })
})

module.exports = router;