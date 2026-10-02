import { useQuery } from '@tanstack/react-query';
import { listarNovedades } from '../api/services/novedad.service';
import type { NovedadApi } from '../types/api/novedad.types';
import { mensajeDeConsulta } from '../utils/mensajeDeConsulta';

/**
 * Estado de la consulta de novedades, con los tres estados que la UI tiene que manejar.
 *
 * A diferencia de `useCarreras`, devuelve el **DTO crudo** y no el tipo de dominio. La
 * razón: la página de detalle necesita `contenido`, que el tipo `Noticia` (el de las
 * tarjetas) no tiene. Mapear solo el listado tiraría el cuerpo completo, y el detalle
 * resolvería contra la lista pero terminaría sin el texto.
 */
export interface EstadoNovedades {
  novedades: NovedadApi[];
  cargando: boolean;
  error: string | null;
  recargar: () => void;
}

/**
 * `staleTime: 2 minutos`, más corto que el de carreras: las novedades son las que más
 * cambian (inscripciones, fechas, avisos) y son el contenido que se mira para saber si hay
 * algo nuevo.
 */
export function useNovedades(): EstadoNovedades {
  const consulta = useQuery({
    queryKey: ['novedades'],
    queryFn: listarNovedades,
    staleTime: 2 * 60 * 1000,
  });

  return {
    novedades: consulta.data ?? [],
    cargando: consulta.isPending,
    error: consulta.error === null ? null : mensajeDeConsulta(consulta.error, 'las novedades'),
    recargar: () => {
      void consulta.refetch();
    },
  };
}
