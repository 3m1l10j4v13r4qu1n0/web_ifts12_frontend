import { z } from 'zod';
import { zRespuestaPaginada } from './paginacion.schema';

// Contrato verificado en Backend dff587c: apps/news/models.py y apps/users/routes.py.
// Los servicios lo adaptan a los modelos que ya usan las pantallas.
export const zNovedadDto = z.object({
  id: z.number().int(),
  titulo: z.string().min(1),
  copete: z.string().nullable(),
  cuerpo: z.string().nullable(),
  fecha: z.string().nullable(),
  imagen_url: z.string().nullable(),
  destacado: z.boolean(),
});

export const zPaginaNovedades = zRespuestaPaginada(zNovedadDto);

export const zLoginDto = z.object({
  data: z.object({
    access_token: z.string().min(1),
    usuario: z.object({
      id: z.number().int(),
      nombre: z.string().min(1),
      email: z.string().min(1),
      rol: z.string().nullable(),
    }),
  }),
});

export const zContactoDto = z.object({
  data: z.object({ mensaje: z.string().min(1) }),
});
