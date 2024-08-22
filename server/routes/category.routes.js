const express = require("express");
const Router = express.Router();
const categoryController = require("../controller/category.controller");
Router.route("/").post(categoryController.newCategory);
Router.route("/").get(categoryController.getAllCategory);
Router.route("/:categoryId").patch(categoryController.updateCategory).delete(categoryController.deletCategory).get(categoryController.getCategory);
module.exports = Router