const User = require("../models/user");
const sendOtpEmail = require("../utils/sendEmail");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        if (!email.endsWith("@nsut.ac.in")) {
            req.flash("error", "Only @nsut.ac.in college emails are allowed to register!");
            return res.redirect("/signup");
        }

        // Check if username already exists

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            req.flash("error", "This username is already taken. Please choose another.");
            return res.redirect("/signup");
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        req.session.tempSignupData = { username, email, password, otp };
        await sendOtpEmail(email, otp);

        req.session.save((err) => {
            if (err) {
                req.flash("error", "Something went wrong. Please try again.");
                return res.redirect("/signup");
            }
            req.flash("success", "An OTP has been sent to your college email!");
            res.redirect("/verify-otp");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderVerifyForm = (req, res) => {
    if (!req.session.tempSignupData) {
        req.flash("error", "Your session expired or you haven't started signup.");
        return res.redirect("/signup");
    }
    res.render("users/verify.ejs");
};

module.exports.verifyOtp = async (req, res, next) => {
    try {
        const { enteredOtp } = req.body;
        const tempUser = req.session.tempSignupData;

        if (!tempUser) {
            req.flash("error", "Session expired. Please sign up again.");
            return res.redirect("/signup");
        }

        if (enteredOtp === tempUser.otp) {
            const newUser = new User({ email: tempUser.email, username: tempUser.username });
            const registeredUser = await User.register(newUser, tempUser.password);
            
            req.login(registeredUser, (err) => {
                if (err) return next(err);
                delete req.session.tempSignupData;
                req.flash("success", "College ID verified successfully. Welcome to SeniorSe!");
                res.redirect("/listings");
            });
        } else {
            req.flash("error", "Invalid OTP. Please try again.");
            res.redirect("/verify-otp");
        }
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome Back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "logged out successfully!");
        res.redirect("/listings");
    });
};