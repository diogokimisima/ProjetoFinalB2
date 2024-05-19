import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../Pages/Home';
import Cardapio from '../Pages/Cardapio';
import Sobre from "../Pages/Sobre";
import Cadastro from "../Pages/Cadastro";
import Login from "../Pages/Login";

export default function Rotas() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Cardapio' element={<Cardapio />}/>
        <Route path='/Sobre' element={<Sobre />}/>
        <Route path='/Cadastro' element={<Cadastro />}/>
        <Route path='/Login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
    )
}