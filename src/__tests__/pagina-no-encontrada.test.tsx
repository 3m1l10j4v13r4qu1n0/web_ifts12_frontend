import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import PaginaNoEncontrada from '../pages/PaginaNoEncontrada';
import { renderConRouter } from '../test-utils';

/** Stub de `/buscar` que deja a la vista la query `q` recibida. */
function MarcadorBusqueda() {
  const [params] = useSearchParams();
  return <p>Consulta recibida: {params.get('q') ?? '(vacía)'}</p>;
}

function renderizarPagina() {
  return renderConRouter(
    <Routes>
      <Route path="/ruta-que-no-existe" element={<PaginaNoEncontrada />} />
      <Route path="/buscar" element={<MarcadorBusqueda />} />
    </Routes>,
    { ruta: '/ruta-que-no-existe' },
  );
}

describe('PaginaNoEncontrada', () => {
  it('muestra el título y la bajada del diseño', () => {
    renderizarPagina();

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Página no encontrada (404)')).toBeInTheDocument();
    expect(
      screen.getByText(
        'La dirección no existe o fue movida. Podés volver al inicio o usar el buscador.',
      ),
    ).toBeInTheDocument();
  });

  it('ofrece el enlace "Ir al inicio" hacia la home', () => {
    renderizarPagina();

    expect(screen.getByRole('link', { name: 'Ir al inicio' })).toHaveAttribute('href', '/');
  });

  it('ofrece el formulario "Buscar en el sitio"', () => {
    renderizarPagina();

    expect(screen.getByLabelText('Buscar en el sitio')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
  });

  it('navega a /buscar?q=… al enviar el formulario', async () => {
    const usuario = userEvent.setup();
    renderizarPagina();

    await usuario.type(screen.getByLabelText('Buscar en el sitio'), 'sistemas');
    await usuario.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(await screen.findByText('Consulta recibida: sistemas')).toBeInTheDocument();
  });

  it('envía el formulario vacío a /buscar sin parámetro q', async () => {
    const usuario = userEvent.setup();
    renderizarPagina();

    await usuario.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(await screen.findByText('Consulta recibida: (vacía)')).toBeInTheDocument();
  });
});
