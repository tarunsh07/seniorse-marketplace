const express = require("express"); 
const router = express.Router(); 
const wrapAsync = require("../utils/wrapAsync.js"); 
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");
const rateLimit = require("express-rate-limit");

const signupLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: "Too many signup attempts from this IP, please try again after 15 minutes."
});

router.get("/signup" , userController.renderSignupForm);

router.post("/signup" , signupLimiter, wrapAsync(userController.signup));

router.get("/verify-otp", userController.renderVerifyForm);
router.post("/verify-otp", signupLimiter, wrapAsync(userController.verifyOtp));

router.get("/login" , userController.renderLoginForm);

router.post("/login" , saveRedirectUrl,  passport.authenticate("local" , {failureRedirect: '/login' , failureFlash: true}) , userController.login);

router.get("/logout" , userController.logout);

module.exports = router ; 