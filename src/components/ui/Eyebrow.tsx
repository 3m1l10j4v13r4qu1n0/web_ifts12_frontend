import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type ColorSeccion = 'rojo' | 'verde' | 'ambar' | 'cian' | 'naranja';

const colores: Record<ColorSeccion, string> = {
  rojo: 'bg-seccion-rojo',
  verde: 'bg-seccion-verde',
  ambar: 'bg-seccion-ambar',
  cian: 'bg-seccion-cian',
  naranja: 'bg-seccion-naranja',
};

interface EyebrowProps {
  children: ReactNode;
  /** The section accent color (FLACSO): solo en el mark, el texto va en neutro. */
  seccion?: ColorSeccion;
}

/**
 * Único lugar, junto a breadcrumb/indicador/overlay, donde se usa el color de
 * sección. El texto queda en neutro para garantizar contraste AA.
 */
function Eyebrow({ children, seccion = 'rojo' }: EyebrowProps) {
  return (
    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-texto-suave">
      <span
        aria-hidden="true"
        className={cn('inline-block h-1 w-6 rounded-full', colores[seccion])}
      />
      {children}
    </p>
  );
}

export default Eyebrow;
