import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FaqAcordeon from '../components/ui/FaqAcordeon';

const items = [
  {
    id: 'f1',
    categoria: 'ingresantes' as const,
    pregunta: '¿Cómo me inscribo?',
    respuesta: 'Respuesta uno',
  },
  {
    id: 'f2',
    categoria: 'estudiantes' as const,
    pregunta: '¿Dónde veo mis calificaciones?',
    respuesta: 'Respuesta dos',
  },
];

describe('FaqAcordeon', () => {
  it('muestra las preguntas con las respuestas ocultas', () => {
    render(<FaqAcordeon items={items} />);

    expect(screen.getByRole('button', { name: /inscribo/i })).toBeInTheDocument();
    expect(screen.queryByText('Respuesta uno')).not.toBeInTheDocument();
  });

  it('abre y cierra una respuesta al hacer clic', async () => {
    const usuario = userEvent.setup();
    render(<FaqAcordeon items={items} />);

    const boton = screen.getByRole('button', { name: /inscribo/i });
    await usuario.click(boton);

    expect(screen.getByText('Respuesta uno')).toBeInTheDocument();
    expect(boton).toHaveAttribute('aria-expanded', 'true');

    await usuario.click(boton);

    expect(screen.queryByText('Respuesta uno')).not.toBeInTheDocument();
    expect(boton).toHaveAttribute('aria-expanded', 'false');
  });
});
