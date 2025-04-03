const express = require('express')
const router = express.Router()
const AuthController = require("../controllers/auth")
const { validateUser } = require("../middlewares/auth")

//! POST
router.post("/register", AuthController.createUser)
router.post("/login", AuthController.loginUser)
router.post("/logout", AuthController.logoutUser)

//! GET 
router.get("/me", validateUser, AuthController.findMyUser)
router.get("/secret", validateUser, AuthController.secret)

module.exports = router