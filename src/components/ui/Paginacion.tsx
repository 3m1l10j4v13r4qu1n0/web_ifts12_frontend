import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

interface PaginacionProps {
  pagina: number;
  total: number;
  onChange: (pagina: number) => void;
}

/** Paginación. Botones de 44×44 y página actual con aria-current. */
function Paginacion({ pagina, total, onChange }: PaginacionProps) {
  if (total <= 1) {
    return null;
  }

  const paginas = Array.from({ length: total }, (_, indice) => indice + 1);
  const clasesBoton =
    'inline-flex h-11 w-11 items-center justify-center rounded-md border text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-40';

  return (
    <nav aria-label="Paginación" className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        className={cn(clasesBoton, 'border-borde bg-white text-texto hover:border-acento-600')}
        aria-label="Página anterior"
        disabled={pagina <= 1}
        onClick={() => onChange(pagina - 1)}
      >
        <ChevronLeft aria-hidden="true" className="h-4 w-4" />
      </button>

      {paginas.map((numero) => (
        <button
          key={numero}
          type="button"
          aria-current={numero === pagina ? 'page' : undefined}
          onClick={() => onChange(numero)}
          className={cn(
            clasesBoton,
            numero === pagina
              ? 'border-acento-600 bg-acento-600 text-white'
              : 'border-borde bg-white text-texto hover:border-acento-600',
          )}
        >
          {numero}
        </button>
      ))}

      <button
        type="button"
        className={cn(clasesBoton, 'border-borde bg-white text-texto hover:border-acento-600')}
        aria-label="Página siguiente"
        disabled={pagina >= total}
        onClick={() => onChange(pagina + 1)}
      >
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
      </button>
    </nav>
  );
}

export default Paginacion;
