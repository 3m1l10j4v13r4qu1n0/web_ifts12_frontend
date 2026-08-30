import { useId, useState } from 'react';
import type { FaqItem } from '../../types/domain/sitio.types';

const etiquetasCategoria: Record<FaqItem['categoria'], string> = {
  ingresantes: 'Ingresantes',
  estudiantes: 'Estudiantes',
  docentes: 'Docentes',
};

interface FaqAcordeonProps {
  items: FaqItem[];
}

function FaqAcordeon({ items }: FaqAcordeonProps) {
  const [abiertoId, setAbiertoId] = useState<string | null>(null);
  const baseId = useId();

  function toggle(itemId: string) {
    setAbiertoId((actual) => (actual === itemId ? null : itemId));
  }

  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
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
                  <span className="text-xs font-medium uppercase tracking-wide text-acento-700">
                    {etiquetasCategoria[item.categoria]}
                  </span>
                  <span className="font-medium text-slate-900">{item.pregunta}</span>
                </span>
                <span aria-hidden="true" className="text-slate-400">
                  {abierto ? '−' : '+'}
                </span>
              </button>
            </h3>
            {abierto && (
              <section id={panelId} aria-labelledby={botonId}>
                <p className="px-6 pb-4 text-sm text-slate-600">{item.respuesta}</p>
              </section>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FaqAcordeon;
