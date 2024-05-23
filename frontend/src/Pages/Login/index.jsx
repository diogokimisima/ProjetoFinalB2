import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

function Login() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nomeuser') {
      setNomeUsuario(value);
    } else if (name === 'senhauser') {
      setSenhaUsuario(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost/pastelariakina/backend/usuario/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          nomeuser: nomeUsuario,
          senhauser: senhaUsuario,
          enviar: 'login'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message);
        localStorage.setItem('isAdmin', data.isAdmin);
        setTimeout(() => {
          window.location.href = '/';
        }, 2000)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Ocorreu um erro ao realizar o login.');
    }
  };

  return (
    <div className="container"> 
      <ToastContainer />
      <form className="formulario" onSubmit={handleSubmit}>
        <h2 className='titulo-formulario'>Login</h2>
        <input
          className="input-text"
          type="text"
          name="nomeuser"
          placeholder="Login"
          value={nomeUsuario}
          onChange={handleInputChange}
          required
        /><br />
        <input
          className="input-password"
          type="password"
          name="senhauser"
          placeholder="senha"
          value={senhaUsuario}
          onChange={handleInputChange}
          required
        /><br />
        <input className="botao-logar" type="submit" value="Login" name="enviar" />
        <p className="paragrafo">
          Não possui uma conta? <a className="link" href="/Cadastro">Clique aqui</a>.
        </p>
      </form>
    </div>
  );
}

export default Login;
