const { Router, query } = require('express') // 
const { auth } = require('../middleware/auth')
const locaisController = require('../controllers/locaisController');

const locaisRoutes = new Router()

locaisRoutes.post('/', auth, locaisController.cadastrar);

locaisRoutes.get('/local', locaisController.consultar);

locaisRoutes.get('/localuser', auth, locaisController.consultarLocais);

locaisRoutes.get('/localTotal', locaisController.consultarTotal);

locaisRoutes.get('/localum', locaisController.consultarum);

locaisRoutes.delete('/local/:local_id', auth, locaisController.deletar);

locaisRoutes.put('/local/:local_id', auth, locaisController.alterar);



module.exports = locaisRoutes