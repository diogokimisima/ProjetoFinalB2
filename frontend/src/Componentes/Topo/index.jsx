import './style.css';
import Logo from '../../img/logo.png';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function Topo() {
  const [ativar, setAtivar] = useState("nav-list");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === '1');
    setIsLoggedIn(!!adminStatus)
  }, []);

  const navList = () => {
    ativar === 'nav-list' ? setAtivar('nav-list nav-active') : setAtivar("nav-list");
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    window.location.href = '/';
  };

  return (
    <header>
      <div className='limitar-secao navbar'>
        <Link className="link-topo" to="/"><img src={Logo} alt="logo" /></Link>
        <nav>
          <div className="mobile-menu" onClick={navList}>
            <div className='line1'></div>
            <div className='line2'></div>
            <div className='line3'></div>
          </div>
          <div className={ativar} id="links">
            <Link className="link-topo" to="/">INICIO</Link>
            <Link className="link-topo" to="/Cardapio">CARDÁPIO</Link>
            <Link className="link-topo" to="/Sobre">SOBRE</Link>
            {isLoggedIn ? null : (
              <>
            <Link className="link-topo" to="/Cadastro">CADASTRO</Link>
            <Link className="link-topo" to="/Login">LOGIN</Link>
             </>
            )}
            {isLoggedIn && isAdmin && <Link className="link-topo" to="/Gerenciamento">GERENCIAMENTO</Link>}
            {isLoggedIn && <button className="link-topo button-logout" onClick={handleLogout}>logout</button>}
          </div>
        </nav>
      </div>
    </header>
  );
}
