import './style.css';
import Topo from '../../Componentes/Topo';
import Rodape from '../../Componentes/Rodape';
import { ScrollToTopButton } from '../../Componentes/VoltarTopo';


const Gerenciamento = () => {
  return (
    <div className='secao-principal-sobre'>
      <Topo />
      <main className='secao-gerenciamento limitar-secao'>
        <h1>Gerenciamento De Estoque</h1>

      </main>

      <ScrollToTopButton />
      <Rodape />
    </div>
  );
};

export default Gerenciamento;
