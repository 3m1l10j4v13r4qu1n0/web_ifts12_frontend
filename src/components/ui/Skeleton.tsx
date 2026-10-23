import { cn } from '../../utils/cn';

export type TonoSkeleton = 'neutro' | 'oscuro';

interface SkeletonProps {
  /** Tamaño y forma del bloque. Sin clases de color: el tono lo define `tono`. */
  className?: string;
  /**
   * Fondo del bloque. `neutro` para superficies claras y `oscuro` para paneles con fondo
   * oscuro (por ejemplo, el carrusel de la portada).
   */
  tono?: TonoSkeleton;
}

const FONDOS: Record<TonoSkeleton, string> = {
  neutro: 'bg-slate-200',
  oscuro: 'bg-white/20',
};

/**
 * Bloque base de los estados de carga.
 *
 * `aria-hidden` por defecto: el esqueleto es decorativo y el anuncio accesible lo hace el
 * contenedor (`AvisoCarga`), que es el que tiene `role="status"`. `motion-reduce` respeta la
 * preferencia de reducir animaciones.
 */
function Skeleton({ className, tono = 'neutro' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-md motion-reduce:animate-none', FONDOS[tono], className)}
    />
  );
}

export default Skeleton;
