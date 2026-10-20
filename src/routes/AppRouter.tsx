import { Route, Routes } from 'react-router-dom';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminPanelPage from '../pages/AdminPanelPage';
import BusquedaPage from '../pages/BusquedaPage';
import CarreraDetallePage from '../pages/CarreraDetallePage';
import CarrerasPage from '../pages/CarrerasPage';
import ContactoPage from '../pages/ContactoPage';
import DocentesPage from '../pages/DocentesPage';
import EstudiantesPage from '../pages/EstudiantesPage';
import FaqPage from '../pages/FaqPage';
import HomePage from '../pages/HomePage';
import IngresantesPage from '../pages/IngresantesPage';
import InstitucionalPage from '../pages/InstitucionalPage';
import NotaCompletaPage from '../pages/NotaCompletaPage';
import NoticiasPage from '../pages/NoticiasPage';
import PaginaNoEncontrada from '../pages/PaginaNoEncontrada';
import TutoriasPage from '../pages/TutoriasPage';
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/buscar" element={<BusquedaPage />} />
      <Route path="/carreras" element={<CarrerasPage />} />
      <Route path="/carreras/:id" element={<CarreraDetallePage />} />
      <Route path="/ingresantes" element={<IngresantesPage />} />
      <Route path="/estudiantes" element={<EstudiantesPage />} />
      <Route path="/docentes" element={<DocentesPage />} />
      <Route path="/tutorias" element={<TutoriasPage />} />
      <Route path="/institucional" element={<InstitucionalPage />} />
      <Route path="/noticias" element={<NoticiasPage />} />
      <Route path="/noticias/:id" element={<NotaCompletaPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanelPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PaginaNoEncontrada />} />
    </Routes>
  );
}

export default AppRouter;
