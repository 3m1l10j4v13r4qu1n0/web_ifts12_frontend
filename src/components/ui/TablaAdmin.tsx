import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface ColumnaAdmin {
  clave: string;
  etiqueta: string;
  className?: string;
}

export interface FilaAdmin {
  id: string;
  celdas: Record<string, ReactNode>;
}

interface TablaAdminProps {
  columnas: readonly ColumnaAdmin[];
  filas: readonly FilaAdmin[];
  /** Columna extra de acciones (editar/eliminar). */
  acciones?: (fila: FilaAdmin) => ReactNode;
}

/**
 * Tabla del panel admin (B2/RF-25). El vacío y la carga los resuelve quien la
 * usa con `Estado`. Datos de ejemplo NO son contenido real.
 */
function TablaAdmin({ columnas, filas, acciones }: TablaAdminProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-borde-suave">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead className="bg-fondo">
          <tr>
            {columnas.map((columna) => (
              <th
                key={columna.clave}
                scope="col"
                className={cn('px-4 py-3 font-semibold text-texto', columna.className)}
              >
                {columna.etiqueta}
              </th>
            ))}
            {acciones && (
              <th scope="col" className="px-4 py-3 text-right font-semibold text-texto">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila) => (
            <tr key={fila.id} className="border-t border-borde-suave">
              {columnas.map((columna) => (
                <td key={columna.clave} className={cn('px-4 py-3 align-top', columna.className)}>
                  {fila.celdas[columna.clave]}
                </td>
              ))}
              {acciones && <td className="px-4 py-3 text-right align-top">{acciones(fila)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaAdmin;
