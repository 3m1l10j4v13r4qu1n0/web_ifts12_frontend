import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export type VarianteBoton = 'primario' | 'secundario' | 'fantasma' | 'enlace';
export type TamanoBoton = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  variante?: VarianteBoton;
  tamano?: TamanoBoton;
  /** Reemplaza la etiqueta por "Cargando…" + spinner (Figma: state=loading). */
  cargando?: boolean;
  className?: string;
  href?: string;
}

const estilosBase =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md font-medium no-underline transition-colors disabled:pointer-events-none disabled:opacity-60';

const estilosVariante: Record<VarianteBoton, string> = {
  primario: 'bg-acento-600 text-white hover:bg-acento-700',
  secundario:
    'border border-borde bg-white text-texto hover:border-acento-600 hover:text-acento-700',
  fantasma: 'text-acento-700 hover:bg-acento-50',
  enlace: 'text-acento-700 underline underline-offset-2 hover:text-acento-800',
};

const estilosTamano: Record<TamanoBoton, string> = {
  sm: 'px-3 text-sm',
  md: 'px-4 text-sm',
  lg: 'px-6 text-base',
};

function Button({
  children,
  variante = 'primario',
  tamano = 'md',
  cargando = false,
  className,
  href,
  disabled,
  ...props
}: ButtonProps) {
  const clases = cn(estilosBase, estilosVariante[variante], estilosTamano[tamano], className);

  if (href !== undefined && href !== '') {
    const esInterno = href.startsWith('/');
    const contenido = (
      <>
        {cargando && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
        {cargando ? 'Cargando…' : children}
      </>
    );

    return esInterno ? (
      <Link to={href} className={clases}>
        {contenido}
      </Link>
    ) : (
      <a href={href} className={clases} rel="noopener noreferrer">
        {contenido}
      </a>
    );
  }

  return (
    <button type="button" className={clases} disabled={disabled ?? cargando} {...props}>
      {cargando && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
      {cargando ? 'Cargando…' : children}
    </button>
  );
}

export default Button;
