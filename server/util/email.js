var nodemailer = require("nodemailer");
var handlebars = require("handlebars");
var fs = require("fs");
var path = require("path");

var transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "darksoul1034@gmail.com",
    pass: "xvdwpdbbvrmqfpoe",
  },
});

const makeHtml = (file_path, replacements) => {
  const filePath = path.join(__dirname, file_path);
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);

  const htmlToSend = template(replacements);
  return htmlToSend;
};

const sendVerificationEmail = (email, code) => {
  var mailOptions = {
    from: "darksoul@gmail.com",
    to: email,
    replyTo: "noreply.darksoul@gmail.com",
    subject: "Trade It Account Verification",
    html: makeHtml("../emails/verificationEmail.html", { code }),
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
const sendPasswordResetEmail = (email, password) => {
  var mailOptions = {
    from: "darksoul@gmail.com",
    to: email,
    replyTo: "noreply.darksoul@gmail.com",
    subject: "Trade It Password Reset",
    html: makeHtml("../emails/passwordResetEmail.html", { password }),
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = { sendVerificationEmail, sendPasswordResetEmail };
