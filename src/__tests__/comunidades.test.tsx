import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Comunidades from '../components/ui/Comunidades';

const items = [
  {
    id: 'tutoria',
    titulo: 'Comunidad de tutoría',
    descripcion: 'Acompañamiento.',
    href: '/tutorias',
  },
  {
    id: 'alumnos',
    titulo: 'Comunidad de alumnos',
    descripcion: 'Servicios.',
    href: '/estudiantes',
  },
];

describe('Comunidades', () => {
  it('renderiza cada comunidad como enlace a su ruta', () => {
    render(
      <MemoryRouter>
        <Comunidades items={items} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /Comunidad de tutoría/i })).toHaveAttribute(
      'href',
      '/tutorias',
    );
    expect(screen.getByRole('link', { name: /Comunidad de alumnos/i })).toHaveAttribute(
      'href',
      '/estudiantes',
    );
  });
});
