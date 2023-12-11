const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const crypto = require('crypto');

var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    courselist: [{type: mongoose.Schema.Types.ObjectId, ref:"Course" }],
    completedLessons: [
      {
          course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
          lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
      }
  ],
    refreshToken: {type: String,},
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
timestamps:true,
}
);


userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });


  userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };


  userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resettoken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; 
    return resettoken;
  };
  

module.exports = mongoose.model('User', userSchema);