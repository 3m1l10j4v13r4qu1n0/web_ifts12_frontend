import { fireEvent, render, screen } from '@testing-library/react';
import SliderNoticias from '../components/ui/SliderNoticias';

const noticias = [
  {
    id: 'n1',
    titulo: 'Novedad uno',
    resumen: 'Resumen de la primera novedad.',
    fecha: '2026-08-30',
  },
  {
    id: 'n2',
    titulo: 'Novedad dos',
    resumen: 'Resumen de la segunda novedad.',
    fecha: '2026-08-29',
  },
];

describe('SliderNoticias', () => {
  it('muestra la primera noticia y el indicador de posición', () => {
    render(<SliderNoticias noticias={noticias} />);
    expect(screen.getByRole('article').textContent).toContain('Novedad uno');
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });

  it('avanza a la siguiente noticia al pulsar el boton siguiente', () => {
    render(<SliderNoticias noticias={noticias} />);
    fireEvent.click(screen.getByRole('button', { name: 'Noticia siguiente' }));
    expect(screen.getByRole('article').textContent).toContain('Novedad dos');
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
  });

  it('no renderiza nada cuando no hay noticias', () => {
    const { container } = render(<SliderNoticias noticias={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
