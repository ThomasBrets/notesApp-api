const express = require("express");
const router = express.Router();
const { validateUser } = require("../middlewares/auth");

const auth = require("./auth");
const notes = require("./notes");
const users = require("./users");

router.use("/auth", auth);
router.use("/notes", validateUser, notes);
router.use("/users", validateUser, users)

module.exports = router;





