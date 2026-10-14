import { CircleAlert } from 'lucide-react';
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { cn } from '../../utils/cn';

const baseControl =
  'min-h-11 w-full rounded-md border bg-white px-3 py-2 text-sm text-texto placeholder:text-texto-suave/60 focus:outline-none focus:ring-2';

interface FormFieldProps {
  etiqueta: string;
  htmlFor?: string;
  /** Asterisco = obligatorio (Figma: required). */
  requerido?: boolean;
  error?: string;
  ayuda?: string;
  children: ReactNode;
}

/**
 * FormField. Etiqueta visible siempre (no solo placeholder), asterisco para
 * obligatorio y error con ícono + texto (nunca solo color).
 */
export function FormField({
  etiqueta,
  htmlFor,
  requerido = false,
  error,
  ayuda,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium text-texto">
        {etiqueta}
        {requerido && (
          <span aria-hidden="true" className="ml-1 text-error">
            *
          </span>
        )}
      </label>
      {children}
      {ayuda !== undefined && error === undefined && (
        <p className="text-xs text-texto-suave">{ayuda}</p>
      )}
      {error !== undefined && (
        <p role="alert" className="flex items-center gap-1 text-xs text-error">
          <CircleAlert aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

interface ControlProps {
  invalido?: boolean;
}

export function Input({
  invalido = false,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & ControlProps) {
  return (
    <input
      aria-invalid={invalido}
      className={cn(
        baseControl,
        invalido ? 'border-error focus:ring-error' : 'border-borde focus:ring-acento-600',
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  invalido = false,
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & ControlProps) {
  return (
    <select
      aria-invalid={invalido}
      className={cn(
        baseControl,
        invalido ? 'border-error focus:ring-error' : 'border-borde focus:ring-acento-600',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Textarea({
  invalido = false,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & ControlProps) {
  return (
    <textarea
      aria-invalid={invalido}
      className={cn(
        baseControl,
        invalido ? 'border-error focus:ring-error' : 'border-borde focus:ring-acento-600',
        className,
      )}
      {...props}
    />
  );
}
