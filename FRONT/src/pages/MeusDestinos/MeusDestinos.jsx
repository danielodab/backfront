

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './MeusDestinos.css';

export default function MeusDestinos() {
  const [destinos, setDestinos] = useState([]);
  const userId = localStorage.getItem('userId'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/destinos?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar os destinos');
        }
        const data = await response.json();
        setDestinos(data);
      } catch (error) {
        console.error('Erro ao carregar os destinos:', error);
      }
    };

    fetchDestinos();
  }, [userId]);

  const handleEdit = (id) => {
    navigate(`/editar-destino?id=${id}`);
  };  

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/destinos/${id}`, {
        method: 'DELETE',
      });
      setDestinos(destinos.filter(destinos => destinos.id !== id));
      alert('Destino excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o destino:', error);
      alert('Erro ao excluir o destino');
    }
  };

  return (
    <div>
      <Header />
      <main className="main-destinations">
      <h1 className="destinations-title">Meus Destinos</h1>
      <ul className="destinations-list">
        {destinos.map(destinos => (
      <li key={destinos.id} className="destination-item">
        <h3 className="destination-name">{destinos.nome}</h3>
        <p className="destination-info">Rua: {destinos.street}</p>
        <p className="destination-info">Cidade: {destinos.city}, {destinos.state}</p>
        <p className="destination-info">País: {destinos.country}</p>
        <button onClick={() => handleEdit(destinos.id)} className="edit-button">Editar</button>
        <button onClick={() => handleDelete(destinos.id)} className="delete-button">Excluir</button>
      </li>
    ))}
      </ul>
    </main>
      <Footer />
    </div>
  );
}
