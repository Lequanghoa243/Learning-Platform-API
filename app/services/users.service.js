const { generateToken } = require('../configs/jwtToken');
const User = require('../models/users.model');
const asyncHander = require ('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbid');
const { generateRefreshToken } = require('../configs/refreshToken');
const jwt = require ('jsonwebtoken');
const sendEmail = require('../services/email.service');
const crypto = require('crypto');

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
                msg :"Wrong Email or Password",
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
       const {_id} = req.user;
       validateMongoDbId(_id);
       try{
        const getaUser = await User.findById(_id);
        res.json(getaUser);
       } catch(error){
            throw new Error(error);
       }
    }),

    deleteaUser: asyncHander(async function (req, res) {
        const {_id} = req.user;
        validateMongoDbId(_id);
        try{
         const deleteaUser = await User.findByIdAndDelete(_id);
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

     forgotPasswordToken: asyncHander(async (req, res) => {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found with this email");
        try {
          const token = await user.createPasswordResetToken();
          await user.save();
          const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:3000/user/reset-password/${token}'>Click Here</>`;
          const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot Password Link",
            html: resetURL,
          };
          sendEmail(data);
          res.json(token);
        } catch (error) {
          throw new Error(error);
        }
      }),

     resetPassword: asyncHander(async (req, res) => {
        const { password } = req.body;
        const { token } = req.params;
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await User.findOne({
          passwordResetToken: hashedToken,
          passwordResetExpires: { $gt: Date.now() },
        });
        if (!user) throw new Error(" Token Expired, Please try again later");
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        res.json(user);

      }),

      getCourseList: asyncHander(async (req, res) => {
        const { _id } = req.user;
        try {
          const findUser = await User.findById(_id).populate("courselist");
          res.json(findUser);
        } catch (error) {
          throw new Error(error);
        }
      }),



    
}
