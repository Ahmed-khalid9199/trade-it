var nodemailer = require("nodemailer");
var handlebars = require("handlebars");
var fs = require("fs");
var path = require("path");

var transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "darksoul1034@gmail.com",
    pass: "gali!@34",
  },
});

const makeHtml = (code) => {
  const filePath = path.join(__dirname, "../emails/verificationEmail.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = {
    code,
  };
  const htmlToSend = template(replacements);
  return htmlToSend;
};

const sendTo = (email, code) => {
  var mailOptions = {
    from: "darksoul@gmail.com",
    to: email,
    replyTo: "noreply.darksoul@gmail.com",
    subject: "Trade It Account Verification",
    html: makeHtml(code),
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = sendTo;
