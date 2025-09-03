const userController = require("../Controller/userController");
const express = require("express");
const router = express.Router();
const {Authentication} = require("../utills/Auth");

router.post("/register", userController.UserSignup);
// router.post("/login", Authentication, userController.UserLogin);
router.post("/login", userController.UserLogin);

module.exports = router;