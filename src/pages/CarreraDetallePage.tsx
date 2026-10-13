import { Link, useParams } from 'react-router-dom';
import { buscarCarreraPorSlug } from '../api/mappers/carrera.mapper';
import AvisoCarga from '../components/ui/AvisoCarga';
import AvisoError from '../components/ui/AvisoError';
import Estado from '../components/ui/Estado';
import { ENLACES } from '../constants/enlaces';
import { useCarreras } from '../hooks/useCarreras';
import PaginaNoEncontrada from './PaginaNoEncontrada';

const ACCIONES_INSCRIPCION = {
  etiqueta: 'Inscripción oficial (GCBA)',
  queda: ENLACES.inscripcion === '',
};

function CarreraDetallePage() {
  const { id } = useParams<{ id: string }>();
  const { carreras, cargando, error, recargar } = useCarreras();

  // El backend no expone `GET /api/carreras/:id` (solo figura en el archivo muerto
  // `routes.py:61`), así que el detalle se resuelve contra la lista completa. Es la misma
  // consulta que el listado, que TanStack Query cachea: entrar al detalle no dispara un
  // segundo request.
  const carrera = id === undefined ? undefined : buscarCarreraPorSlug(carreras, id);

  if (cargando) {
    return (
      <main className="min-h-screen">
        <div className="border-b border-borde-suave bg-fondo">
          <div className="mx-auto max-w-contenido px-4 py-12">
            <h1 className="text-4xl font-semibold text-texto">Carrera</h1>
          </div>
        </div>
        <div className="mx-auto max-w-contenido px-4 py-14">
          <AvisoCarga que="la carrera" />
        </div>
      </main>
    );
  }

  if (error !== null) {
    return (
      <main className="min-h-screen">
        <div className="border-b border-borde-suave bg-fondo">
          <div className="mx-auto max-w-contenido px-4 py-12">
            <h1 className="text-4xl font-semibold text-texto">Carrera</h1>
          </div>
        </div>
        <div className="mx-auto max-w-contenido px-4 py-14">
          <AvisoError que="la carrera" mensaje={error} alReintentar={recargar} />
        </div>
      </main>
    );
  }

  if (carrera === undefined) {
    return <PaginaNoEncontrada />;
  }

  const otrasCarreras = carreras.filter((item) => item.id !== carrera.id);

  return (
    <main className="min-h-screen">
      <div className="border-b border-borde-suave bg-fondo">
        <div className="mx-auto max-w-contenido px-4 py-12">
          <nav aria-label="Ruta de navegación" className="text-sm text-texto-suave">
            <Link to="/" className="hover:text-acento-700">
              Inicio
            </Link>
            {' / '}
            <Link to="/carreras" className="hover:text-acento-700">
              Carreras
            </Link>
            {' / '}
            <span className="text-texto">{carrera.nombre}</span>
          </nav>

          <h1 className="mt-4 text-4xl font-semibold text-texto">{carrera.nombre}</h1>
          {/*
            Solo se muestra la modalidad que trae el backend, sin sumar etiquetas fijas como
            "exclusivamente nocturno": las filas reales de la base incluyen "A Distancia /
            Híbrida" (`instance/ifts12.db`), así que una etiqueta fija contradiría el dato
            real. El turno queda pendiente hasta que IFTS valide el dato institucional.
          */}
          {carrera.modalidad !== '' && (
            <span className="mt-4 inline-block rounded-full border border-acento-600 px-3 py-1 text-xs font-medium text-acento-700">
              Modalidad: {carrera.modalidad}
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-contenido grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section aria-labelledby="titulo-descripcion">
            <h2 id="titulo-descripcion" className="text-xl font-semibold text-texto">
              Descripción
            </h2>
            <p className="mt-3 leading-relaxed text-texto-suave">{carrera.descripcionBreve}</p>
          </section>

          <section aria-labelledby="titulo-plan" className="space-y-4">
            <h2 id="titulo-plan" className="text-xl font-semibold text-texto">
              Plan de estudios
            </h2>
            <Estado
              tipo="empty"
              titulo="Plan de estudios y correlatividades pendientes"
              mensaje="La tabla de materias, años y correlatividades se publica cuando IFTS valide el plan de la carrera."
            />
          </section>
        </div>

        <aside aria-label="Acciones y otras carreras" className="space-y-6">
          <section
            aria-labelledby="titulo-acciones"
            className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
          >
            <h2 id="titulo-acciones" className="text-lg font-semibold text-texto">
              Acciones
            </h2>
            <div className="mt-4 space-y-3">
              <div
                aria-disabled={ACCIONES_INSCRIPCION.queda}
                className="rounded-lg border border-borde-suave p-4"
              >
                <p className="text-sm font-medium text-texto">{ACCIONES_INSCRIPCION.etiqueta}</p>
                {ACCIONES_INSCRIPCION.queda ? (
                  <p className="mt-1 text-xs text-texto-suave">
                    El enlace oficial se publica cuando esté disponible.
                  </p>
                ) : (
                  <a
                    href={ENLACES.inscripcion}
                    className="mt-2 inline-block text-sm font-medium text-acento-700 hover:text-acento-800"
                    rel="noopener noreferrer"
                  >
                    Ingresar al sitio de inscripción →
                  </a>
                )}
              </div>
              <Link
                to="/contacto"
                className="block rounded-lg border border-borde-suave p-4 text-sm font-medium text-acento-700 transition-colors hover:border-acento-600"
              >
                Consultar por esta carrera →
              </Link>
            </div>
          </section>

          {otrasCarreras.length > 0 && (
            <section
              aria-labelledby="titulo-otras"
              className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
            >
              <h2 id="titulo-otras" className="text-lg font-semibold text-texto">
                Otras carreras
              </h2>
              <ul className="mt-4 space-y-2">
                {otrasCarreras.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/carreras/${item.id}`}
                      className="text-sm text-texto-suave transition-colors hover:text-acento-700"
                    >
                      {item.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </main>
  );
}

export default CarreraDetallePage;
