const express = require("express");
const userController = require("../controller/user.controller");
const Router = express.Router();
Router.route("/register").post(userController.registerUser);
Router.route("/login").post(userController.loginUser);
Router.route("/").get(userController.getAllUser);
Router.route("/:userId").get(userController.getUser).delete(userController.deleteUser).patch(userController.updateUser);
module.exports = Router;