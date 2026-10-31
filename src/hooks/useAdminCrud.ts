import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { eliminarAdmin, guardarAdmin, listarAdmin } from '../api/services/admin.service';
import type { RecursoAdmin, RegistroAdmin, ValoresAdmin } from '../types/api/admin.types';

export function useAdminCrud(recurso: RecursoAdmin) {
  const client = useQueryClient();
  const listado = useQuery({
    queryKey: ['admin', recurso],
    queryFn: () => listarAdmin(recurso),
    retry: false,
  });
  const catalogos = useQuery({
    queryKey: ['admin', 'catalogos'],
    queryFn: async () => {
      const recursos: RecursoAdmin[] = ['carreras', 'planes-estudio', 'materias', 'docentes'];
      const listas = await Promise.all(recursos.map(listarAdmin));
      return Object.fromEntries(recursos.map((nombre, i) => [nombre, listas[i]])) as Partial<
        Record<RecursoAdmin, RegistroAdmin[]>
      >;
    },
    retry: false,
  });
  const guardar = useMutation({
    mutationFn: ({ valores, registro }: { valores: ValoresAdmin; registro?: RegistroAdmin }) =>
      guardarAdmin(recurso, valores, registro),
    onSuccess: () => client.invalidateQueries(),
  });
  const eliminar = useMutation({
    mutationFn: (registro: RegistroAdmin) => eliminarAdmin(recurso, registro),
    onSuccess: () => client.invalidateQueries(),
  });
  return { listado, catalogos, guardar, eliminar };
}
