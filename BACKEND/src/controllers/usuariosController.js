const Usuarios = require("../models/models.usuarios")
const Locais = require("../models/models.locais")
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
class UsuariosController {

    async cadastrar(req, res) {
        
        try {
            const nome = req.body.nome
            const email = req.body.email
            const password = req.body.password
            const data_nascimento = req.body.data_nascimento
            const cpf = req.body.cpf
            const sexo = req.body.sexo
            const cep_endereco = req.body.cep_endereco
            const descricao_endereco = req.body.descricao_endereco
            const status =  req.body.status
            const criptografarPassword = await bcrypt.hash(password, 10)

        
        
            if (!nome) {
                return res.status(400).json({ message: 'O preenchimento do nome é obrigatório' })
            }
        
            if (!email) {
                return res.status(400).json({ message: 'O preenchimento do e-mail é obrigatório' })
            }
        
            if (!password) {
                return res.status(400).json({ message: 'O preenchimento da senha é obrigatória' })
            }
            if (!cpf) {
                return res.status(400).json({ message: 'O preenchimento do cpf é obrigatório' })
            }
            if (!sexo) {
                return res.status(400).json({ message: 'O preenchimento do sexo é obrigatório' })
            }
        
            if (!data_nascimento) {
                return res.status(400).json({ message: 'A data de nascimento é obrigatória' })
            }
        
            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ message: 'A data de nascimento é não está no formato correto' })
            }
            if (!cep_endereco) {
                 return res.status(400).json({ message: 'O preenchimento do CEP é obrigatório' })
            }
            if (!status) {
                return res.status(400).json({ message: 'O preenchimento do status é obrigatório' })
           }
            if (!descricao_endereco) {
                return res.status(400).json({ message: 'O preenchimento da descrição do endereço é obrigatório' })
            }

            const usuarioExistente = await Usuarios.findOne({
                where: {
                  [Op.or]: [{ cpf }, {email }]
                }
              });
              if (usuarioExistente) {
                  const dadosCadastrados = usuarioExistente.email === email ? 'E-mail já cadastrado' : 'CPF já cadastrado';
        
                return res.status(409).json({ message: dadosCadastrados });
              }
        
            const usuarios = await Usuarios.create({
                email: email,
                password: criptografarPassword,
                nome: nome,
                data_nascimento: data_nascimento,
                cpf: cpf,
                sexo: sexo,
                status: status,
                cep_endereco: cep_endereco,
                descricao_endereco: descricao_endereco
        
            })
        
            res.status(201).json(usuarios)
        
        } catch (error) {
            console.error("Error: ", error); // Logar o erro completo para mais detalhes
            res.status(500).json({
                error: error.message || error,
                message: 'Não foi possível cadastrar o usuário'
            });
        }
    };

    async consultar(req, res) {

        const usuarios = await Usuarios.findAll()
        if (usuarios.length > 0) {
            res.json(usuarios);
        } else {
            res.status(404).json({ error: 'Nenhum usuário cadastrado.' });
        }

    };
    async consultarTrue(req, res) {
        try {
            const totalUsuarios = await Usuarios.count({
                where: { status: true }
            });
    
            if (totalUsuarios > 0) {
                res.json({ total: totalUsuarios });
            } else {
                res.status(404).json({ error: 'Nenhum usuário logado no sistema.' });
            }
        } catch (error) {
            console.error("Erro ao consultar usuários:", error);
            res.status(500).json({ error: error.message || error, message: 'Erro ao consultar usuários.' });
        }
    };
   
    async deletar(req, res) {

        try {

            const id = req.params.id;
    
            const usuario = await Usuarios.findOne({where:{id: id}})
    
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado!" })
            }

            const localUsuario =await Locais.findAll({
                where: {
                    id_usuario: id
                }})
            if (localUsuario.length > 0) {
                return res.status(404).json({message: "Usuário possui local vinculado ao seu cadastro"})
            }
    
            await usuario.destroy()
            return res.status(200).json({message:"Usuário excluido com sucesso!"})
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                error: 'Erro ao excluir usuário',
                error: error
            })
        }
    };

    async alterar(req, res) {
        try {
            const { id } = req.params;
            const { nome, password, sexo, data_nascimento, status, cep_endereco, descricao_endereco } = req.body;
    
            let usuario = await Usuarios.findOne({ where: { id: id} });
    
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado ou não pertence ao usuário autenticado' });
            }
            const atualizacoes = {
                nome,
                sexo,
                data_nascimento,
                status,
                cep_endereco,
                descricao_endereco
            };
    
            if (password) {
                atualizacoes.password = await bcrypt.hash(password, 10);
            }

            await Usuarios.update(atualizacoes, { where: { id: id} });

            usuario = await Usuarios.findOne({ where: { id: id} });
    
            res.status(200).json(usuario);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'Erro ao atualizar o Usuário', error: error.message });
        }
    };
    
}

module.exports = new UsuariosController()

