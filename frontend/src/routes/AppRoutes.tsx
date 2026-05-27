import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Sobre } from '../pages/Sobre/Sobre';
import { Campanhas } from '../pages/Campanhas/Campanhas';
import { Transparencia } from '../pages/Transparencia/Transparencia';
import { Doar } from '../pages/Doar/Doar';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/campanhas" element={<Campanhas />} />
      <Route path="/transparencia" element={<Transparencia />} />
      <Route path="/doar" element={<Doar />} />
    </Routes>
  );
}
