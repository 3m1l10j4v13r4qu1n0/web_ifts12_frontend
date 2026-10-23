import { Clock3 } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ModuloNoDisponibleProps {
  /** Qué módulo todavía no está disponible, en minúscula (ej. "las novedades"). */
  que: string;
  /** Explicación breve de por qué no está disponible. Sin datos inventados. */
  mensaje?: string;
  /** Acción opcional (ej. un enlace a otra sección). */
  accion?: ReactNode;
  className?: string;
}

/**
 * Aviso de proceso para un módulo cuya API todavía no está en el contrato.
 *
 * No es un error: el sitio sigue navegable y el mensaje explica que el contenido se publica
 * cuando Backend lo incluya en el contrato. Se anuncia como `role="status"` para que un
 * lector de pantalla lo lea sin interrumpir.
 *
 * El texto no puede repetir anotaciones de diseño (RF-xx, códigos de bloque, "PENDIENTE
 * INSTITUCIONAL"): lo controla `src/__tests__/anotaciones-no-renderizadas.test.ts`.
 */
function ModuloNoDisponible({ que, mensaje, accion, className }: ModuloNoDisponibleProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center gap-3 rounded-lg border border-borde-suave bg-fondo-alt px-6 py-10 text-center',
        className,
      )}
    >
      <Clock3 aria-hidden="true" className="h-8 w-8 text-aviso" />
      <div>
        <p className="text-base font-semibold text-texto">Contenido en preparación</p>
        <p className="mt-1 text-sm text-texto-suave">
          {mensaje ??
            `Estamos terminando de habilitar ${que}. Se publica cuando el contrato de API esté confirmado.`}
        </p>
      </div>
      {accion}
    </div>
  );
}

export default ModuloNoDisponible;
