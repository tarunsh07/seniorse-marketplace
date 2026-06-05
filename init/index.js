const mongoose = require("mongoose"); 
const initData = require("./data.js"); 
const Listing = require("../models/listing.js"); 

// basic connection code :
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; 

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err); 
});

async function main() {
    await mongoose.connect(MONGO_URL);
}


const initDB = async () => {
    await Listing.deleteMany({}); 
    initData.data = initData.data.map((obj) => ({...obj , owner: "6a1c85a7c9199dc8561e0a97"}));
    await Listing.insertMany(initData.data); // insert key data
    console.log("Data is initialized"); 

}

initDB(); 