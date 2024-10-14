
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Home.css'; // Importe um arquivo CSS para estilização, se necessário

const Home = () => {
    const [usuariosAtivos, setUsuariosAtivos] = useState(0);
    const [totalLocais, setTotalLocais] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsuariosAtivos = async () => {
            try {
                const response = await fetch('http://localhost:3000/usuarios/true');
                if (!response.ok) {
                    throw new Error('Erro ao carregar usuários ativos');
                }
                const data = await response.json();
                setUsuariosAtivos(data.total); // Aqui assumindo que a resposta é { total: X }
            } catch (error) {
                console.error('Erro:', error);
                setError(error.message);
            }
        };

        const fetchTotalLocais = async () => {
            try {
                const response = await fetch('http://localhost:3000/local/localTotal');
                if (!response.ok) {
                    throw new Error('Erro ao carregar locais');
                }
                const data = await response.json();
                setTotalLocais(data.Total); // Aqui assumindo que a resposta é { Total: Y }
            } catch (error) {
                console.error('Erro:', error);
                setError(error.message);
            }
        };

        fetchUsuariosAtivos();
        fetchTotalLocais();
    }, []);

    return (
        <div>
            <Header />
            <main className="main-content">
                <h1 className="title">Estatísticas do Sistema</h1>

                {error && <p className="error-message">{error}</p>}

                <div className="cards-container">
                    <div className="card">
                        <h3>Usuários Ativos</h3>
                        <p>{usuariosAtivos}</p>
                    </div>
                    <div className="card">
                        <h3>Locais</h3>
                        <p>{totalLocais}</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;