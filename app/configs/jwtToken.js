const jwt = require('jsonwebtoken');
const generateToken = (id) => {
    return jwt.sign({id}, "mysecret" ,{expiresIn: "3d"});
};

module.exports = {generateToken};