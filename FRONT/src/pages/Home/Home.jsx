import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Home.css';

export default function Home() {
  const [destinos, setDestinos] = useState([]);
  const [users, setUsers] = useState({});
  const [usersSoma, setUsersSoma] = useState(0);
  const [destinosSoma, setDestinoSoma] = useState(0);

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await fetch('http://localhost:3000/destinos');
        if (!response.ok) {
          throw new Error('Erro ao carregar os destinos');
        }
        const data = await response.json();
        setDestinos(data);
        setDestinoSoma(data.length);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/usuarios/true');
        if (!response.ok) {
          throw new Error('Erro ao carregar os usuários');
        }
        const data = await response.json();
        const usersMap = data.reduce((acc, user) => {
          acc[user.id] = user.name;
          return acc;
        }, {});
        setUsers(usersMap);
        setUsersSoma(data.length);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchDestinos();
    fetchUsers();
  }, []);

  return (
    <div>
      <Header />
      <main className="main-content">
  <h1 className="title">Dados do sistema:</h1>

  <div className="cards-container">
    <div className="card">
      <h3>Usuários Ativos</h3>
      <p>{usersSoma}</p>
    </div>
    <div className="card">
      <h3>Locais</h3>
      <p>{destinosSoma}</p>
    </div>
  </div>

  <h2 className="sub-title">Feed Locais:</h2>

  <ul className="destinos-list">
    {destinos.map(destinos => (
      <li key={destinos.id} className="destinos-item">
        <h3>{destinos.nome}</h3>
        <p>Rua: {destinos.street}</p>
        <p>Cidade: {destinos.city}, {destinos.state}</p>
        <p>País: {destinos.country}</p>
        <p>Latitude: {destinos.latitude}</p>
        <p>Longitude: {destinos.longitude}</p>
      </li>
    ))}
  </ul>
</main>
      <Footer />
    </div>
  );
}