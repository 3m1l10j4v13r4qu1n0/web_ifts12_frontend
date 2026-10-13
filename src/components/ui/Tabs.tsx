import { cn } from '../../utils/cn';

export interface ItemTab {
  id: string;
  etiqueta: string;
}

interface TabsProps {
  tabs: readonly ItemTab[];
  activa: string;
  onChange: (id: string) => void;
}

/**
 * Tabs. La pestaña activa usa borde inferior de 3px + peso 600 (no solo color).
 * En mobile el contenedor hace scroll horizontal.
 */
function Tabs({ tabs, activa, onChange }: TabsProps) {
  return (
    <div
      role="tablist"
      className="flex gap-4 overflow-x-auto border-b border-borde-suave [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {tabs.map((tab) => {
        const esActiva = tab.id === activa;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={esActiva}
            onClick={() => onChange(tab.id)}
            className={cn(
              'min-h-11 shrink-0 border-b-[3px] px-1 text-sm transition-colors',
              esActiva
                ? 'border-acento-600 font-semibold text-acento-700'
                : 'border-transparent text-texto-suave hover:text-texto',
            )}
          >
            {tab.etiqueta}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
