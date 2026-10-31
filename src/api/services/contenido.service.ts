import { z } from 'zod';
import { zMateriaPublica, zPlanPublico, zSlider } from '../../types/api/contenido.schema';
import apiClient from '../client';

async function todasLasPaginas<T>(ruta: string, schema: z.ZodType<T>): Promise<T[]> {
  const paginaSchema = z.object({ data: z.array(schema), total_pages: z.number() });
  const items: T[] = [];
  for (let page = 1, total = 1; page <= total; page += 1) {
    const respuesta = await apiClient.get(ruta, { params: { page, size: 100 } });
    const pagina = paginaSchema.parse(respuesta.data);
    total = pagina.total_pages;
    items.push(...pagina.data);
  }
  return items;
}
export const listarSlider = () => todasLasPaginas('/slider', zSlider);
export const listarMateriasPublicas = () => todasLasPaginas('/materias', zMateriaPublica);
export async function obtenerPlanPublico(id: number) {
  return z.object({ data: zPlanPublico }).parse((await apiClient.get(`/planes-estudio/${id}`)).data)
    .data;
}
