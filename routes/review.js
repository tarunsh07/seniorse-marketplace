const express = require("express"); 
const router = express.Router({mergeParams: true}); // "mergeParams" 
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview , isLoggedIn , isReviewAuthor} = require("../middleware.js"); 
const reviewController = require("../controllers/reviews.js");


// 8th route - Review Route - POST : /listings/<id>/reviews
router.route("/")
    .post(isLoggedIn , validateReview , wrapAsync(reviewController.createReview)); 

// 9th route - Delete Review Route - DELETE : 
router.route("/:reviewId")
    .delete(isLoggedIn , isReviewAuthor , wrapAsync(reviewController.destroyReview));

module.exports = router ; 