import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AccesosRapidos from '../components/ui/AccesosRapidos';

const items = [
  { id: 'carreras', titulo: 'Carreras', descripcion: 'Ofertas académicas.', href: '/carreras' },
  { id: 'becas', titulo: 'Becas', descripcion: 'Información sobre becas.', href: '' },
];

describe('AccesosRapidos', () => {
  it('renderiza enlaces internos y marca los pendientes como deshabilitados', () => {
    render(
      <MemoryRouter>
        <AccesosRapidos items={items} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /Carreras/i })).toHaveAttribute('href', '/carreras');

    const sinEnlace = screen.getByText('Becas').closest('li');
    expect(sinEnlace).toHaveAttribute('aria-disabled', 'true');
  });
});
