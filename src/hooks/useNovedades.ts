import { useQuery } from '@tanstack/react-query';
import { listarNovedades } from '../api/services/novedad.service';
import { novedadesHabilitadas } from '../constants/contrato';
import type { NovedadApi } from '../types/api/novedad.types';
import { mensajeDeConsulta } from '../utils/mensajeDeConsulta';

/**
 * Estado de la consulta de novedades, con los tres estados que la UI tiene que manejar.
 *
 * `GET /api/novedades` no figura en el apispec (BE-N03), así que la consulta queda detrás de
 * `novedadesHabilitadas()`. Con el módulo apagado no se dispara el request y el hook devuelve
 * `cargando: false`, `error: null` y la lista vacía; la UI muestra un aviso de proceso.
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
  /** `false` cuando el módulo está aislado por no figurar en el apispec. */
  habilitado: boolean;
  recargar: () => void;
}

/**
 * `staleTime: 2 minutos`, más corto que el de carreras: las novedades son las que más
 * cambian (inscripciones, fechas, avisos) y son el contenido que se mira para saber si hay
 * algo nuevo.
 */
export function useNovedades(): EstadoNovedades {
  const habilitado = novedadesHabilitadas();
  const consulta = useQuery({
    queryKey: ['novedades'],
    queryFn: listarNovedades,
    staleTime: 2 * 60 * 1000,
    enabled: habilitado,
  });

  return {
    novedades: habilitado ? (consulta.data ?? []) : [],
    cargando: habilitado && consulta.isPending,
    error:
      !habilitado || consulta.error === null
        ? null
        : mensajeDeConsulta(consulta.error, 'las novedades'),
    habilitado,
    recargar: () => {
      if (habilitado) {
        void consulta.refetch();
      }
    },
  };
}
