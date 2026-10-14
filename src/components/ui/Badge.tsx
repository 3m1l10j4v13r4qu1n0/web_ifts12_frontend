import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type TonoBadge = 'neutro' | 'acento' | 'exito' | 'aviso' | 'error' | 'info';

const tonos: Record<TonoBadge, string> = {
  neutro: 'bg-fondo text-texto-suave',
  acento: 'bg-acento-100 text-acento-800',
  exito: 'bg-green-50 text-exito',
  aviso: 'bg-amber-50 text-aviso',
  error: 'bg-red-50 text-error',
  info: 'bg-acento-50 text-info',
};

interface BadgeProps {
  children: ReactNode;
  tono?: TonoBadge;
  className?: string;
}

/** Etiqueta para fecha, categoría, estado de publicación y modalidad. */
function Badge({ children, tono = 'neutro', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium',
        tonos[tono],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
