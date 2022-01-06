const express = require("express");
const CategoryController = require("../../controllers/category.controller.js");
const router = express.Router();
router.get("/", CategoryController.findAll);
router.post("/", CategoryController.create);
router.patch("/:id", CategoryController.update);
router.delete("/:id", CategoryController.destroy);
module.exports = router;
