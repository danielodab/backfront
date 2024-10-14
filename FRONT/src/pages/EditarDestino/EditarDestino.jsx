import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './EditarDestino.css';

export default function EditarDestino() {
  const [destinos, setDestinos] = useState({
    nome: '',
    descricao: '',
    latitude: '',
    longitude: '',
    logradouro: '',
    cidade: '',
    estado: '',
    cep: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const token = localStorage.getItem('token'); // Obtenha o token do localStorage

  useEffect(() => {
    const fetchDestino = async () => {
      try {
        // Chama a rota localum passando o ID
        const response = await fetch(`http://localhost:3000/local/localum?local_id=${id}`, {
          headers: {
            'Authorization': `${token}` // Passa o token para autenticação
          }
        });
        if (!response.ok) {
          throw new Error('Erro ao carregar o destino');
        }
        const data = await response.json();

        // Verifica se o retorno é um array e utiliza o primeiro elemento
        if (Array.isArray(data) && data.length > 0) {
          setDestinos(data[0]); // Ajuste para pegar o primeiro item do array
        } else {
          alert('Nenhum local encontrado para o usuário');
        }
      } catch (error) {
        console.error('Erro ao carregar o destino:', error);
        alert('Erro ao carregar o destino');
      }
    };

    if (id) {
      fetchDestino();
    }
  }, [id, token]); // Dependências: id e token

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDestinos((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Atualiza o local com os novos dados
      const response = await fetch(`http://localhost:3000/local/local/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}` // Certifique-se de incluir o token na atualização
        },
        body: JSON.stringify(destinos),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar o destino');
      }

      alert('Destino atualizado com sucesso!');
      navigate('/meus-destinos');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao atualizar o destino');
    }
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Editar Destino</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome do Destino"
            value={destinos.nome}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="descricao"
            placeholder="Descrição"
            value={destinos.descricao}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={destinos.latitude}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={destinos.longitude}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="logradouro"
            placeholder="Rua"
            value={destinos.logradouro}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={destinos.cidade}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={destinos.estado}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cep"
            placeholder="CEP"
            value={destinos.cep}
            onChange={handleChange}
            required
          />
          <button type="submit">Atualizar</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
