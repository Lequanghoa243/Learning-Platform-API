const { generateToken } = require('../configs/jwtToken');
const User = require('../models/users.model');
const asyncHander = require ('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbid');
const { generateRefreshToken } = require('../configs/refreshToken');
const jwt = require ('jsonwebtoken');

module.exports = {
    register: asyncHander(async function (req, res) {
        const email1 = req.body.email;
        const findUSer= await User.findOne({email: email1});
        if(!findUSer){
            const newUser = await User.create(req.body)
            res.json(newUser);
        }else{
            res.json({
                msg :"User existed",
                success: "false"
            })
        }
    }),

    handleRefreshToken: asyncHander(async function (req, res) {
        const cookie = req.cookies;
       if(!cookie?.refreshToken) throw new Error("no refresh token in cookie");
       const refreshToken = cookie.refreshToken;
       const user = await User.findOne({refreshToken});
       if(!user) throw new Error("no refresh token match");
        jwt.verify(refreshToken,"mysecret",(err,decode) => {
            if(err || user.id !== decode.id){
                throw new Error("some thing wrong with the token")
            } else {
                const accessToken = generateToken(User?._id)
                res.json(accessToken)
            }
        })
    }),
    
    login:asyncHander(async function (req, res) {
        const {email, password} = req.body;
        const findUSer = await User.findOne({email: email});
        if(findUSer && await findUSer.isPasswordMatched(password)){
            const refreshToken = await generateRefreshToken(findUSer?._id);
            const updateUser = await User.findByIdAndUpdate(findUSer.id, 
                {refreshToken: refreshToken});
            res.cookie("refreshToken",refreshToken,{
                httpOnly: true,
                maxAge: 72 * 60 *60*1000,
            })
            res.json(
                {_id: findUSer?._id,
                firstname: findUSer?.firstname,
                lastname: findUSer?.lastname,
                mobile: findUSer?.mobile,
                token: generateToken(findUSer?._id),
            });
        } else {
            res.json({
                msg :"Invalid Credentials",
            })
        }
    }),
    
    
    logout: asyncHander(async function (req, res) {
        const cookie = req.cookies;
        if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
        const refreshToken = cookie.refreshToken;
        const user = await User.findOne({ refreshToken });
        if (!user) {
          res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
          });
          return res.sendStatus(204); // forbidden
        }
        await User.findOneAndUpdate({refreshToken}, {
          refreshToken: "",
        });
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
        });
        res.sendStatus(204); // forbidden
    }),


    getaUser:asyncHander(async function (req, res) {
       const {id} = req.params;
       validateMongoDbId(_id);
       try{
        const getaUser = await User.findById(id);
        res.json(getaUser);
       } catch(error){
            throw new Error(error);
       }
    }),

    deleteaUser: asyncHander(async function (req, res) {
        const {id} = req.params;
        validateMongoDbId(_id);
        try{
         const deleteaUser = await User.findByIdAndDelete(id);
         res.json(deleteaUser);
        } catch(error){
             throw new Error(error);
        }
     }),

    updateUser: asyncHander(async function (req, res) {
        const {_id} = req.user;
        validateMongoDbId(_id);
        try{
         const updateUser = await User.findByIdAndUpdate(_id,
         {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        },
         {
            new: true,
         }
         );
         res.json(updateUser);
        } catch(error){
             throw new Error(error);
        }
     }),

     updatePassword: asyncHander(async function (req, res) {
        const { _id } = req.user;
        const { password } = req.body;
        validateMongoDbId(_id);
        const user = await User.findById(_id);
        if (password) {
          user.password = password;
          const updatedPassword = await user.save();
          res.json(updatedPassword);
        } else {
          res.json(user);
        }
     }),



    
}
