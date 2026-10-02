import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CarreraDetallePage from '../pages/CarreraDetallePage';

function renderizarConRuta(ruta: string) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/carreras/:id" element={<CarreraDetallePage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('CarreraDetallePage', () => {
  it('muestra la ficha de la carrera solicitada', () => {
    renderizarConRuta('/carreras/gestion-parlamentaria');

    expect(
      screen.getByRole('heading', { level: 1, name: 'Gestión parlamentaria' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Turno: exclusivamente nocturno')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Plan de estudios' })).toBeInTheDocument();
  });

  it('enlaza a la inscripción oficial atenuada mientras no haya URL', () => {
    renderizarConRuta('/carreras/administracion-publica');

    expect(screen.getByText('Inscripción oficial (GCBA)')).toBeInTheDocument();
  });

  it('muestra la página 404 para un id inexistente', () => {
    renderizarConRuta('/carreras/inexistente');

    expect(screen.getByText('Pagina no encontrada')).toBeInTheDocument();
  });
});
