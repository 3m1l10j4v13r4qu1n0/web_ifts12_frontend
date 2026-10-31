import { z } from 'zod';
export const zSlider = z.object({
  id: z.number(),
  titulo: z.string().nullable(),
  subtitulo: z.string().nullable(),
  imagen_url: z.string(),
  orden: z.number(),
});
export const zMateriaPublica = z.object({
  id: z.number(),
  nombre: z.string(),
  programa_url: z.string().nullable(),
  docentes: z
    .array(
      z.object({
        id: z.number(),
        nombre: z.string(),
        apellido: z.string(),
        email: z.string().nullable(),
      }),
    )
    .optional(),
});
export const zPlanPublico = z.object({
  id: z.number(),
  materias: z.array(
    z.object({ anio: z.number(), cuatrimestre: z.number().nullable(), materia: zMateriaPublica }),
  ),
});
