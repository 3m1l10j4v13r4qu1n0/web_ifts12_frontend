import { Link, useParams } from 'react-router-dom';
import { mockNoticias } from '../constants/mock-data';
import PaginaNoEncontrada from './PaginaNoEncontrada';

function NotaCompletaPage() {
  const { id } = useParams<{ id: string }>();
  const noticia = mockNoticias.find((item) => item.id === id);

  if (noticia === undefined) {
    return <PaginaNoEncontrada />;
  }

  const otrasNoticias = mockNoticias.filter((item) => item.id !== noticia.id);

  return (
    <main className="min-h-screen">
      <article className="mx-auto max-w-6xl px-4 py-12">
        <nav aria-label="Ruta de navegación" className="text-sm text-slate-500">
          <Link to="/" className="hover:text-acento-700">
            Inicio
          </Link>
          {' / '}
          <Link to="/noticias" className="hover:text-acento-700">
            Novedades
          </Link>
          {' / '}
          <span className="text-slate-900">{noticia.titulo}</span>
        </nav>

        <div className="mt-6 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wide text-acento-700">
            {noticia.fecha !== '' ? noticia.fecha : 'Novedad'}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{noticia.titulo}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">{noticia.resumen}</p>

          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-6">
            <p className="text-slate-500">
              El contenido completo de la nota se publica cuando esté disponible el detalle
              institucional.
            </p>
            <span className="mt-3 inline-block rounded-md bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-500">
              Próximamente
            </span>
          </div>
        </div>

        <aside aria-labelledby="titulo-historial" className="mt-14 border-t border-slate-200 pt-8">
          <h2 id="titulo-historial" className="text-lg font-semibold text-slate-900">
            Otras novedades
          </h2>
          <ul className="mt-4 space-y-2">
            {otrasNoticias.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/noticias/${item.id}`}
                  className="text-sm text-slate-600 transition-colors hover:text-acento-700"
                >
                  {item.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </article>
    </main>
  );
}

export default NotaCompletaPage;
