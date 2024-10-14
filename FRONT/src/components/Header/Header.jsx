import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logoImg from '../../assets/logogrande.png';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.clear();
    navigate('/');
  };

  return (
    <header>
      <div className="header-logo">
        <img src={logoImg} alt="Logo" className="logo-img" />
        <div className="logo"></div>
      </div>
      <nav>
        <ul>
          <li><Link to="/home">Página Inicial</Link></li>
          <li><Link to="/destinos">Cadastrar Destino</Link></li>
          <li><Link to="/meus-destinos">Meus Destinos</Link></li>
          <li><button className='sair' onClick={handleLogout}>Sair</button></li>
        </ul>
      </nav>
    </header>
  );
}
