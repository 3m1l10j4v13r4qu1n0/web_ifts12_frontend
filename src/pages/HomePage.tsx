import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mapNovedadesApiANoticias } from '../api/mappers/novedad.mapper';
import AccesosDestacados from '../components/ui/AccesosDestacados';
import AccesosRapidos from '../components/ui/AccesosRapidos';
import AvisoCarga from '../components/ui/AvisoCarga';
import AvisoError from '../components/ui/AvisoError';
import CardCarrera from '../components/ui/CardCarrera';
import CardNoticia from '../components/ui/CardNoticia';
import type { SlideCarrusel } from '../components/ui/CarruselInstitucional';
import CarruselInstitucional from '../components/ui/CarruselInstitucional';
import FaqAcordeon from '../components/ui/FaqAcordeon';
import { ENLACES } from '../constants/enlaces';
import { mockAccesosDestacados, mockAccesosRapidos, mockFaqs } from '../constants/mock-data';
import { useCarreras } from '../hooks/useCarreras';
import { useNovedades } from '../hooks/useNovedades';

// FAQ destacadas de la Home: el diseño muestra 4 destacadas + "Ver todas".
const FAQ_DESTACADAS = mockFaqs.slice(0, 4);

function HomePage() {
  // Carreras y novedades vienen del backend; el resto de la Home sigue en mocks. Las dos
  // consultas comparten cache con `/carreras` y `/noticias`, así que navegar a esas rutas
  // no vuelve a pedir los datos.
  const {
    carreras,
    cargando: cargandoCarreras,
    error: errorCarreras,
    recargar: recargarCarreras,
  } = useCarreras();
  const {
    novedades,
    cargando: cargandoNovedades,
    error: errorNovedades,
    recargar: recargarNovedades,
  } = useNovedades();

  const noticias = useMemo(() => mapNovedadesApiANoticias(novedades), [novedades]);

  // El backend ya ordena por `fecha_publicacion DESC` de forma fija (`app.py:81`), pero
  // re-ordenamos igual para no depender de eso.
  const noticiasOrdenadas = useMemo(() => {
    return [...noticias].sort((a, b) => {
      if (a.fecha === '' && b.fecha === '') return 0;
      if (a.fecha === '') return 1;
      if (b.fecha === '') return -1;
      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });
  }, [noticias]);

  const slidesNovedades: SlideCarrusel[] = useMemo(() => {
    return noticiasOrdenadas.map((noticia) => ({
      id: noticia.id,
      titulo: noticia.titulo,
      resumen: noticia.resumen,
      fecha: noticia.fecha,
      enlace: `/noticias/${noticia.id}`,
    }));
  }, [noticiasOrdenadas]);

  return (
    <main>
      <CarruselInstitucional
        titulo="Instituto de Formación Técnica Superior N.º 12"
        subtitulo="Formación técnica superior, pública y de calidad. Contenidos provisorios pendientes de validación."
        slides={slidesNovedades}
        cargando={cargandoNovedades}
      />

      {ENLACES.moodle !== '' && (
        <section
          aria-label="Acceso al campus virtual"
          className="border-b border-borde-suave bg-acento-100"
        >
          <div className="mx-auto flex max-w-contenido flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
            <p className="text-center text-texto sm:text-left">
              Accedé al campus virtual para iniciar o continuar tu cursada.
            </p>
            <a
              href={ENLACES.moodle}
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-acento-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-acento-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento-700"
            >
              Ingresar al campus virtual
            </a>
          </div>
        </section>
      )}

      <section aria-labelledby="titulo-destacados" className="mx-auto max-w-contenido px-4 pt-16">
        <h2 id="titulo-destacados" className="text-2xl font-bold text-texto">
          Accesos destacados
        </h2>
        <div className="mt-6">
          <AccesosDestacados items={mockAccesosDestacados} />
        </div>
      </section>

      <section aria-labelledby="titulo-novedades" className="mx-auto max-w-contenido px-4 py-16">
        <h2 id="titulo-novedades" className="text-2xl font-bold text-texto">
          Novedades del último mes
        </h2>
        <p className="mt-2 text-texto-suave">De la más reciente a la más antigua (RF-25).</p>
        {cargandoNovedades ? (
          <AvisoCarga que="las novedades" />
        ) : errorNovedades !== null ? (
          <AvisoError
            que="las novedades"
            mensaje={errorNovedades}
            alReintentar={recargarNovedades}
          />
        ) : noticiasOrdenadas.length > 0 ? (
          <>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {noticiasOrdenadas.map((noticia) => (
                <li key={noticia.id}>
                  <CardNoticia noticia={noticia} />
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                to="/noticias"
                className="inline-flex items-center justify-center rounded-lg border border-borde bg-white px-5 py-2.5 text-sm font-medium text-texto transition-colors hover:border-acento-600 hover:text-acento-700"
              >
                Ver todas las novedades
              </Link>
            </div>
          </>
        ) : (
          <p className="mt-6 text-texto-suave">Aún no hay novedades publicadas.</p>
        )}
      </section>

      <section aria-labelledby="titulo-carreras" className="border-y border-borde-suave bg-fondo">
        <div className="mx-auto max-w-contenido px-4 py-16">
          {!cargandoCarreras && errorCarreras === null && carreras.length > 0 && (
            <p className="text-xs font-medium uppercase tracking-wide text-acento-700">
              Oferta académica · {carreras.length} carreras
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <h2 id="titulo-carreras" className="text-2xl font-bold text-texto">
              Carreras
            </h2>
            <Link
              to="/carreras"
              className="inline-flex items-center justify-center rounded-lg border border-borde bg-white px-5 py-2.5 text-sm font-medium text-texto transition-colors hover:border-acento-600 hover:text-acento-700"
            >
              Ver todas las carreras
            </Link>
          </div>
          <p className="mt-2 text-texto-suave">
            Todas en turno exclusivamente nocturno. Modalidad y horarios por carrera: PENDIENTE.
          </p>
          {cargandoCarreras ? (
            <AvisoCarga que="las carreras" />
          ) : errorCarreras !== null ? (
            <AvisoError
              que="las carreras"
              mensaje={errorCarreras}
              alReintentar={recargarCarreras}
            />
          ) : carreras.length > 0 ? (
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {carreras.map((carrera) => (
                <li key={carrera.id}>
                  <CardCarrera carrera={carrera} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-texto-suave">Aún no hay carreras publicadas.</p>
          )}
        </div>
      </section>

      <section aria-labelledby="titulo-accesos" className="mx-auto max-w-contenido px-4 py-16">
        <h2 id="titulo-accesos" className="text-2xl font-bold text-texto">
          Accesos rápidos
        </h2>
        <div className="mt-6">
          <AccesosRapidos items={mockAccesosRapidos} />
        </div>
      </section>

      <section aria-labelledby="titulo-faq" className="mx-auto max-w-3xl px-4 pb-16">
        <h2 id="titulo-faq" className="text-2xl font-bold text-texto">
          Preguntas frecuentes
        </h2>
        <p className="mt-2 text-texto-suave">Respuestas sobre ingreso, cursada y trámites.</p>
        <div className="mt-6">
          <FaqAcordeon items={FAQ_DESTACADAS} />
        </div>
        <div className="mt-8">
          <Link
            to="/faq"
            className="inline-flex items-center justify-center rounded-lg border border-borde bg-white px-5 py-2.5 text-sm font-medium text-texto transition-colors hover:border-acento-600 hover:text-acento-700"
          >
            Ver todas las preguntas
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
