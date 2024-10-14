import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Destinos.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Destinos() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [editar, setEditar] = useState(false);
  const [destinoId, setDestinoId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    if (id) {
      setEditar(true);
      setDestinoId(id);
      fetchDestinationData(id);
    }
  }, [location]);

  const fetchDestinationData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/local/${id}`); // Buscando o destino específico pelo ID
      if (!response.ok) {
        throw new Error('Erro ao carregar os dados do destino');
      }
      const data = await response.json();
      setNome(data.nome_local);
      setDescricao(data.descricao_local);
      setCep(data.cep_local);
      setLogradouro(data.logradouro_local);
      setCidade(data.cidade_local);
      setEstado(data.estado_local);
      setLatitude(data.latitude_local);
      setLongitude(data.longitude_local);
    } catch (error) {
      console.error('Erro ao carregar os dados do destino:', error);
    }
  };

  const fetchAddress = async (cep) => {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        
        // Adicione um check para a resposta
        if (!response.ok) {
            throw new Error(`Erro ao buscar o endereço: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.erro) {
            alert('CEP não encontrado!');
            return;
        }

        setLogradouro(data.logradouro);
        setCidade(data.localidade);
        setEstado(data.uf);
        setCep(cep);
    } catch (error) {
        console.error('Erro ao buscar o endereço:', error);
        alert('Erro ao buscar o endereço. Verifique o CEP e tente novamente.');
    }
};


const handleSubmit = async (event) => {
  event.preventDefault();

  const Destino = {
      nomeLocal: nome,
      descricao: descricao,
      cepLocal: cep,
      logradouro: logradouro,
      cidade: cidade,
      estado: estado,
      lat: latitude,
      lon: longitude,
      // id_usuario: userId, // Pode ser removido se não necessário
  };

  try {
      const token = localStorage.getItem('token');
      console.log("Token:", token); // Log do token

      const url = editar 
          ? `http://localhost:3000/local/${destinoId}` 
          : 'http://localhost:3000/local';

      const method = editar ? 'PUT' : 'POST';

      const response = await fetch(url, {
          method,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`, // Adicione esta linha
          },
          body: JSON.stringify(Destino),
      });

      if (!response.ok) {
          const errorData = await response.json();
          console.error('Erro de resposta do servidor:', errorData);
          throw new Error('Erro ao salvar o destino');
      }

      // Limpar campos após submissão
      setNome('');
      setDescricao('');
      setCep('');
      setLogradouro('');
      setCidade('');
      setEstado('');
      setLatitude('');
      setLongitude('');
      alert(editar ? 'Destino atualizado com sucesso!' : 'Destino cadastrado com sucesso!');
  } catch (error) {
      console.error('Erro:', error);
      alert(editar ? 'Erro ao atualizar o destino' : 'Erro ao cadastrar o destino');
  }
};


  return (
    <div>
      <Header />
      <main className="main-content-form">
        <h1 className="form-title">{editar ? 'Editar Destino' : 'Cadastrar Destino'}</h1>

        <form onSubmit={handleSubmit} className="form-content">
          <input
            type="text"
            placeholder="Nome do Destino"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
            className="input-field"
          />
          <button type="button" onClick={() => fetchAddress(cep)} className="form-button">
            Buscar Endereço
          </button>

          <input
            type="text"
            placeholder="Logradouro"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="text"
            placeholder="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="text"
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="input-field"
          />
          
          <button type="submit" className="form-button">{editar ? 'Salvar' : 'Cadastrar'}</button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
