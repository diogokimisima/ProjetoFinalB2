import './style.css';
import { useState } from 'react';

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
  
    fetch('http://localhost/pastelariakina/backend/cadastro.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ocorreu um erro ao cadastrar o usuário.'); // Lança um erro caso a resposta não esteja OK
      }
      return response.text(); // Retorna o texto da resposta em caso de sucesso
    })
    .then(data => {
      // Aqui você pode fazer o que quiser com a resposta da requisição,
      // neste caso, podemos exibir a mensagem de sucesso
      alert('O cadastro foi realizado com sucesso!');
      window.location.href = '/Login';
      // ou atualizar um estado para exibir a mensagem na interface, por exemplo:
      // setCadastroSucesso(true);
    })
    .catch(error => {
      console.error('Erro:', error.message);
      alert(error.message); // Exibe a mensagem de erro capturada
    });
  };
  
  

  return (
    <div className='container'>
      <form className="formulario" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
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
