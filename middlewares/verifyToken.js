const { JWT } = require("../utils/base")

/**
 * Middleware to verify the presence and validity of a JSON Web Token (JWT) in the request headers.
 * Extracts the token from the `Authorization` header, decodes it,  and attaches the user ID to the request object.
 * If the token is missing or invalid, an error is passed to the next middleware.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 * @throws {Error} If the token is missing or invalid.
 */

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