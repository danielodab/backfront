const Usuarios = require('../models/models.usuarios');
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class LoginController {
    async acessar(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            if (!email) {
                return res.status(400).json({ message: 'O email é obrigatório' });
            }

            if (!password) {
                return res.status(400).json({ message: 'O password é obrigatório' });
            }

            const usuario = await Usuarios.findOne({ where: { email: email } });

            if (!usuario) {
                console.log('Usuário não encontrado com o email:', email);
                return res.status(404).json({ error: 'Usuário não encontrado!' });
            }

            const senhaValida = await bcrypt.compare(password, usuario.password);

            if (!senhaValida) {
                console.log('Senha incorreta para o usuário:', email);
                return res.status(401).json({ error: 'Senha incorreta' });
            }

            // Atualiza o status para true na tabela usuarios
            usuario.status = true;
            await usuario.save(); 

            const payload = { sub: usuario.id, email: usuario.email, nome: usuario.nome };
            const token = sign(payload, process.env.SECRET_JWT);

            res.status(200).json({ Token: token });

        } catch (error) {
            console.error('Erro ao acessar o login:', error);
            return res.status(500).json({ error: error.message || error, message: 'Algo deu errado!' });
        }
    }
}

module.exports = new LoginController();
