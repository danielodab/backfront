const { Router } = require("express");
const usuariosRoutes = require("./usuario.route");
const loginRoutes = require("./login.route");
const logoutRoutes = require("./logout.route")
const locaisRoutes = require("./local.route");

const routes = Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.use('/usuarios', usuariosRoutes)
routes.use('/login', loginRoutes)
routes.use('/logout', logoutRoutes)
routes.use('/local', locaisRoutes)


module.exports = routes