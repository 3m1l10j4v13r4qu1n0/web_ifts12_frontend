import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export type TipoToast = 'success' | 'error' | 'info';

const config: Record<TipoToast, { Icono: typeof Info; rol: 'status' | 'alert'; clases: string }> = {
  success: {
    Icono: CheckCircle2,
    rol: 'status',
    clases: 'border-green-300 bg-green-50 text-exito',
  },
  error: { Icono: XCircle, rol: 'alert', clases: 'border-red-300 bg-red-50 text-error' },
  info: { Icono: Info, rol: 'status', clases: 'border-borde bg-acento-50 text-info' },
};

interface ToastProps {
  tipo?: TipoToast;
  children: React.ReactNode;
  onCerrar?: () => void;
  className?: string;
}

/** Toast / mensaje inline. success/error/info, con botón de cierre de 44px. */
function Toast({ tipo = 'info', children, onCerrar, className }: ToastProps) {
  const { Icono, rol, clases } = config[tipo];

  return (
    <div
      role={rol}
      className={cn(
        'flex items-start gap-3 rounded-md border px-4 py-3 text-sm',
        clases,
        className,
      )}
    >
      <Icono aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="flex-1">{children}</p>
      {onCerrar && (
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar aviso"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md hover:bg-black/5"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default Toast;
