const express = require("express");
const Router = express.Router();
const authorize = require("../middleware/auth.middleware");
const courseController = require("../controller/course.controller");
const upload = require("../middleware/multer.middleware");
const multerUpload = upload.fields([{name:"coverImage" , maxCount:1}]);
Router.route("/").post(authorize.verifyjwt , multerUpload , courseController.newCourse);
Router.route("/").get(courseController.getAllCourse);
// Router.route("/middle").get(authorize.verifyjwt , courseController.middlewareCheck);
Router.route("/category/:categoryId").get(courseController.getCourseByCategory);
Router.route("/:courseId").get(courseController.getCourse).delete(courseController.deleteCourse);

module.exports = Router;