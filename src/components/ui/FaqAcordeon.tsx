import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import type { FaqItem } from '../../types/domain/sitio.types';

const etiquetasCategoria: Record<FaqItem['categoria'], string> = {
  ingresantes: 'Ingresantes',
  estudiantes: 'Estudiantes',
  docentes: 'Docentes',
  institucional: 'Institucional',
};

interface FaqAcordeonProps {
  items: FaqItem[];
  /**
   * Muestra la etiqueta de categoría sobre cada pregunta. Se oculta en `/faq`, donde el
   * segmento activo ya la indica (diseño `10 · Preguntas frecuentes`).
   */
  mostrarCategoria?: boolean;
}

function FaqAcordeon({ items, mostrarCategoria = true }: FaqAcordeonProps) {
  const [abiertoId, setAbiertoId] = useState<string | null>(null);
  const baseId = useId();

  function toggle(itemId: string) {
    setAbiertoId((actual) => (actual === itemId ? null : itemId));
  }

  return (
    <div className="divide-y divide-borde-suave rounded-xl border border-borde-suave bg-white">
      {items.length === 0 && (
        <p className="px-6 py-4 text-sm text-texto-suave">
          No hay preguntas para este segmento por ahora.
        </p>
      )}
      {items.map((item) => {
        const abierto = abiertoId === item.id;
        const panelId = `${baseId}-panel-${item.id}`;
        const botonId = `${baseId}-boton-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={botonId}
                aria-expanded={abierto}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="flex flex-col gap-1">
                  {mostrarCategoria && (
                    <span className="text-xs font-medium uppercase tracking-wide text-acento-700">
                      {etiquetasCategoria[item.categoria]}
                    </span>
                  )}
                  <span className="font-medium text-texto">{item.pregunta}</span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-5 w-5 text-texto-suave transition-transform ${abierto ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            {abierto && (
              <section id={panelId} aria-labelledby={botonId}>
                <p className="px-6 pb-4 text-sm text-texto-suave">{item.respuesta}</p>
              </section>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FaqAcordeon;
