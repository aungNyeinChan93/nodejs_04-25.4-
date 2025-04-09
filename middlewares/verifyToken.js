const { JWT } = require("../utils/base")

const verifyToken = (req, res, next) => {
    const authToken = req.headers.authorization
    if (!authToken) {
        return next(new Error('Token is required!'))
    }
    console.log(`verfiyToken! => ${authToken.split(" ")[1]}`);
    const token = authToken.split(" ")[1];
    const decodedToken = JWT.verify(token, next);
    if (decodedToken) req.userId = decodedToken.id
    next();
}

module.exports = verifyToken;