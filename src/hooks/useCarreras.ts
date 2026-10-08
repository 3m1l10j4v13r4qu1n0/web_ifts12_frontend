import { useQuery } from '@tanstack/react-query';
import { mapCarrerasApiACarreras } from '../api/mappers/carrera.mapper';
import { listarCarreras } from '../api/services/carrera.service';
import type { Carrera } from '../types/domain/sitio.types';
import { mensajeDeConsulta } from '../utils/mensajeDeConsulta';

/**
 * Estado de la consulta de carreras, con los tres estados que la UI tiene que manejar.
 *
 * `datos` sale ya mapeado al tipo de dominio, así que el componente no conoce ni el DTO ni
 * el nombre `snake_case` del backend (regla de separación de responsabilidades del skill
 * `fe-architect-scaffold`).
 */
export interface EstadoCarreras {
  carreras: Carrera[];
  cargando: boolean;
  error: string | null;
  recargar: () => void;
}

/**
 * `staleTime: 5 minutos` porque son datos institucionales que cambian poco, y así la
 * navegación entre `/carreras` y `/carreras/:id` no vuelve a pedir la lista en cada salto.
 */
export function useCarreras(): EstadoCarreras {
  const consulta = useQuery({
    queryKey: ['carreras'],
    queryFn: listarCarreras,
    staleTime: 5 * 60 * 1000,
  });

  return {
    carreras: consulta.data === undefined ? [] : mapCarrerasApiACarreras(consulta.data),
    cargando: consulta.isPending,
    error: consulta.error === null ? null : mensajeDeConsulta(consulta.error, 'las carreras'),
    recargar: () => {
      void consulta.refetch();
    },
  };
}
