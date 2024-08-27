const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
const allowedOrigins = ["http://localhost:5173" , "https://e-learning-wkcm.vercel.app"];
const corsOption = {
    origin:(origin , callback)=>{
        if(!origin || allowedOrigins.includes(origin)){
            callback(null , true)
        }
        else{
            console.log("blocked by cors: " , origin);
            callback(new Error("not allowed by cors"));
        }
    },
    credentials:true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOption));

//routes
const courseRoute = require("./routes/course.routes");
app.use("/api/v1/course" , courseRoute);

const userRoute = require("./routes/user.routes");
app.use("/api/v1/user" , userRoute);

const lessonRoute = require("./routes/lesson.routes");
app.use("/api/v1/lesson" , lessonRoute);

const categoryRoute = require("./routes/category.routes");
app.use("/api/v1/category" ,categoryRoute)

const enrollmentRoute = require("./routes/enrollment.routes");
app.use("/api/v1/enrollment" , enrollmentRoute);
module.exports = app;
