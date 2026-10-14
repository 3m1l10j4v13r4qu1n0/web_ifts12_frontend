import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AccesosDestacados from '../components/ui/AccesosDestacados';
import { mockAccesosDestacados } from '../constants/mock-data';

const items = [
  {
    id: 'carreras',
    titulo: 'Carreras',
    descripcion: 'Oferta académica del instituto.',
    href: '/carreras',
  },
  {
    id: 'campus-virtual',
    titulo: 'Campus virtual',
    descripcion: 'Acceso al aula virtual.',
    href: '',
  },
];

describe('AccesosDestacados', () => {
  it('enlaza los items internos y deshabilita los pendientes', () => {
    render(
      <MemoryRouter>
        <AccesosDestacados items={items} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /Carreras/i })).toHaveAttribute('href', '/carreras');

    const sinEnlace = screen.getByText('Campus virtual').closest('li');
    expect(sinEnlace).toHaveAttribute('aria-disabled', 'true');
  });

  it('la Home tiene los 3 accesos destacados del diseño', () => {
    render(
      <MemoryRouter>
        <AccesosDestacados items={mockAccesosDestacados} />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
