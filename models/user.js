const mongoose = require("mongoose"); 
const Schema = mongoose.Schema ; // we'll use this shortcut
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
})

// username and passport will be handled by the passport

userSchema.plugin(passportLocalMongoose.default); 

module.exports = mongoose.model("User" , userSchema); 