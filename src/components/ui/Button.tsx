import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

type VarianteBoton = 'primario' | 'secundario' | 'texto';
type TamanoBoton = 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  variante?: VarianteBoton;
  tamano?: TamanoBoton;
  className?: string;
  href?: string;
}

const estilosBase =
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento-700';

const estilosVariante: Record<VarianteBoton, string> = {
  primario: 'bg-acento-600 text-white hover:bg-acento-700',
  secundario:
    'border border-slate-300 bg-white text-slate-700 hover:border-acento-600 hover:text-acento-700',
  texto: 'text-acento-700 hover:text-acento-800',
};

const estilosTamano: Record<TamanoBoton, string> = {
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

function Button({
  children,
  variante = 'primario',
  tamano = 'md',
  className,
  href,
  ...props
}: ButtonProps) {
  const clases = cn(estilosBase, estilosVariante[variante], estilosTamano[tamano], className);

  if (href) {
    const esInterno = href.startsWith('/');
    const clasesCompartidas = cn(clases, 'no-underline');

    return esInterno ? (
      <Link to={href} className={clasesCompartidas}>
        {children}
      </Link>
    ) : (
      <a href={href} className={clasesCompartidas} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={clases} {...props}>
      {children}
    </button>
  );
}

export default Button;
