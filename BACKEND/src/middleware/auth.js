const { verify } = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }

    try {
    
        const decoded = verify(token, process.env.SECRET_JWT);

        req.user = decoded;

        next();
    } catch (error) {

        return res.status(403).json({ error: 'Token de autenticação inválido' });
    }
}

module.exports = { auth };
