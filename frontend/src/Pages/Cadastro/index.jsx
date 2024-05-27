import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './style.css';

function Cadastro() {
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    celular: '',
    email: '',
    login: '',
    senha: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://pastelariakina.000webhostapp.com/usuario/cadastro.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário.');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          window.location.href = '/Login';
        }, 2000);
      } else {
        toast.error(data.message);
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      toast.error('Erro ao cadastrar usuário.');
    });
  };

  return (
    <div className='container'>
      <ToastContainer />
      <form className="formulario-cadastro" onSubmit={handleSubmit}>
        <h2 className='titulo-formulario'>Cadastro</h2>
        <input className="input-text" type="number" name="cpf" placeholder="CPF" required onChange={handleChange} /><br />
        <input className="input-text" type="text" name="nome" placeholder="Nome" required onChange={handleChange} /><br />
        <input className="input-text" type="text" name="celular" placeholder="Celular" required onChange={handleChange} /><br />
        <input className="input-email" type="email" name="email" placeholder="Email" required onChange={handleChange} /><br />
        <input className="input-text" type="text" name="login" placeholder="Login" required onChange={handleChange} /><br />
        <input className="input-password" type="password" name="senha" placeholder="Senha" required onChange={handleChange} /><br />
        <button className="botao-cadastrar" type="submit">Cadastrar</button>
        <p className="paragrafo">
          Já possui uma conta? <a className="link" href="/Login">Clique aqui</a>.
        </p>
      </form>
    </div>
  );
}

export default Cadastro;
