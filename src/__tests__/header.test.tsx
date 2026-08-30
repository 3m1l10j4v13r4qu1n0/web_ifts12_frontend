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

    expect(screen.getByRole('link', { name: 'IFTS N.º 12' })).toHaveAttribute('href', '/');

    for (const item of MENU_PRINCIPAL) {
      expect(screen.getByRole('link', { name: item.etiqueta })).toBeInTheDocument();
    }
  });
});
