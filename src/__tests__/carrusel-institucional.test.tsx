import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CarruselInstitucional from '../components/ui/CarruselInstitucional';

const slides = [
  {
    id: 's1',
    titulo: 'Novedad uno',
    resumen: 'Resumen de la primera novedad.',
    fecha: '2026-09-01',
    enlace: '/noticias/n1',
  },
  {
    id: 's2',
    titulo: 'Novedad dos',
    resumen: 'Resumen de la segunda novedad.',
    fecha: '2026-08-15',
  },
];

describe('CarruselInstitucional', () => {
  it('muestra la primera novedad y el indicador de posición', () => {
    render(
      <MemoryRouter>
        <CarruselInstitucional titulo="IFTS N.º 12" slides={slides} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'IFTS N.º 12' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Novedad uno' })).toBeInTheDocument();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });

  it('avanza y retrocede entre las novedades', () => {
    render(
      <MemoryRouter>
        <CarruselInstitucional titulo="IFTS N.º 12" slides={slides} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Novedad siguiente' }));
    expect(screen.getByRole('heading', { level: 2, name: 'Novedad dos' })).toBeInTheDocument();
    expect(screen.getByText('2 / 2')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Novedad anterior' }));
    expect(screen.getByRole('heading', { level: 2, name: 'Novedad uno' })).toBeInTheDocument();
  });

  it('enlaza el slide al detalle de la nota cuando existe enlace', () => {
    render(
      <MemoryRouter>
        <CarruselInstitucional titulo="IFTS N.º 12" slides={slides} />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: 'Ver la nota' })).toHaveAttribute(
      'href',
      '/noticias/n1',
    );
  });

  it('no renderiza nada cuando no hay novedades', () => {
    const { container } = render(<CarruselInstitucional titulo="IFTS N.º 12" slides={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
