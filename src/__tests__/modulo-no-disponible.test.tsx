import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ModuloNoDisponible from '../components/ui/ModuloNoDisponible';

describe('ModuloNoDisponible', () => {
  it('anuncia el estado de proceso sin datos inventados', () => {
    render(<ModuloNoDisponible que="las novedades" />);

    const aviso = screen.getByRole('status');

    expect(aviso).toHaveTextContent('Contenido en preparación');
    expect(aviso).toHaveTextContent('Estamos terminando de habilitar las novedades.');
    expect(aviso).toHaveTextContent('contrato de API');
  });

  it('acepta un mensaje propio y una acción', () => {
    render(
      <ModuloNoDisponible
        que="el envío de consultas"
        mensaje="El canal oficial todavía no está disponible."
        accion={<a href="/contacto">Volver a contacto</a>}
      />,
    );

    expect(screen.getByText('El canal oficial todavía no está disponible.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Volver a contacto' })).toHaveAttribute(
      'href',
      '/contacto',
    );
  });
});
