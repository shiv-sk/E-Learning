const mongoose = require("mongoose");
const DBCon = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log("the database is connected successfully");
    } catch (error) {
        console.log("database connection error: ", error);
        process.exit(1);
    }
}
module.exports = DBCon;