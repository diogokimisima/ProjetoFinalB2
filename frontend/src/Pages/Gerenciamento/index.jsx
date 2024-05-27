import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { Trash, Trash2 } from "lucide-react";
import { Pencil, PencilLine } from "lucide-react";
import { Link } from 'react-router-dom'; 

import Topo from '../../Componentes/Topo';
import Rodape from '../../Componentes/Rodape';
import { ScrollToTopButton } from '../../Componentes/VoltarTopo';

const Gerenciamento = () => {
  
  const [formData, setFormData] = useState({
    nomeEstoque: '',
    quantidade: '',
    nomeFuncionario: ''
  });

  const [estoqueData, setEstoqueData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [hoveredButtonId, setHoveredButtonId] = useState(null);
  const [hoveredPencilId, setHoveredPencilId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);



  const handleMouseEnter = (id) => {
    setHoveredButtonId(id);
  };

  const handleMouseLeave = () => {
    setHoveredButtonId(null);
  };

  const handlePencilMouseEnter = (id) => {
    setHoveredPencilId(id);
  };

  const handlePencilMouseLeave = () => {
    setHoveredPencilId(null);
  };



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Função POST do CRUD, para criar o produto
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://pastelariakina.000webhostapp.com/estoque/post.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao cadastrar estoque.');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          toast.success(data.message);
          setFormData({
            nomeEstoque: '',
            quantidade: '',
            nomeFuncionario: ''
          });
          fetchEstoqueData();
        } else {
          toast.error(data.message);
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        toast.error('Erro ao cadastrar estoque.');
      });
  };

  //Função GET do CRUD, poder buscar os dados do produto
  const fetchEstoqueData = () => {
    fetch('https://pastelariakina.000webhostapp.com/estoque/get.php')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setEstoqueData(data.data);
        } else {
          toast.error('Erro ao buscar dados do estoque.');
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        toast.error('Erro ao buscar dados do estoque.');
      });
  };

  //Função UPDATE do CRUD, para deletar o produto
  const handleEdit = (id) => {
    const editItem = estoqueData.find(item => item.id === id);
    setFormData(editItem);
    setEditMode(true);
    setEditId(id)
  };

  const handleUpdate = () => {
    fetch(`https://pastelariakina.000webhostapp.com/estoque/update.php?id=${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          toast.success(data.message);
          fetchEstoqueData();
          setEditMode(false);
          setEditId(null);
          setFormData({
            nomeEstoque: '',
            quantidade: '',
            nomeFuncionario: ''
          });
        } else {
          toast.error(data.message);
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        toast.error("Error ao atualizar item do estoque");
      });
  };


  //Função DELETE do CRUD, para deletar o produto
  const handleDelete = (id) => {
    fetch(`https://pastelariakina.000webhostapp.com/estoque/delete.php?id=${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          toast.success(data.message);
          fetchEstoqueData();
        } else {
          toast.error(data.message);
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        toast.error('Erro ao excluir item do estoque');
      });
  };

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adminStatus = localStorage.getItem('isAdmin');
        setIsAdmin(adminStatus === '1');
  
        if (adminStatus === '1') {
          const nomeuser = "admin"; // Usuário admin
  
          const formData = new FormData();
          formData.append('nomeuser', nomeuser);
  
          const response = await fetch('https://pastelariakina.000webhostapp.com/classe/Db.class.php', {
            method: 'POST',
            body: formData
          });
  
          if (!response.ok) {
            // Handle error
            return;
          }
  
          const data = await response.json();
          if (data.success) {
            setIsAdmin(data.isAdmin === 1 ? 1 : 0);
          } else {
          }
        } else {
        }
      } catch (error) {
      }
    };
  
    checkAdminStatus();
  }, []);
  
  // Para atualizar sempre a tabela de produtos
  useEffect(() => {
    fetchEstoqueData();
  }, []);

  if (!isAdmin) {
    return (
      <div className='secao-error'>
        <h3>Você não tem permissão para acessar esta página.</h3>
        <Link className='voltar-home' to="/">Voltar Home</Link>
      </div>
    );
  }

  return (
    <div className='secao-principal-gerenciamento'>
      <Topo />
      <main className='secao-gerenciamento'>
        <ToastContainer />

        <h1>Gerenciamento De Estoque</h1>
        <form onSubmit={handleSubmit} className='formulario-estoque'>
          <div className='campo-formulario'>
            <label htmlFor="nomeEstoque">Nome do Estoque</label>
            <input
              type="text"
              name="nomeEstoque"
              id="nomeEstoque"
              placeholder='Digite aqui'
              value={formData.nomeEstoque}
              onChange={handleChange}
              required
            />
          </div>

          <div className='campo-formulario'>
            <label htmlFor="quantidade">Quantidade</label>
            <input
              type="text"
              name="quantidade"
              id="quantidade"
              placeholder='Digite aqui'
              value={formData.quantidade}
              onChange={handleChange}
              required
            />
          </div>

          <div className='campo-formulario'>
            <label htmlFor="nomeFuncionario">Nome do Funcionário</label>
            <input
              type="text"
              name="nomeFuncionario"
              id="nomeFuncionario"
              placeholder='Digite aqui'
              value={formData.nomeFuncionario}
              onChange={handleChange}
              required
            />
          </div>

          {editMode ? (
            <div>
              <label htmlFor="Atualizar">Atualizar</label>
              <button type="button" onClick={handleUpdate}>Atualizar</button>
            </div>

          ) : (
            <div>
              <label htmlFor="cadastrar">cadastrar</label>
              <button type="submit">Cadastrar</button>
            </div>
          )}

        </form>

        <div className='secao-principal-estoque'>
          <table className='secao-estoque'>
            <thead className='secao-th'>
              <tr>
                <th>Nome do Estoque</th>
                <th>Quantidade</th>
                <th>Nome do Funcionário</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {estoqueData.map((item, index) => (
                <tr key={index}>
                  <td>{item.nomeEstoque}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.nomeFuncionario}</td>
                  <td className='secao-botao-estoque'>
                    <button
                      onMouseEnter={() => handlePencilMouseEnter(item.id)}
                      onMouseLeave={handlePencilMouseLeave}
                      onClick={() => handleEdit(item.id)}
                    >
                      {hoveredPencilId === item.id ? <PencilLine /> : <Pencil />}
                    </button>
                    <button
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleDelete(item.id)}
                    >
                      {hoveredButtonId === item.id ? <Trash2 /> : <Trash />}
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <ScrollToTopButton />
      <Rodape />
    </div >
  );
};

export default Gerenciamento;
