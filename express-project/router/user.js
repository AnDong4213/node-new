const express = require("express");
const userController = require("../controller/userController");
const validator = require('../middleware/validator/userValidator')
const router = express.Router();

router.post("/register", validator.register, userController.register);

module.exports = router;
