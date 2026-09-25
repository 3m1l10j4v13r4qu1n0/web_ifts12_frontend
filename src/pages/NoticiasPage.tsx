import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CardNoticia from '../components/ui/CardNoticia';
import { mockNoticias } from '../constants/mock-data';

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function NoticiasPage() {
  const [consulta, setConsulta] = useState('');

  const noticiasFiltradas = useMemo(() => {
    const ordenadas = [...mockNoticias].sort((a, b) => {
      if (a.fecha === '' && b.fecha === '') return 0;
      if (a.fecha === '') return 1;
      if (b.fecha === '') return -1;
      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });

    const termino = normalizar(consulta.trim());
    if (termino === '') {
      return ordenadas;
    }

    return ordenadas.filter((noticia) =>
      normalizar(`${noticia.titulo} ${noticia.resumen}`).includes(termino),
    );
  }, [consulta]);

  return (
    <main className="min-h-screen">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-900">Novedades</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Noticias e información oficial del instituto, ordenadas de la más reciente a la más
            antigua.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-xl">
          <label htmlFor="buscador-noticias" className="block text-sm font-medium text-slate-700">
            Buscar en novedades
          </label>
          <input
            id="buscador-noticias"
            type="search"
            value={consulta}
            onChange={(evento) => setConsulta(evento.target.value)}
            placeholder="Buscá por palabra clave…"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-acento-600 focus:outline-none focus:ring-1 focus:ring-acento-600"
          />
        </div>

        {noticiasFiltradas.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {noticiasFiltradas.map((noticia) => (
              <li key={noticia.id}>
                <Link
                  to={`/noticias/${noticia.id}`}
                  className="block h-full rounded-xl transition-transform hover:-translate-y-0.5"
                >
                  <CardNoticia noticia={noticia} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
            No se encontraron novedades para “{consulta}”. Probá con otras palabras.
          </p>
        )}
      </div>
    </main>
  );
}

export default NoticiasPage;
