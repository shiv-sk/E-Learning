const express = require("express");
const Router = express.Router();
const enrollmentController = require("../controller/enrollment.controller");
Router.route("/").post(enrollmentController.enrollInCourse);
Router.route("/:userId").get(enrollmentController.userEnrollment);
module.exports = Router