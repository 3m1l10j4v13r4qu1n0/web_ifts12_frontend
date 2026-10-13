import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileQuestion,
  ImageOff,
  Inbox,
  Loader2,
  ShieldOff,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { cn } from '../../utils/cn';

export type TipoEstado =
  | 'loading'
  | 'empty'
  | 'error'
  | 'success'
  | 'sessionExpired'
  | 'noPermission'
  | 'imageMissing'
  | '404';

interface DefinicionEstado {
  Icono: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  titulo: string;
  mensaje: string;
  rol: 'status' | 'alert';
  vivo: 'polite' | 'assertive';
  tono: string;
}

const ESTADOS: Record<TipoEstado, DefinicionEstado> = {
  loading: {
    Icono: Loader2,
    titulo: 'Cargando…',
    mensaje: 'Estamos trayendo la información.',
    rol: 'status',
    vivo: 'polite',
    tono: 'text-texto-suave',
  },
  empty: {
    Icono: Inbox,
    titulo: 'Sin resultados',
    mensaje: 'No hay contenido para mostrar por ahora.',
    rol: 'status',
    vivo: 'polite',
    tono: 'text-texto-suave',
  },
  error: {
    Icono: AlertTriangle,
    titulo: 'No pudimos cargar el contenido',
    mensaje: 'Probá de nuevo en unos minutos.',
    rol: 'alert',
    vivo: 'assertive',
    tono: 'text-error',
  },
  success: {
    Icono: CheckCircle2,
    titulo: 'Listo',
    mensaje: 'La operación se completó correctamente.',
    rol: 'status',
    vivo: 'polite',
    tono: 'text-exito',
  },
  sessionExpired: {
    Icono: Clock,
    titulo: 'Tu sesión expiró',
    mensaje: 'Volvé a iniciar sesión para continuar.',
    rol: 'alert',
    vivo: 'assertive',
    tono: 'text-aviso',
  },
  noPermission: {
    Icono: ShieldOff,
    titulo: 'Sin permisos',
    mensaje: 'Tu usuario no tiene acceso a esta sección.',
    rol: 'alert',
    vivo: 'assertive',
    tono: 'text-error',
  },
  imageMissing: {
    Icono: ImageOff,
    titulo: 'Imagen no disponible',
    mensaje: 'El contenido no tiene una imagen asociada.',
    rol: 'status',
    vivo: 'polite',
    tono: 'text-texto-suave',
  },
  '404': {
    Icono: FileQuestion,
    titulo: 'Página no encontrada (404)',
    mensaje: 'La dirección no existe o fue movida. Podés volver al inicio o usar el buscador.',
    rol: 'alert',
    vivo: 'assertive',
    tono: 'text-error',
  },
};

interface EstadoProps {
  tipo: TipoEstado;
  titulo?: string;
  mensaje?: string;
  /** Acción opcional (ej. "Reintentar" o "Volver al inicio"). */
  accion?: React.ReactNode;
  className?: string;
}

/**
 * Estado de interfaz (I2). Siempre ícono + texto (nunca solo color). Se anuncia
 * con aria-live="polite" (loading/success/empty) o role="alert" (error).
 */
function Estado({ tipo, titulo, mensaje, accion, className }: EstadoProps) {
  const definicion = ESTADOS[tipo];
  const { Icono } = definicion;
  const cargando = tipo === 'loading';

  return (
    <div
      role={definicion.rol}
      aria-live={definicion.vivo}
      className={cn(
        'flex flex-col items-center gap-3 rounded-lg border border-borde-suave bg-white px-6 py-10 text-center',
        className,
      )}
    >
      <Icono
        aria-hidden="true"
        className={cn('h-8 w-8', definicion.tono, cargando && 'animate-spin')}
      />
      <div>
        <p className="text-base font-semibold text-texto">{titulo ?? definicion.titulo}</p>
        <p className="mt-1 text-sm text-texto-suave">{mensaje ?? definicion.mensaje}</p>
      </div>
      {accion}
    </div>
  );
}

export default Estado;
