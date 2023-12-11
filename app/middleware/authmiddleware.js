const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const asyncHander = require('express-async-handler');

const authMiddleware = asyncHander(async function(req,res,next){
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decode = jwt.verify(token,"mysecret");
                const user =  await User.findById(decode?.id);
                req.user = user;
                next();
            }

        }catch(error){
            throw new Error('Not authorized, please login again')
        }
    }else {
        throw new Error("There is no token attached to header");
    }
});

module.exports = authMiddleware;