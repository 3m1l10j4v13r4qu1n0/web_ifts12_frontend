import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Skeleton from '../components/ui/Skeleton';

describe('Skeleton', () => {
  it('es decorativo y no se anuncia en lectores de pantalla', () => {
    const { container } = render(<Skeleton />);
    const bloque = container.firstElementChild;

    expect(bloque).toHaveAttribute('aria-hidden', 'true');
  });

  it('anima por defecto y respeta la preferencia de reducir movimiento', () => {
    const { container } = render(<Skeleton />);
    const bloque = container.firstElementChild;

    expect(bloque).toHaveClass('animate-pulse');
    expect(bloque).toHaveClass('motion-reduce:animate-none');
  });

  it('usa fondo neutro por defecto y permite el tono oscuro', () => {
    const { container, rerender } = render(<Skeleton />);

    expect(container.firstElementChild).toHaveClass('bg-slate-200');

    rerender(<Skeleton tono="oscuro" />);
    expect(container.firstElementChild).toHaveClass('bg-white/20');
  });

  it('acepta clases de tamaño y forma', () => {
    const { container } = render(<Skeleton className="h-4 w-1/2 rounded-full" />);
    const bloque = container.firstElementChild;

    expect(bloque).toHaveClass('h-4', 'w-1/2', 'rounded-full');
  });
});
