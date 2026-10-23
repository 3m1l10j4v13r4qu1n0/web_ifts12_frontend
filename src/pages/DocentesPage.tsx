import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import AvisoCarga from '../components/ui/AvisoCarga';
import AvisoError from '../components/ui/AvisoError';
import Button from '../components/ui/Button';
import { ENLACES } from '../constants/enlaces';
import { useCarreras } from '../hooks/useCarreras';

/**
 * Repositorio de normativas y documentación del export `06 · Docentes`. Los tres archivos del
 * diseño ("Archivo oficial PENDIENTE · PDF") todavía no existen: se muestran como mensaje de
 * proceso con la descarga deshabilitada (patrón de T4).
 */
const DOCUMENTOS_DOCENTES = [
  { titulo: 'Normativa docente' },
  { titulo: 'Instructivo para docentes' },
  { titulo: 'Documentación académica' },
];

/**
 * Accesos de interés del export. Moodle y SIU son servicios externos (RF-12/RF-17) cuyas URL
 * oficiales están pendientes (`ENLACES`); el calendario reutiliza la sección de Estudiantes.
 */
const ACCESOS_DOCENTES = [
  {
    id: 'moodle',
    titulo: 'Campus Virtual Moodle',
    descripcion: 'Aulas virtuales. Servicio externo.',
    cta: 'Ingresar a Moodle',
  },
  {
    id: 'calendario',
    titulo: 'Calendario académico',
    descripcion: 'Fechas del ciclo lectivo.',
    cta: 'Ver el calendario',
  },
  {
    id: 'siu',
    titulo: 'SIU · Autogestión',
    descripcion: 'Gestión académica. Servicio externo.',
    cta: 'Ingresar a SIU',
  },
];

function DocentesPage() {
  const { carreras, cargando, error, recargar } = useCarreras();

  const urlPorAcceso: Record<string, string> = {
    moodle: ENLACES.moodle,
    calendario: '/estudiantes',
    siu: ENLACES.siu,
  };

  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        breadcrumb={[{ etiqueta: 'Inicio', href: '/' }, { etiqueta: 'Docentes' }]}
        eyebrow="Docentes"
        seccion="verde"
        titulo="Docentes"
        descripcion="Información y accesos de interés para el plantel docente. Las autoridades se publican en Institucional."
      />

      <div className="mx-auto max-w-contenido space-y-14 px-4 py-12">
        {/*
          Anotación del diseño (comentario UX/UI, no es copy visible): la bajada original agrega
          las refs "(RF-15 · RF-16 · RF-17)" y "(I7)".
        */}

        <section aria-labelledby="titulo-comunicados">
          <h2 id="titulo-comunicados" className="text-2xl font-bold text-texto">
            Información general y comunicados
          </h2>
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible): "Los comunicados se
            cargan desde el panel admin con la categoría 'Docentes'." No hay endpoint de
            comunicados, así que la sección queda con un mensaje de proceso (decisión de T11).
          */}
          <p className="mt-6 rounded-xl border border-borde-suave bg-white p-6 text-texto-suave">
            Los comunicados institucionales se publican cuando el instituto los cargue.
          </p>
        </section>

        <section aria-labelledby="titulo-concursos">
          <h2 id="titulo-concursos" className="text-2xl font-bold text-texto">
            Concursos docentes
          </h2>
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible): "Convocatorias vigentes
            y cerradas (RF-15). Administrable." y "Estados de la convocatoria son ejemplo de
            estructura; sin concursos abiertos se muestra el estado vacío".
          */}
          <p className="mt-2 text-texto-suave">Convocatorias vigentes y cerradas.</p>
          <p className="mt-6 rounded-xl border border-dashed border-borde bg-white p-6 text-texto-suave">
            No hay convocatorias abiertas.
          </p>
        </section>

        <section aria-labelledby="titulo-cuerpo-docente">
          <h2 id="titulo-cuerpo-docente" className="text-2xl font-bold text-texto">
            Cuerpo docente por carrera
          </h2>
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible): "Organizado por carrera
            (RF-16). Nómina oficial PENDIENTE." La nómina no existe todavía; se listan las carreras
            reales del backend con su nómina como mensaje de proceso (no se inventan nombres ni
            docentes).
          */}
          <p className="mt-2 text-texto-suave">Organizado por carrera.</p>

          {cargando ? (
            <AvisoCarga que="el cuerpo docente" variante="docentes" />
          ) : error !== null ? (
            <AvisoError que="el cuerpo docente" mensaje={error} alReintentar={recargar} />
          ) : carreras.length > 0 ? (
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {carreras.map((carrera) => (
                <li
                  key={carrera.id}
                  className="rounded-xl border border-borde-suave bg-white p-5 shadow-suave"
                >
                  <h3 className="text-base font-semibold text-texto">{carrera.nombre}</h3>
                  <p className="mt-2 text-sm text-texto-suave">
                    La nómina del cuerpo docente se publica cuando el instituto la confirme.
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 rounded-xl border border-borde-suave bg-white p-6 text-texto-suave">
              No hay carreras publicadas por el momento.
            </p>
          )}
        </section>

        <section aria-labelledby="titulo-repositorio">
          <h2 id="titulo-repositorio" className="text-2xl font-bold text-texto">
            Repositorio de normativas y documentación
          </h2>
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible): "Archivo oficial
            PENDIENTE · PDF" + botón "Descargar". Los archivos todavía no existen.
          */}
          <ul className="mt-6 space-y-3">
            {DOCUMENTOS_DOCENTES.map((documento) => (
              <li
                key={documento.titulo}
                className="flex flex-col gap-3 rounded-xl border border-borde-suave bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-texto">{documento.titulo}</p>
                  <p className="mt-1 text-sm text-texto-suave">
                    El archivo oficial se publica cuando esté disponible.
                  </p>
                </div>
                <Button variante="secundario" disabled>
                  Descargar
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="titulo-accesos">
          <h2 id="titulo-accesos" className="text-2xl font-bold text-texto">
            Accesos de interés
          </h2>
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible): "Externo · URL
            PENDIENTE" / "Externo · a confirmar".
          */}
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ACCESOS_DOCENTES.map((acceso) => {
              const url = urlPorAcceso[acceso.id];
              const disponible = url !== '';

              return (
                <li
                  key={acceso.id}
                  className="flex flex-col rounded-xl border border-borde-suave bg-white p-5 shadow-suave"
                >
                  <h3 className="text-base font-semibold text-texto">{acceso.titulo}</h3>
                  <p className="mt-1 flex-1 text-sm text-texto-suave">{acceso.descripcion}</p>
                  <div className="mt-4">
                    {disponible ? (
                      <Button variante="secundario" tamano="sm" href={url}>
                        {acceso.cta}
                      </Button>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="inline-flex min-h-11 items-center rounded-md border border-borde bg-fondo px-3 text-sm font-medium text-texto-suave"
                      >
                        Enlace oficial próximamente
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default DocentesPage;
