import { useQuery } from '@tanstack/react-query';
import { mapCarrerasApiACarreras } from '../api/mappers/carrera.mapper';
import { listarTodasLasCarreras } from '../api/services/carrera.service';
import type { Carrera } from '../types/domain/sitio.types';
import { mensajeDeConsulta } from '../utils/mensajeDeConsulta';

/**
 * Estado de la consulta de carreras, con los tres estados que la UI tiene que manejar.
 *
 * `datos` sale ya mapeado al tipo de dominio, así que el componente no conoce ni el DTO ni
 * el nombre `snake_case` del backend (regla de separación de responsabilidades del skill
 * `fe-architect-scaffold`).
 *
 * `total` es el total del servidor, no `carreras.length`: la lista se trae completa hoy,
 * pero el contrato es paginado (BE-N01/BE-N07) y los contadores no deben depender de que
 * entren todas en una página.
 */
export interface EstadoCarreras {
  carreras: Carrera[];
  total: number;
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
    queryKey: ['carreras', 'todas'],
    queryFn: listarTodasLasCarreras,
    staleTime: 5 * 60 * 1000,
  });

  return {
    carreras: consulta.data === undefined ? [] : mapCarrerasApiACarreras(consulta.data.items),
    total: consulta.data?.total ?? 0,
    cargando: consulta.isPending,
    error: consulta.error === null ? null : mensajeDeConsulta(consulta.error, 'las carreras'),
    recargar: () => {
      void consulta.refetch();
    },
  };
}
