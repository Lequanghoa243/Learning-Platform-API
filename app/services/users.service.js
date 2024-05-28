const { generateToken } = require('../configs/jwtToken');
const User = require('../models/users.model');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbid');
const { generateRefreshToken } = require('../configs/refreshToken');
const jwt = require('jsonwebtoken');
const sendEmail = require('../services/email.service');
const crypto = require('crypto');
const { sendError } = require('../utils/restware');

module.exports = {
  register: asyncHandler(async function (req, res) {
    const email1 = req.body.email;
    try {
      const findUser = await User.findOne({ email: email1 });
      if (!findUser) {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
      } else {
        sendError(res, '500', 'Error registering user', 500, 'Internal Server Error', 'User Existed');
        console.log(res)
      }
    } catch (error) {
      sendError(res, '500', 'Error registering user', 500, 'Internal Server Error', error);
      throw new Error(error);
    }
  }),

  loginAdmin: asyncHandler(async function (req, res) {
    const { email, password } = req.body;
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== "admin") throw new Error("Not Authorised");
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findAdmin?._id);
      const updateuser = await User.findByIdAndUpdate(
        findAdmin.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findAdmin?._id,
        firstname: findAdmin?.firstname,
        lastname: findAdmin?.lastname,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        token: generateToken(findAdmin?._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  }),

  getAllUser: asyncHandler(async function (req, res) {
    try {
      const getUsers = await User.find();
      res.json(getUsers);
    } catch (error) {
      throw new Error(error);
    }
  }),
 getWishlist: asyncHandler(async (req, res) => {
    const { userId } = req.body;
    try {
        const findUser = await User.findById(userId).populate("wishlist");
        
        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(findUser.wishlist);
    } catch (error) {
        console.error('Error fetching user course list:', error);
        res.status(500).json({
            message: 'Error fetching user course list',
            error: error.message,
        });
    }
  }),
  handleRefreshToken: asyncHandler(async function (req, res) {
    try {
      const cookie = req.cookies;
      if (!cookie?.refreshToken) throw new Error("no refresh token in cookie");
      const refreshToken = cookie.refreshToken;
      const user = await User.findOne({ refreshToken });
      if (!user) throw new Error("no refresh token match");
      jwt.verify(refreshToken, "mysecret", (err, decode) => {
        if (err || user.id !== decode.id) {
          throw new Error("something wrong with the token");
        } else {
          const accessToken = generateToken(User?._id);
          res.json(accessToken);
        }
      });
    } catch (error) {
      sendError(res, '500', 'Error handling refresh token', 500, 'Internal Server Error', error);
    }
  }),

  login: asyncHandler(async function (req, res) {
    const { email, password } = req.body;
    try {
      const findUser = await User.findOne({ email: email });
      if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(findUser.id,
          { refreshToken: refreshToken });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 72 * 60 * 60 * 1000,
        });
        res.json(
          {
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
          });
      } else {
          sendError(res, '404', 'Account not Found', 404, 'Account not Found', error); 
      }
    } catch (error) {
      sendError(res, '500', 'Error logging in', 500, 'Internal Server Error', error);
    }
  }),

  logout: asyncHandler(async function (req, res) {
    const cookie = req.cookies;
      if (!cookie?.refreshToken) res.json({"msg":"No Refresh Token in Cookies"});
    try {
      
      const refreshToken = cookie.refreshToken;
      const user = await User.findOne({ refreshToken });
      if (!user) {
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
        });
        return res.sendStatus(204); 
      }
      await User.findOneAndUpdate({ refreshToken }, {
        refreshToken: "",
      });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      res.sendStatus(204); 
    } catch (error) {
      sendError(res, '500', 'Error logging out', 500, 'Internal Server Error', error);
    }
  }),

  getaUser: asyncHandler(async function (req, res) {
    const { postedby } = req.body;
    try {
      const getaUser = await User.findById(postedby);
      res.json(getaUser);
    } catch (error) {
      sendError(res, '500', 'Error fetching user', 500, 'Internal Server Error', error);
    }
  }),

  deleteaUser: asyncHandler(async function (req, res) {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      const deleteaUser = await User.findByIdAndDelete(_id);
      res.json(deleteaUser);
    } catch (error) {
      sendError(res, '500', 'Error deleting user', 500, 'Internal Server Error', error);
    }
  }),

  updateUser: asyncHandler(async function (req, res) {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
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
    } catch (error) {
      sendError(res, '500', 'Error updating user', 500, 'Internal Server Error', error);
    }
  }),

  updatePassword: asyncHandler(async function (req, res) {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
    try {
      const user = await User.findById(_id);
      if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
      } else {
        res.json(user);
      }
    } catch (error) {
      sendError(res, '500', 'Error updating password', 500, 'Internal Server Error', error);
    }
  }),

  forgotPasswordToken: asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found with this email");
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
      sendError(res, '500', 'Error sending forgot password token', 500, 'Internal Server Error', error);
    }
  }),

  resetPassword: asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  
      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });
      if (!user) res.json({"msg":" Token Expired, Please try again later"});
      try {
      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      res.json(user);
    } catch (error) {
      sendError(res, '500', 'Error resetting password', 500, 'Internal Server Error', error);
    }
  }),

  getCourseList: asyncHandler(async (req, res) => {
const { userId } = req.body;
    try {
        const findUser = await User.findById(userId).populate("courselist");
        
        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(findUser.courselist);
    } catch (error) {
        console.error('Error fetching user course list:', error);
        res.status(500).json({
            message: 'Error fetching user course list',
            error: error.message,
        });
    }
  }),
};
