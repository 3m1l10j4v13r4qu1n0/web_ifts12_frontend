import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface FiltroTagProps {
  children: ReactNode;
  activo?: boolean;
  onClick?: () => void;
}

/** Chip de filtro. Área táctil de 44px. Activo = acento. */
function FiltroTag({ children, activo = false, onClick }: FiltroTagProps) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      onClick={onClick}
      className={cn(
        'min-h-11 rounded-full border px-4 text-sm font-medium transition-colors',
        activo
          ? 'border-acento-600 bg-acento-600 text-white'
          : 'border-borde bg-white text-texto-suave hover:border-acento-600 hover:text-acento-700',
      )}
    >
      {children}
    </button>
  );
}

export default FiltroTag;
