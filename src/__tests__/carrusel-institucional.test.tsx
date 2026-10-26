import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import CarruselInstitucional, { type SlideCarrusel } from '../components/ui/CarruselInstitucional';

const slides: SlideCarrusel[] = [
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
    expect(screen.getByText('Slide 1 de 2')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Pausar rotación automática' }),
    ).not.toBeInTheDocument();
  });

  it('avanza y retrocede entre las novedades', () => {
    render(
      <MemoryRouter>
        <CarruselInstitucional titulo="IFTS N.º 12" slides={slides} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Novedad siguiente' }));
    expect(screen.getByRole('heading', { level: 2, name: 'Novedad dos' })).toBeInTheDocument();
    expect(screen.getByText('Slide 2 de 2')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Novedad anterior' }));
    expect(screen.getByRole('heading', { level: 2, name: 'Novedad uno' })).toBeInTheDocument();
  });

  it('renderiza la imagen con su alt, recorte y punto focal por breakpoint', () => {
    const slidesConImagen: SlideCarrusel[] = [
      {
        ...slides[0],
        imagen: {
          src: '/imagenes/fachada.jpg',
          alt: 'Fachada del instituto',
          recorte: { base: '21/9', tablet: '4/3' },
          puntoFocal: { base: 'arriba', escritorio: 'derecha' },
        },
      },
      slides[1],
    ];

    render(
      <MemoryRouter>
        <CarruselInstitucional titulo="IFTS N.º 12" slides={slidesConImagen} />
      </MemoryRouter>,
    );

    const imagen = screen.getByRole('img', { name: 'Fachada del instituto' });
    expect(imagen).toHaveAttribute('src', '/imagenes/fachada.jpg');
    expect(imagen).toHaveClass('aspect-[21/9]', 'sm:aspect-[4/3]', 'object-top', 'md:object-right');
  });

  it('con autoAvance rota solo y el control permite pausar y reanudar', () => {
    vi.useFakeTimers();

    try {
      render(
        <MemoryRouter>
          <CarruselInstitucional titulo="IFTS N.º 12" slides={slides} autoAvanceMs={1000} />
        </MemoryRouter>,
      );

      expect(screen.getByRole('heading', { level: 2, name: 'Novedad uno' })).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.getByRole('heading', { level: 2, name: 'Novedad dos' })).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Pausar rotación automática' }));
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(screen.getByRole('heading', { level: 2, name: 'Novedad dos' })).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Reanudar rotación automática' }));
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.getByRole('heading', { level: 2, name: 'Novedad uno' })).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
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

  it('sin novedades y aún cargando muestra un skeleton', () => {
    render(<CarruselInstitucional titulo="IFTS N.º 12" slides={[]} cargando />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    const setBuscable = screen.getByText('Cargando novedades destacadas');
    expect(setBuscable).toHaveClass('sr-only');
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Novedad siguiente' })).not.toBeInTheDocument();
  });

  it('sin novedades muestra solo la portada, sin el set ni los controles', () => {
    render(<CarruselInstitucional titulo="IFTS N.º 12" slides={[]} />);

    expect(screen.getByRole('heading', { level: 1, name: 'IFTS N.º 12' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Novedad siguiente' })).not.toBeInTheDocument();
    expect(screen.queryByText('Slide 1 de 2')).not.toBeInTheDocument();
  });
});
