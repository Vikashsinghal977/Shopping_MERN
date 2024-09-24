const nodemailer = require("nodemailer");

const sendEmail = async(options) => {
    const transpoter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        }
    })

    const mailOption = {
        from:process.env.SMPT_MAIL,
        to: options.email,
        subject:options.subject,
        text:options.message,
    };

    await transpoter.sendMail(mailOption)

}


module.exports = sendEmail