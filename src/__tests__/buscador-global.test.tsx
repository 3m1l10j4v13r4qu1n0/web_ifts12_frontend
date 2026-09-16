import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BuscadorGlobal from '../components/layout/BuscadorGlobal';

describe('BuscadorGlobal', () => {
  it('filtra contenido local y muestra resultados al escribir', () => {
    render(
      <MemoryRouter>
        <BuscadorGlobal />
      </MemoryRouter>,
    );

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'parlamentaria' } });

    expect(screen.getByText('Gestión parlamentaria')).toBeInTheDocument();
  });

  it('invita a navegar a un resultado con Enter', () => {
    render(
      <MemoryRouter>
        <BuscadorGlobal />
      </MemoryRouter>,
    );

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'parlamentaria' } });
    fireEvent.submit(input.closest('form') as HTMLFormElement);

    expect(screen.queryByText('Gestión parlamentaria')).not.toBeInTheDocument();
  });
});
