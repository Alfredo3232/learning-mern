const { JsonWebTokenError } = require("jsonwebtoken");
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authentication failed!');
        }
        const decodedToken = JsonWebTokenError.verify(token, 'password');
        req.userData = {userId: decodedToken.userId};
        next();
    } catch (err) {
        const error = new HttpError('Authentication failed!', 403);
        next(error);
    }
}