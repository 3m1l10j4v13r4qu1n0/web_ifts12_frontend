import { useQuery } from '@tanstack/react-query';
import { planVigente, slugDesdeCarrera } from '../api/mappers/carrera.mapper';
import { listarTodasLasCarreras } from '../api/services/carrera.service';
import {
  listarMateriasPublicas,
  listarSlider,
  obtenerPlanPublico,
} from '../api/services/contenido.service';

export function useSliderInstitucional() {
  return useQuery({ queryKey: ['slider'], queryFn: listarSlider, staleTime: 300000 });
}
export function usePlanPublico(slug: string) {
  const carreras = useQuery({
    queryKey: ['carreras', 'todas'],
    queryFn: listarTodasLasCarreras,
    staleTime: 300000,
  });
  const carrera = carreras.data?.items.find((item) => slugDesdeCarrera(item) === slug);
  const plan = carrera ? planVigente(carrera.planes) : undefined;
  const consulta = useQuery({
    queryKey: ['plan-publico', plan?.id],
    queryFn: () => obtenerPlanPublico(plan?.id ?? 0),
    enabled: plan !== undefined,
  });
  const materias = useQuery({
    queryKey: ['materias-publicas'],
    queryFn: listarMateriasPublicas,
    enabled: plan !== undefined,
  });
  return { consulta, materias, existePlan: plan !== undefined };
}
