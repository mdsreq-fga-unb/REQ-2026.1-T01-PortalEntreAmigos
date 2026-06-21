import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Sobre } from '../pages/Sobre/Sobre';
import { Campanhas } from '../pages/Campanhas/Campanhas';
import { Transparencia } from '../pages/Transparencia/Transparencia';
import { Doar } from '../pages/Doar/Doar';
import { MinhaConta } from '../pages/MinhaConta/MinhaConta';
import { Cadastro } from '../pages/Cadastro/Cadastro';
import { Login } from '../pages/Login/Login';
import { GerenciarCampanhas } from '../pages/GerenciarCampanhas/GerenciarCampanhas';
import { NovaCampanha } from '../pages/NovaCampanha/NovaCampanha';
import { CampanhaAtiva } from '../pages/CampanhaAtiva/CampanhaAtiva';
import { ConfirmacaoEmail } from '../pages/ConfirmacaoEmail/ConfirmacaoEmail';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/campanhas" element={<Campanhas />} />
      <Route path="/transparencia" element={<Transparencia />} />
      <Route path="/doar" element={<Doar />} />
      <Route path="/doar/:id" element={<Doar />} />
      <Route path="/minha-conta" element={<MinhaConta />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/gerenciar-campanhas" element={<GerenciarCampanhas />} />
      <Route path="/nova-campanha" element={<NovaCampanha />} />
      <Route path="/campanha-ativa" element={<CampanhaAtiva />} />
      <Route path="/campanha-ativa/:id" element={<CampanhaAtiva />} />
      <Route path="/confirmar-email" element={<ConfirmacaoEmail />} />
    </Routes>
  );
}
