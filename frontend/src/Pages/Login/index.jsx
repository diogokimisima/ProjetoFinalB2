import React, { useState } from 'react';
import './style.css';

function Login() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [mensagem, setMensagem] = useState('');

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
      const response = await fetch('http://localhost/pastelariakina/backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          nomeuser: nomeUsuario,
          senhauser: senhaUsuario
        })
      });

      const data = await response.text();
      
      if (response.ok) {
        setMensagem(data);
        window.location.href = '/';
      } else {
        setMensagem(data);
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem('Ocorreu um erro ao realizar o login.');
    }
  };

  return (
    <div className="container"> 
      {mensagem && <div className="mensagem">{mensagem}</div>}
      <form className="formulario" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          className="input-text"
          type="text"
          name="nomeuser"
          placeholder="Username"
          value={nomeUsuario}
          onChange={handleInputChange}
          required
        /><br />
        <input
          className="input-password"
          type="password"
          name="senhauser"
          placeholder="Password"
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
