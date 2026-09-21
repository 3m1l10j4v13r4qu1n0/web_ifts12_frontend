import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/layout/Header';
import { MENU_PRINCIPAL } from '../constants/navegacion';

describe('Header', () => {
  it('enlaza el nombre del instituto a la home y muestra el menu principal', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /IFTS N\.º 12/ })).toHaveAttribute('href', '/');
    expect(screen.getByRole('img', { name: 'IFTS N.º 12' })).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Gobierno de la Ciudad de Buenos Aires' }),
    ).toBeInTheDocument();

    for (const item of MENU_PRINCIPAL) {
      expect(screen.getByRole('link', { name: item.etiqueta })).toBeInTheDocument();
    }
  });
});
