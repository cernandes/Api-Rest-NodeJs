const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users-controller')

router.post('/cadastro', usersController.insertUser)

router.post('/login', usersController.loginUser)

module.exports = router
