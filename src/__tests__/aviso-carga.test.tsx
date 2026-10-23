import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AvisoCarga, { type VarianteAvisoCarga } from '../components/ui/AvisoCarga';

/** Hijos visibles del contenedor, sin contar el texto para lectores de pantalla. */
function bloques(contenedor: HTMLElement): Element[] {
  return Array.from(contenedor.children).filter((hijo) => !hijo.classList.contains('sr-only'));
}

describe('AvisoCarga', () => {
  it('anuncia la carga y marca el contenedor como ocupado', () => {
    render(<AvisoCarga que="las carreras" />);

    const estado = screen.getByRole('status');

    expect(estado).toHaveAttribute('aria-live', 'polite');
    expect(estado).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Cargando las carreras…')).toHaveClass('sr-only');
  });

  it('la variante grilla es la default y muestra 6 tarjetas', () => {
    render(<AvisoCarga que="las carreras" />);

    expect(bloques(screen.getByRole('status'))).toHaveLength(6);
  });

  it('respeta la cantidad pedida', () => {
    render(<AvisoCarga que="las novedades" variante="noticias" cantidad={3} />);

    expect(bloques(screen.getByRole('status'))).toHaveLength(3);
  });

  it.each<VarianteAvisoCarga>([
    'grilla',
    'noticias',
    'carrusel',
    'nota',
    'tabla',
    'ficha',
    'docentes',
    'lista',
  ])('la variante %s renderiza su esqueleto', (variante) => {
    render(<AvisoCarga que="el contenido" variante={variante} cantidad={2} />);

    const estado = screen.getByRole('status');

    expect(estado).toHaveAttribute('aria-busy', 'true');
    expect(estado.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  });

  it('la tabla muestra encabezado más una fila por elemento', () => {
    render(<AvisoCarga que="el resumen" variante="tabla" cantidad={2} />);
    const estado = screen.getByRole('status');

    expect(estado.querySelectorAll('.grid-cols-5')).toHaveLength(3);
  });

  it('las variantes de un solo bloque no dependen de la cantidad', () => {
    for (const variante of ['carrusel', 'nota'] as const) {
      const { unmount } = render(
        <AvisoCarga que="el contenido" variante={variante} cantidad={9} />,
      );

      expect(bloques(screen.getByRole('status'))).toHaveLength(1);
      unmount();
    }
  });

  it('la ficha arma dos columnas, sin importar la cantidad', () => {
    render(<AvisoCarga que="la carrera" variante="ficha" cantidad={9} />);

    expect(bloques(screen.getByRole('status'))).toHaveLength(2);
  });

  it('usa el tono oscuro en el carrusel', () => {
    render(<AvisoCarga que="las novedades" variante="carrusel" />);
    const estado = screen.getByRole('status');

    expect(estado.querySelector('.bg-white\\/20')).not.toBeNull();
  });

  it('acepta clases extra en el contenedor', () => {
    render(<AvisoCarga que="las carreras" className="px-4" />);

    expect(screen.getByRole('status')).toHaveClass('px-4');
  });
});
