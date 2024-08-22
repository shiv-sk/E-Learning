const dotenv = require("dotenv")
dotenv.config({path:"./.env"});
const app = require("./app");
const DBCon = require("./connection/DB.connection");
console.log("the mongourl from env: " , process.env.MONGO_URL);
console.log("the port from env: " , process.env.PORT);
console.log("the cloudinary name: " , process.env.CLOUD_NAME);
DBCon()
.then(()=>{
    app.listen(process.env.PORT || 3000 , ()=>{
        console.log(`server is running on the port: ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("index.js file is crashed: " , error);
})
