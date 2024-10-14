import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './EditarDestino.css';

export default function EditarDestino() {
  const [destinos, setDestinos] = useState({
    nome: '',
    cep: '',
    street: '',
    city: '',
    state: '',
    country: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchDestino = async () => {
      try {
        const response = await fetch(`http://localhost:3000/destinos/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar o destino');
        }
        const data = await response.json();
        setDestinos(data);
      } catch (error) {
        console.error('Erro ao carregar o destino:', error);
        alert('Erro ao carregar o destino');
      }
    };

    if (id) {
      fetchDestino();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDestinos((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/destinos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
            required/>

          <input
            type="text"
            name="cep"
            placeholder="CEP"
            value={destinos.cep}
            onChange={handleChange}
            required/>

          <input
            type="text"
            name="street"
            placeholder="Rua"
            value={destinos.street}
            onChange={handleChange}
            required/>

          <input
            type="text"
            name="city"
            placeholder="Cidade"
            value={destinos.city}
            onChange={handleChange}
            required/>

          <input
            type="text"
            name="state"
            placeholder="Estado"
            value={destinos.state}
            onChange={handleChange}
            required/>

          <input
            type="text"
            name="country"
            placeholder="País"
            value={destinos.country}
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
