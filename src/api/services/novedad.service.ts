import { zPaginaNovedades } from '../../types/api/despliegue.schema';
import type { NovedadApi } from '../../types/api/novedad.types';
import apiClient from '../client';
import { endpoints } from '../endpoints';

/** Lee todas las páginas de /api/v1/novedades y conserva el modelo de vista. */
export async function listarNovedades(): Promise<NovedadApi[]> {
  const pedirPagina = async (page: number) => {
    const respuesta = await apiClient.get<unknown>(endpoints.novedades.listar, {
      params: { page, size: 100 },
    });
    return zPaginaNovedades.parse(respuesta.data);
  };
  const primera = await pedirPagina(1);
  const restantes = await Promise.all(
    Array.from({ length: Math.max(0, primera.total_pages - 1) }, (_, i) => pedirPagina(i + 2)),
  );
  // Modelo de vista legado: el API actual no aporta categoría.
  return [primera, ...restantes].flatMap((pagina) =>
    pagina.data.map((item) => ({
      id: item.id,
      titulo: item.titulo,
      copete: item.copete,
      contenido: item.cuerpo ?? '',
      categoria: null,
      imagen_url: item.imagen_url,
      destacado: item.destacado,
      fecha_publicacion: item.fecha,
    })),
  );
}
