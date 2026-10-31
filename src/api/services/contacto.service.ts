import { zContactoDto } from '../../types/api/despliegue.schema';
import apiClient from '../client';
import { endpoints } from '../endpoints';

export interface Consulta {
  nombre: string;
  email: string;
  mensaje: string;
}

export async function registrarConsulta(consulta: Consulta): Promise<void> {
  const respuesta = await apiClient.post<unknown>(endpoints.contacto.crear, consulta);
  zContactoDto.parse(respuesta.data);
}
