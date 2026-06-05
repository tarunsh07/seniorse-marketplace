const express = require("express"); 
const router = express.Router(); 
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js"); 
const multer = require('multer'); 
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    // 1st route - get all listings - GET : /listings
    .get(wrapAsync(listingController.index))
    // 4th route - create Route - POST : /listings
    .post(isLoggedIn ,upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

// 3rd route - create new listing - GET : /listings/new ....... this iS plaed above show route because if is written below T-T.. it would search for new as id T-T 
router.get("/new" , isLoggedIn , listingController.renderNewForm);


router.route("/:id")
    // 2nd route - Show Route - GET : /listings/:id
    .get(wrapAsync(listingController.showListing))
    // 6th route - Update Route - PUT : /listings/:id
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
    // 7th route - Delete Route - DELETE : /listings/:id
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


// 5th route - Edit Route - GET : /listings/:id/edit
router.get("/:id/edit" , isLoggedIn , isOwner , wrapAsync(listingController.renderEditForm));


module.exports = router ; 