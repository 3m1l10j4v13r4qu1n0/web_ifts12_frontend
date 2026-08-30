import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Button from '../components/ui/Button';

describe('Button', () => {
  it('renderiza un boton con su etiqueta', () => {
    render(<Button>Inscribirme</Button>);

    expect(screen.getByRole('button', { name: 'Inscribirme' })).toBeInTheDocument();
  });

  it('renderiza un enlace interno con Link', () => {
    render(
      <MemoryRouter>
        <Button href="/carreras">Ver carreras</Button>
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Ver carreras' })).toHaveAttribute('href', '/carreras');
  });
});
