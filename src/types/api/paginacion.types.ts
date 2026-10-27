/**
 * Respuesta paginada del apispec (`Paginated*`), ya traducida a nombres de la app.
 *
 * El backend usa `data` y `total_pages`; la capa de servicios los convierte a `items` y
 * `totalPages` para que los hooks y las páginas no conozcan el `snake_case` del contrato.
 */
export interface PaginaApi<T> {
  items: T[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
}
