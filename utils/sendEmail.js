const nodemailer = require("nodemailer");
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first"); // Force IPv4 to prevent connection timeouts on cloud hosts

const sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: '"SeniorSe Verification" <no-reply@seniorse.com>',
        to: email,
        subject: "Your SeniorSe OTP Verification Code",
        html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                <h2>Welcome to SeniorSe!</h2>
                <p>Your One-Time Password (OTP) for verifying your college ID is:</p>
                <h1 style="color: #FE6602; letter-spacing: 5px; font-size: 40px;">${otp}</h1>
                <p>Please enter this code on the website to complete your registration.</p>
                <br>
                <small style="color: gray;">If you did not request this, please ignore this email.</small>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;
