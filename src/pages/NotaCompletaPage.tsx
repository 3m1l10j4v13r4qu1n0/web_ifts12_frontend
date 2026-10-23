import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  buscarNovedadPorSlug,
  fechaNovedadAIso,
  slugDesdeNovedad,
} from '../api/mappers/novedad.mapper';
import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import AvisoCarga from '../components/ui/AvisoCarga';
import AvisoError from '../components/ui/AvisoError';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Toast, { type TipoToast } from '../components/ui/Toast';
import { useNovedades } from '../hooks/useNovedades';
import { formatearFechaCorta } from '../utils/fecha';
import PaginaNoEncontrada from './PaginaNoEncontrada';

/** Publicaciones anteriores que lista el historial del diseño (08.1). */
const HISTORIAL_MAX = 3;

interface Aviso {
  tipo: TipoToast;
  texto: string;
}

function NotaCompletaPage() {
  const { id } = useParams<{ id: string }>();
  const { novedades, cargando, error, recargar } = useNovedades();
  const [aviso, setAviso] = useState<Aviso | null>(null);

  // El backend no expone `GET /api/noticias/:id`, así que el detalle se resuelve contra la
  // lista completa. Es la misma consulta que el listado, que TanStack Query cachea.
  const noticia = id === undefined ? undefined : buscarNovedadPorSlug(novedades, id);

  if (cargando) {
    return (
      <main className="min-h-screen">
        <div className="border-b border-borde-suave bg-fondo">
          <div className="mx-auto max-w-contenido px-4 py-12">
            <h1 className="text-4xl font-semibold text-texto">Novedad</h1>
          </div>
        </div>
        <div className="mx-auto max-w-contenido px-4 py-14">
          <AvisoCarga que="la novedad" variante="nota" />
        </div>
      </main>
    );
  }

  if (error !== null) {
    return (
      <main className="min-h-screen">
        <div className="border-b border-borde-suave bg-fondo">
          <div className="mx-auto max-w-contenido px-4 py-12">
            <h1 className="text-4xl font-semibold text-texto">Novedad</h1>
          </div>
        </div>
        <div className="mx-auto max-w-contenido px-4 py-14">
          <AvisoError que="la novedad" mensaje={error} alReintentar={recargar} />
        </div>
      </main>
    );
  }

  if (noticia === undefined) {
    return <PaginaNoEncontrada />;
  }

  // Arrow functions a propósito: el narrowing de `noticia` (const) no se propaga dentro de
  // function declarations, y TS marcaría `noticia.titulo` como posible undefined.
  const copiarEnlace = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setAviso({ tipo: 'success', texto: 'Enlace copiado al portapapeles.' });
    } catch {
      setAviso({
        tipo: 'error',
        texto: 'No pudimos copiar el enlace. Copialo desde la barra de direcciones.',
      });
    }
  };

  const compartir = async () => {
    if (typeof navigator.share !== 'function') {
      await copiarEnlace();
      return;
    }
    try {
      await navigator.share({ title: noticia.titulo, url: window.location.href });
    } catch {
      // El share nativo se puede cancelar (AbortError): eso no es un error a mostrar.
    }
  };

  const fechaIso = fechaNovedadAIso(noticia.fecha_publicacion);
  const fecha = fechaIso === null ? null : formatearFechaCorta(fechaIso);

  // "Historial de publicaciones" del diseño: la nota actual y, debajo, las publicadas el
  // mismo día o antes, ordenadas de más reciente a más antigua. Se compara por día (no por
  // hora): a nivel editorial, dos gacetillas del mismo día forman parte del mismo historial.
  // Sin fecha comparable también se lista, para no perder novedades si el backend manda null.
  const anteriores = novedades
    .filter((item) => item.id !== noticia.id)
    .filter((item) => {
      const otra = fechaNovedadAIso(item.fecha_publicacion);
      if (fechaIso === null || otra === null) return true;
      return otra <= fechaIso;
    })
    .sort((a, b) => {
      const fa = fechaNovedadAIso(a.fecha_publicacion) ?? '';
      const fb = fechaNovedadAIso(b.fecha_publicacion) ?? '';
      return fb.localeCompare(fa);
    })
    .slice(0, HISTORIAL_MAX);

  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        breadcrumb={[
          { etiqueta: 'Inicio', href: '/' },
          { etiqueta: 'Novedades', href: '/noticias' },
          { etiqueta: noticia.titulo },
        ]}
        eyebrow="Novedades"
        seccion="naranja"
        titulo={noticia.titulo}
      />

      <div className="mx-auto grid max-w-contenido grid-cols-1 items-start gap-10 px-4 py-12 lg:grid-cols-3">
        <article className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            {fecha !== null && <Badge tono="neutro">{fecha}</Badge>}
            {noticia.categoria !== null && <Badge tono="acento">{noticia.categoria}</Badge>}
          </div>

          {noticia.copete !== null && (
            <p className="mt-4 max-w-[75ch] text-lg leading-relaxed text-texto">{noticia.copete}</p>
          )}

          {/* Anotación del diseño: "Imagen principal de la nota · alt obligatorio". */}
          {noticia.imagen_url !== null && (
            <img
              src={noticia.imagen_url}
              alt={noticia.titulo}
              className="mt-6 w-full rounded-xl object-cover"
            />
          )}

          <p className="mt-6 max-w-[75ch] whitespace-pre-line leading-relaxed text-texto">
            {noticia.contenido}
          </p>

          <section
            aria-labelledby="titulo-adjunto"
            className="mt-10 rounded-xl border border-borde-suave bg-white p-5"
          >
            <h2 id="titulo-adjunto" className="text-lg font-semibold text-texto">
              Adjunto de la nota
            </h2>
            {/*
              Anotación del diseño: "Archivo oficial PENDIENTE · PDF" + botón "Descargar".
              El DTO de novedad no tiene campo de adjuntos (models.py:50-60), así que no hay
              nada que listar ni descargar todavía.
            */}
            <p className="mt-2 text-sm text-texto-suave">
              Cuando el panel admin publique adjuntos de esta nota, se listarán acá con su botón de
              descarga.
            </p>
          </section>

          <div className="mt-10">
            <Button variante="secundario" href="/noticias">
              Volver a Novedades
            </Button>
          </div>
        </article>

        <aside className="space-y-6">
          <section
            aria-labelledby="titulo-historial"
            className="rounded-xl border border-borde-suave bg-white p-5"
          >
            <h2 id="titulo-historial" className="text-lg font-semibold text-texto">
              Historial de publicaciones
            </h2>
            <ul className="mt-4 space-y-4">
              <li>
                <p className="text-sm font-medium leading-snug text-texto">{noticia.titulo}</p>
                <Badge tono="acento" className="mt-1">
                  Nota actual
                </Badge>
              </li>
              {anteriores.map((anterior) => (
                <li key={anterior.id}>
                  <Link
                    to={`/noticias/${slugDesdeNovedad(anterior)}`}
                    className="text-sm font-medium leading-snug text-acento-700 hover:underline"
                  >
                    {anterior.titulo}
                  </Link>
                  <p className="mt-1 text-xs text-texto-suave">Publicación anterior</p>
                </li>
              ))}
            </ul>
            {anteriores.length === 0 && (
              <p className="mt-4 text-sm text-texto-suave">No hay publicaciones anteriores.</p>
            )}
            <Link
              to="/noticias"
              className="mt-4 inline-block text-sm font-medium text-acento-700 hover:underline"
            >
              Ver todas las novedades
            </Link>
          </section>

          <section
            aria-labelledby="titulo-compartir"
            className="rounded-xl border border-borde-suave bg-white p-5"
          >
            <h2 id="titulo-compartir" className="text-lg font-semibold text-texto">
              Compartir
            </h2>
            <div className="mt-4 flex flex-col gap-2">
              <Button variante="secundario" onClick={compartir}>
                Compartir
              </Button>
              <Button variante="secundario" onClick={copiarEnlace}>
                Copiar enlace
              </Button>
            </div>
            {aviso !== null && (
              <Toast tipo={aviso.tipo} className="mt-4" onCerrar={() => setAviso(null)}>
                {aviso.texto}
              </Toast>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
}

export default NotaCompletaPage;
