const { Router, query } = require('express') // 
const Usuarios = require('../models/models.usuarios')
const { auth } = require('../middleware/auth')
const UsuariosController = require('../controllers/usuariosController')

const usuariosRoutes = new Router()

usuariosRoutes.post('/', UsuariosController.cadastrar );

usuariosRoutes.get('/', auth,  UsuariosController.consultar);

usuariosRoutes.get('/true', UsuariosController.consultarTrue);

usuariosRoutes.delete('/:id', auth,  UsuariosController.deletar);

usuariosRoutes.put('/:id',auth, UsuariosController.alterar)

module.exports = usuariosRoutes