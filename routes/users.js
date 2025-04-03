const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/user')


// Ruta para obtener la información completa del usuario logueado
router.get("/get-user", UsersController.getUserInfo);

module.exports = router