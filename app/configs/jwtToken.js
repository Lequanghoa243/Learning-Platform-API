const jwt = require('jsonwebtoken');
const generateToken = (id) => {
    return jwt.sign({id}, process.env.jwt_secret ,{expiresIn: "3d"});
};

module.exports = {generateToken};