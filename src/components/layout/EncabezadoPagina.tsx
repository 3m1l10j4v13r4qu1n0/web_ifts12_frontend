import type { ReactNode } from 'react';
import Breadcrumb, { type ItemBreadcrumb } from '../ui/Breadcrumb';
import Eyebrow, { type ColorSeccion } from '../ui/Eyebrow';

interface EncabezadoPaginaProps {
  /** Ruta de navegación (Inicio / Sección). Se omite en la home. */
  breadcrumb?: readonly ItemBreadcrumb[];
  eyebrow?: string;
  /** Acento de sección (solo en el mark del eyebrow). */
  seccion?: ColorSeccion;
  titulo: string;
  descripcion?: ReactNode;
}

/**
 * Encabezado estándar de página (Figma v2): banda de fondo neutro, breadcrumb opcional,
 * eyebrow con acento de sección, H1 y bajada. Reemplaza el patrón repetido
 * `border-b bg-slate-50 → h1 text-3xl font-bold` de la versión anterior.
 */
function EncabezadoPagina({
  breadcrumb,
  eyebrow,
  seccion = 'rojo',
  titulo,
  descripcion,
}: EncabezadoPaginaProps) {
  return (
    <div className="border-b border-borde-suave bg-fondo">
      <div className="mx-auto max-w-contenido px-4 py-12">
        {breadcrumb !== undefined && (
          <div className="mb-4">
            <Breadcrumb items={breadcrumb} />
          </div>
        )}
        {eyebrow !== undefined && <Eyebrow seccion={seccion}>{eyebrow}</Eyebrow>}
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-texto md:text-4xl lg:text-5xl">
          {titulo}
        </h1>
        {descripcion !== undefined && (
          <p className="mt-3 max-w-2xl text-lg text-texto-suave">{descripcion}</p>
        )}
      </div>
    </div>
  );
}

export default EncabezadoPagina;
