import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotaCompletaPage from '../pages/NotaCompletaPage';
import NoticiasPage from '../pages/NoticiasPage';

function renderizarNoticia(ruta: string) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/noticias/:id" element={<NotaCompletaPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('NoticiasPage', () => {
  it('filtra las novedades por palabra clave', () => {
    render(
      <MemoryRouter>
        <NoticiasPage />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText('Buscar en novedades'), {
      target: { value: 'inscripción' },
    });

    expect(screen.getByText('Inscripción a mesas de examen')).toBeInTheDocument();
    expect(screen.queryByText('Inicio del ciclo lectivo 2026')).not.toBeInTheDocument();
  });

  it('muestra un estado vacío cuando no hay coincidencias', () => {
    render(
      <MemoryRouter>
        <NoticiasPage />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText('Buscar en novedades'), {
      target: { value: 'algo que no existe' },
    });

    expect(screen.getByText(/no se encontraron novedades/i)).toBeInTheDocument();
  });
});

describe('NotaCompletaPage', () => {
  it('muestra la nota solicitada', () => {
    renderizarNoticia('/noticias/novedad-1');

    expect(screen.getByRole('heading', { level: 1, name: 'Inicio del ciclo lectivo 2026' }));
  });

  it('muestra la página 404 para un id inexistente', () => {
    renderizarNoticia('/noticias/inexistente');

    expect(screen.getByText('Pagina no encontrada')).toBeInTheDocument();
  });
});
