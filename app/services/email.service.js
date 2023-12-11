const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendEmail = asyncHandler(async(data,req,next) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "kiritoyukile1@gmail.com",
          pass: "tpyt zyhw mpur megq",
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper

        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Course Learning Website BeePlus" <beeplus@example.com>', // sender address
          to: data.to, // list of receivers
          subject: data.subject, // Subject line
          text: data.text, // plain text body
          html: data.html, // html body
        });
      
        console.log("Message sent: %s", info.messageId);

})

module.exports = sendEmail;