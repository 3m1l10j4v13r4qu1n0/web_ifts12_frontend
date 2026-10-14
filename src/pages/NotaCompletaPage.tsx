import { Link, useParams } from 'react-router-dom';
import {
  buscarNovedadPorSlug,
  fechaNovedadAIso,
  slugDesdeNovedad,
} from '../api/mappers/novedad.mapper';
import AvisoCarga from '../components/ui/AvisoCarga';
import AvisoError from '../components/ui/AvisoError';
import { useNovedades } from '../hooks/useNovedades';
import PaginaNoEncontrada from './PaginaNoEncontrada';

function NotaCompletaPage() {
  const { id } = useParams<{ id: string }>();
  const { novedades, cargando, error, recargar } = useNovedades();

  // El backend no expone `GET /api/noticias/:id`, así que el detalle se resuelve contra la
  // lista completa. Es la misma consulta que el listado, que TanStack Query cachea.
  const noticia = id === undefined ? undefined : buscarNovedadPorSlug(novedades, id);

  if (cargando) {
    return (
      <main className="min-h-screen">
        <article className="mx-auto max-w-contenido px-4 py-12">
          <h1 className="text-4xl font-semibold text-texto">Novedad</h1>
          <AvisoCarga que="la novedad" />
        </article>
      </main>
    );
  }

  if (error !== null) {
    return (
      <main className="min-h-screen">
        <article className="mx-auto max-w-contenido px-4 py-12">
          <h1 className="text-4xl font-semibold text-texto">Novedad</h1>
          <AvisoError que="la novedad" mensaje={error} alReintentar={recargar} />
        </article>
      </main>
    );
  }

  if (noticia === undefined) {
    return <PaginaNoEncontrada />;
  }

  const otrasNovedades = novedades.filter((item) => item.id !== noticia.id);
  const fecha = fechaNovedadAIso(noticia.fecha_publicacion);

  return (
    <main className="min-h-screen">
      <article className="mx-auto max-w-contenido px-4 py-12">
        <nav aria-label="Ruta de navegación" className="text-sm text-texto-suave">
          <Link to="/" className="hover:text-acento-700">
            Inicio
          </Link>
          {' / '}
          <Link to="/noticias" className="hover:text-acento-700">
            Novedades
          </Link>
          {' / '}
          <span className="text-texto">{noticia.titulo}</span>
        </nav>

        <div className="mt-6 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wide text-acento-700">
            {fecha ?? 'Novedad'}
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-texto">{noticia.titulo}</h1>
          {noticia.copete !== null && (
            <p className="mt-4 text-lg leading-relaxed text-texto">{noticia.copete}</p>
          )}

          <p className="mt-6 whitespace-pre-line leading-relaxed text-texto-suave">
            {noticia.contenido}
          </p>

          {noticia.categoria !== null && (
            <p className="mt-8 border-t border-borde-suave pt-4 text-sm text-texto-suave">
              Categoría: {noticia.categoria}
            </p>
          )}
        </div>

        {otrasNovedades.length > 0 && (
          <aside
            aria-labelledby="titulo-historial"
            className="mt-14 border-t border-borde-suave pt-8"
          >
            <h2 id="titulo-historial" className="text-lg font-semibold text-texto">
              Otras novedades
            </h2>
            <ul className="mt-4 space-y-2">
              {otrasNovedades.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/noticias/${slugDesdeNovedad(item)}`}
                    className="text-sm text-texto-suave transition-colors hover:text-acento-700"
                  >
                    {item.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </main>
  );
}

export default NotaCompletaPage;
