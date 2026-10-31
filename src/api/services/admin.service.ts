import { z } from 'zod';
import type { RecursoAdmin, RegistroAdmin, ValoresAdmin } from '../../types/api/admin.types';
import { zRespuestaPaginada } from '../../types/api/paginacion.schema';
import apiClient from '../client';

const zRegistro = z
  .object({
    id: z.number().int().optional(),
    docente_id: z.number().int().optional(),
    materia_id: z.number().int().optional(),
  })
  .passthrough();
const zPagina = zRespuestaPaginada(zRegistro);
const rutas: Record<RecursoAdmin, string> = {
  carreras: '/carreras',
  'planes-estudio': '/planes-estudio',
  materias: '/materias',
  docentes: '/docentes',
  'planes-materias': '/planes-materias',
  'docentes-materias': '/docentes-materias',
};

export function claveRegistro(recurso: RecursoAdmin, registro: RegistroAdmin): string {
  return recurso === 'docentes-materias'
    ? `${registro.docente_id}/${registro.materia_id}`
    : String(registro.id);
}

export async function listarAdmin(recurso: RecursoAdmin): Promise<RegistroAdmin[]> {
  const registros: RegistroAdmin[] = [];
  let page = 1;
  let totalPages = 1;
  do {
    const response = await apiClient.get<unknown>(rutas[recurso], {
      params: { page, size: 100, incluir_inactivas: true },
    });
    const pagina = zPagina.parse(response.data);
    registros.push(...pagina.data);
    totalPages = pagina.total_pages;
    page += 1;
  } while (page <= totalPages);
  return registros;
}

export async function guardarAdmin(
  recurso: RecursoAdmin,
  valores: ValoresAdmin,
  registro?: RegistroAdmin,
) {
  const response = registro
    ? await apiClient.patch<unknown>(
        `${rutas[recurso]}/${claveRegistro(recurso, registro)}`,
        valores,
      )
    : await apiClient.post<unknown>(rutas[recurso], valores);
  return z.object({ data: zRegistro }).parse(response.data).data;
}

export async function eliminarAdmin(recurso: RecursoAdmin, registro: RegistroAdmin) {
  await apiClient.delete(`${rutas[recurso]}/${claveRegistro(recurso, registro)}`);
}
