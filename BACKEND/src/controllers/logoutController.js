const Usuarios = require('../models/models.usuarios');
const jwt = require('jsonwebtoken');

class LogoutController {
    async logout(req, res) {
        try {
            let token = req.headers['authorization'];

            if (!token) {
                return res.status(401).json({ message: 'Token não fornecido!' });
            }

            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length).trim();
            }

            const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
            const usuarioId = decodedToken.sub;

            const usuario = await Usuarios.findOne({ where: { id: usuarioId } });

            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }

            usuario.status = false;
            await usuario.save();

            return res.status(200).json({ message: 'Usuário deslogado com sucesso!' });

        } catch (error) {
            console.error('Erro ao deslogar o usuário:', error.message);
            return res.status(500).json({ error: error.message || error, message: 'Erro ao deslogar!' });
        }
    }
}

module.exports = new LogoutController();


