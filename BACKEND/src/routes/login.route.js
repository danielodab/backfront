const { Router } = require('express') 
const LoginController = require('../controllers/loginController')

const loginRoutes = new Router()


loginRoutes.post('/', LoginController.acessar)

module.exports = loginRoutes
