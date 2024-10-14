const Locais = require('../models/models.locais');
const { default: axios } = require('axios')


class locaisController {

    async cadastrar(req, res) {
        try {
            const userId = req.user.sub;
            const nomeLocal = req.body.nomeLocal;
            const descricao = req.body.descricao;
            const latitude = req.body.lat;
            const longitude = req.body.lon;
            const logradouro = req.body.logradouro;
            const cidade = req.body.cidade;
            const estado = req.body.estado;
            const cepLocal = req.body.cep
    
            
            const salvarLocal = await Locais.create({
                nome_local: nomeLocal,
                descricao_local: descricao,
                cep_local: cepLocal,
                latitude_local: latitude,
                longitude_local: longitude,
                logradouro_local: logradouro,
                cidade_local: cidade,
                estado_local: estado,
                id_usuario: userId
            });
    
            res.status(200).json({ message: 'Local cadastrado com sucesso', local: salvarLocal });
        } catch (error) {
            console.error('Erro ao consultar o CEP:', error);
            res.status(500).send({ error: 'Erro ao processar a solicitação' });
        }
    };

    async consultar(req, res) {

        try {
            const locaisUsuario = await Locais.findAll({
            });
    
            if (locaisUsuario.length > 0) {
                res.json(locaisUsuario);
            } else {
                res.status(404).json({ error: 'Nenhum local encontrado para o usuário' });
            }
        } catch (error) {
            console.error('Erro ao consultar locais do usuário:', error);
            res.status(500).json({ error: 'Erro ao processar a solicitação' });
        }
    };

    async consultarLocais(req, res) {
        try {
            const userId = req.user.sub; // Obtém o ID do usuário a partir do token
            const locaisUsuario = await Locais.findAll({
                where: {
                    id_usuario: userId // Filtra locais apenas para o usuário
                }
            });
    
            if (locaisUsuario.length > 0) {
                res.json(locaisUsuario);
            } else {
                res.status(404).json({ error: 'Nenhum local encontrado para o usuário' });
            }
        } catch (error) {
            console.error('Erro ao consultar locais do usuário:', error);
            res.status(500).json({ error: 'Erro ao processar a solicitação' });
        }
    };

    async consultarum(req, res) {
        try {
            const userId = req.user.sub; // Obtém o ID do usuário a partir do token
            const localId = req.params.local_id;
            const locaisUsuario = await Locais.findAll({
                where: {
                    id_usuario: userId, // Filtra locais apenas para o usuário
                    id: localId
                }
            });
    
            if (locaisUsuario.length > 0) {
                res.json(locaisUsuario);
            } else {
                res.status(404).json({ error: 'Nenhum local encontrado para o usuário' });
            }
        } catch (error) {
            console.error('Erro ao consultar locais do usuário:', error);
            res.status(500).json({ error: 'Erro ao processar a solicitação' });
        }
    };

    async consultarTotal(req, res) {

        try {
            const TotalLocal = await Locais.count();
    
            if (TotalLocal > 0) {
                res.json({Total: TotalLocal});
            } else {
                res.status(404).json({ error: 'Nenhum local cadastrado' });
            }
        } catch (error) {
            console.error('Erro ao consultar locais:', error);
            res.status(500).json({ error: 'Erro ao processar a solicitação' });
        }
    };

    async deletar(req, res) {
        try {
            const userId = req.user.sub;
            const localId = req.params.local_id;
    
            console.log(`Tentando excluir o local com ID: ${localId} para o usuário: ${userId}`);
    
            const localUsuario = await Locais.findOne({
                where: {
                    id_local: localId,
                    id_usuario: userId
                }
            });
    
            if (!localUsuario) {
                return res.status(404).json({ message: `Não há local com o ID ${localId} cadastrado para este usuário!` });
            }
    
            await Locais.destroy({
                where: {
                    id_local: localId,
                    id_usuario: userId
                }
            });
    
            return res.status(204).json({ message: `Local com o ID ${localId} removido com sucesso!` });
        } catch (error) {
            console.error('Erro ao deletar local:', error);
            return res.status(500).json({ error: 'Erro ao processar a solicitação' });
        }
    };
    
    async alterar(req, res) {

        try {
            const userId = req.user.sub;
            const localId = req.params.local_id;
    
            const localUsuario = await Locais.findOne({
                where: {
                    id_local: localId,
                    id_usuario: userId
                }
            });
    
            if (!localUsuario) {
                return res.status(404).json({ message: `Não há local com o ID ${localId} cadastrado para este usuário!` });
            }
    
            await localUsuario.update(req.body);
    
            res.json(localUsuario);
           
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                error: 'Não foi possível editar o local específico',
                detalhes: error.message
            });
        }
    };
}

module.exports = new locaisController