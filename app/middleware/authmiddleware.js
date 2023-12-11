const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { sendError } = require('../utils/restware'); 

const authMiddleware = asyncHandler(async function(req, res, next) {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decode = jwt.verify(token, "mysecret");
                const user = await User.findById(decode?.id);
                req.user = user;
                next();
            }
        } catch (error) {
            sendError(res, '401', 'Not authorized, please login again', 401, 'Unauthorized');
        }
    } else {
        sendError(res, '400', 'There is no token attached to header', 400, 'Bad Request');
    }
});

const isAdmin = asyncHandler(async function(req, res, next) {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if (adminUser.role !== "admin") {
        sendError(res, '403', 'You are not an admin', 403, 'Forbidden');
    } else {
        next();
    }
});

module.exports = { authMiddleware, isAdmin };
