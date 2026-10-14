import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { mapNovedadesApiANoticias } from '../api/mappers/novedad.mapper';
import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import AvisoCarga from '../components/ui/AvisoCarga';
import AvisoError from '../components/ui/AvisoError';
import CardNoticia from '../components/ui/CardNoticia';
import { useNovedades } from '../hooks/useNovedades';

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function NoticiasPage() {
  const [consulta, setConsulta] = useState('');
  const { novedades, cargando, error, recargar } = useNovedades();

  const noticias = useMemo(() => mapNovedadesApiANoticias(novedades), [novedades]);

  const noticiasFiltradas = useMemo(() => {
    // El backend ya ordena por `fecha_publicacion DESC` de forma fija (`app.py:81`), pero
    // re-ordenamos igual para no depender de eso: si el backend cambia el orden, la página
    // sigue mostrando reciente→antigua.
    const ordenadas = [...noticias].sort((a, b) => {
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
  }, [consulta, noticias]);

  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        eyebrow="Actualidad"
        seccion="naranja"
        titulo="Novedades"
        descripcion="Noticias e información oficial del instituto, ordenadas de la más reciente a la más antigua."
      />

      <div className="mx-auto max-w-contenido px-4 py-12">
        <div className="max-w-xl">
          <label htmlFor="buscador-noticias" className="block text-sm font-medium text-texto">
            Buscar en novedades
          </label>
          <input
            id="buscador-noticias"
            type="search"
            value={consulta}
            onChange={(evento) => setConsulta(evento.target.value)}
            placeholder="Buscá por palabra clave…"
            className="mt-1 w-full rounded-lg border border-borde bg-white px-3 py-2 text-sm text-texto placeholder:text-texto-suave focus:border-acento-600 focus:outline-none focus:ring-1 focus:ring-acento-600"
          />
        </div>

        {cargando ? (
          <AvisoCarga que="las novedades" />
        ) : error !== null ? (
          <AvisoError que="las novedades" mensaje={error} alReintentar={recargar} />
        ) : noticiasFiltradas.length > 0 ? (
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
          <p className="mt-8 rounded-xl border border-borde-suave bg-white p-6 text-texto-suave">
            {consulta === ''
              ? 'Todavía no hay novedades publicadas.'
              : `No se encontraron novedades para “${consulta}”. Probá con otras palabras.`}
          </p>
        )}
      </div>
    </main>
  );
}

export default NoticiasPage;
