const mongoose = require("mongoose"); 
const Schema = mongoose.Schema ; // we'll use this shortcut
const Review = require("./review.js"); 

const listingSchema = new Schema({
    title : {
        type: String, 
        required: true ,
    }, 
    description: String, 
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnOmndMvjPx0mUbYepOoyqBqCAdJpQW9I_4g&s",
            set: (v) => v === "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnOmndMvjPx0mUbYepOoyqBqCAdJpQW9I_4g&s" : v,
        }
    }, 
    price: Number, 
    category: {
        type: String,
        enum: ["Calculator", "Books", "Notes", "Electronics", "Apparel", "Others"],
        required: true
    }, 
    listingType: {
        type: String,
        enum: ["For Sale", "For Rent (Per Day)", "Free"],
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    contact: {
        email: { 
            type: String, 
            required: true 
        },
        whatsapp: { 
            type: String 
        }
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ], 
    owner: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
    }, 
}); 

// mongoose middleware to propogate deletion of reviews upon deletion of the listing itself 
listingSchema.post("findOneAndDelete" , async (listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}}); 
    }
});

const Listing = mongoose.model("Listing" , listingSchema); 
module.exports = Listing ; 