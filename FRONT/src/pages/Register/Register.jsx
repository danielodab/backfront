import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [cpf, setCpf] = useState('');
  const [aniversario, setAniversario] = useState(''); // Campo de data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cep, setCep] = useState(''); // Novo estado para o CEP
  const [descricaoEndereco, setDescricaoEndereco] = useState(''); // Estado para descrição do endereço (API + número + complemento)
  const [numero, setNumero] = useState(''); // Estado para o número do endereço
  const [complemento, setComplemento] = useState(''); // Estado para o complemento
  const [error, setError] = useState('');
  const [sucesso, setSuccesso] = useState('');
  const navigate = useNavigate();

  // Função para converter data no formato ISO (yyyy-MM-dd)
  const dataConvertida = aniversario ? new Date(aniversario).toISOString().split('T')[0] : '';

  const buscarEnderecoPorCep = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setError('CEP inválido');
        setDescricaoEndereco('');
      } else {
        setDescricaoEndereco(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
        setError('');
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      setError('Erro ao buscar endereço');
    }
  };

  const Register = async () => {
    try {
      const novoUsuario = {
        nome,
        sexo,
        cpf,
        data_nascimento: dataConvertida, // Enviar data no formato yyyy-MM-dd
        email,
        password,
        cep_endereco: cep, // Enviar o CEP para o campo cep_endereco
        descricao_endereco: `${descricaoEndereco}, Nº: ${numero}, ${complemento}`, 
        status: 'true' // Combinar dados do API e os inputs do número e complemento
      };

      const postResponse = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario),
      });

      if (postResponse.ok) {
        setSuccesso('Usuário cadastrado com sucesso!');
        navigate('/');
      } else {
        setError('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setError('Erro ao conectar com o servidor');
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2 className="form-titulo">Cadastro</h2>
        {error && <p className="error-message">{error}</p>}
        {sucesso && <p className="success-message">{sucesso}</p>}
        <input
          type="text"
          className="input"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="Sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <input
          type="date"
          className="input"
          placeholder="Data de Nascimento"
          value={aniversario}
          onChange={(e) => setAniversario(e.target.value)} // Captura a data
        />
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onBlur={() => buscarEnderecoPorCep(cep)} // Buscar endereço ao perder foco do campo
        />
        <input
          type="text"
          className="input"
          placeholder="Endereço"
          value={descricaoEndereco}
          readOnly
        />
        <input
          type="text"
          className="input"
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="Complemento"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
        />
        <button className="form-button" onClick={Register}>Cadastrar</button>
        <button className="form-button login-button" onClick={() => navigate('/')}>Voltar ao Login</button>
      </div>
    </div>
  );
}
