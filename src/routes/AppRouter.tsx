import { Route, Routes } from 'react-router-dom';
import CarrerasPage from '../pages/CarrerasPage';
import ContactoPage from '../pages/ContactoPage';
import DocentesPage from '../pages/DocentesPage';
import EstudiantesPage from '../pages/EstudiantesPage';
import FaqPage from '../pages/FaqPage';
import HomePage from '../pages/HomePage';
import IngresantesPage from '../pages/IngresantesPage';
import InstitucionalPage from '../pages/InstitucionalPage';
import NoticiasPage from '../pages/NoticiasPage';
import PaginaNoEncontrada from '../pages/PaginaNoEncontrada';
import TutoriasPage from '../pages/TutoriasPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/carreras" element={<CarrerasPage />} />
      <Route path="/ingresantes" element={<IngresantesPage />} />
      <Route path="/estudiantes" element={<EstudiantesPage />} />
      <Route path="/docentes" element={<DocentesPage />} />
      <Route path="/tutorias" element={<TutoriasPage />} />
      <Route path="/institucional" element={<InstitucionalPage />} />
      <Route path="/noticias" element={<NoticiasPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="*" element={<PaginaNoEncontrada />} />
    </Routes>
  );
}

export default AppRouter;
