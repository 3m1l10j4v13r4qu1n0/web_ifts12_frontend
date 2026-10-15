import { Link, useParams } from 'react-router-dom';
import { buscarCarreraPorSlug } from '../api/mappers/carrera.mapper';
import AvisoCarga from '../components/ui/AvisoCarga';
import AvisoError from '../components/ui/AvisoError';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';
import Eyebrow from '../components/ui/Eyebrow';
import { ENLACES } from '../constants/enlaces';
import { useCarreras } from '../hooks/useCarreras';
import PaginaNoEncontrada from './PaginaNoEncontrada';

const PENDIENTE = 'PENDIENTE';

/** Turno único del instituto (RF-22 / RN-07), igual que en el footer y en Carreras. */
const TURNO = 'Exclusivamente nocturno';

/** Índice "En esta carrera" del diseño Desktop 1440 (anclas a los bloques de la ficha). */
const ANCLAS_ESTA_CARRERA = [
  { id: 'presentacion', etiqueta: 'Presentación' },
  { id: 'modalidad-y-horarios', etiqueta: 'Modalidad y horarios' },
  { id: 'plan-de-estudios', etiqueta: 'Plan de estudios' },
  { id: 'materias-y-correlatividades', etiqueta: 'Materias y correlatividades' },
  { id: 'programas', etiqueta: 'Programas' },
  { id: 'resoluciones', etiqueta: 'Resoluciones' },
  { id: 'cuerpo-docente', etiqueta: 'Cuerpo docente' },
] as const;

const ACCIONES_INSCRIPCION = {
  etiqueta: 'Inscripción oficial (GCBA)',
  queda: ENLACES.inscripcion === '',
};

const estilosSeccion = 'scroll-mt-24';
const estilosTituloSeccion = 'text-2xl font-bold text-texto';
const estilosCaja = 'mt-4 rounded-xl border border-borde-suave bg-white p-5';
const estilosCajaAccion =
  'mt-4 flex flex-col gap-4 rounded-xl border border-borde-suave bg-white p-5 sm:flex-row sm:items-center sm:justify-between';

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
  const modalidad = carrera.modalidad !== '' ? carrera.modalidad : PENDIENTE;
  const duracion =
    carrera.duracionAnios !== undefined
      ? `${carrera.duracionAnios} ${carrera.duracionAnios === 1 ? 'año' : 'años'}`
      : PENDIENTE;

  return (
    <main className="min-h-screen">
      <div className="border-b border-borde-suave bg-fondo">
        <div className="mx-auto max-w-contenido px-4 py-12">
          <Breadcrumb
            items={[
              { etiqueta: 'Inicio', href: '/' },
              { etiqueta: 'Carreras', href: '/carreras' },
              { etiqueta: carrera.nombre },
            ]}
          />
          <div className="mt-4">
            <Eyebrow seccion="cian">Carreras</Eyebrow>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-texto">
              {carrera.nombre}
            </h1>
            {/*
              Anotación del diseño (comentario UX/UI, no es copy visible):
              "Plantilla común para las 6 carreras (B5). Ejemplo con un nombre de ficha
              oficial; el resto del contenido queda PENDIENTE."
            */}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-contenido grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <section
            id="presentacion"
            aria-labelledby="titulo-presentacion"
            className={estilosSeccion}
          >
            <h2 id="titulo-presentacion" className={estilosTituloSeccion}>
              Presentación
            </h2>
            {/*
              Anotación del diseño (comentario UX/UI, no es copy visible):
              "Imagen de la carrera · PENDIENTE (M1)" — la foto oficial se toma de los
              archivos del Drive en alta resolución.
            */}
            <div
              aria-hidden="true"
              className="mt-4 flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-borde-suave bg-fondo text-sm text-texto-suave"
            >
              Imagen de la carrera
            </div>
            {/*
              El texto de presentación del diseño está marcado "PENDIENTE INSTITUCIONAL
              (fuente: ficha oficial del Drive)". El backend ya expone `descripcion`
              (`models.py:32`), así que se muestra ese dato real; si viene vacío, no se
              inventa texto institucional.
            */}
            {carrera.descripcionBreve !== '' ? (
              <p className="mt-4 leading-relaxed text-texto-suave">{carrera.descripcionBreve}</p>
            ) : (
              <p className="mt-4 leading-relaxed text-texto-suave">
                El texto de presentación se publica cuando el equipo de Análisis valide la ficha
                oficial de la carrera.
              </p>
            )}
          </section>

          {/*
            "Datos oficiales" va en su propio bloque (el índice lateral no lo lista, igual que
            en el diseño). Título, duración y resolución salen del DTO real del backend; si el
            backend los trae en `null`, quedan PENDIENTE sin inventar.
          */}
          <section aria-labelledby="titulo-datos-oficiales">
            <h2 id="titulo-datos-oficiales" className={estilosTituloSeccion}>
              Datos oficiales
            </h2>
            <dl className="mt-4 divide-y divide-borde-suave rounded-xl border border-borde-suave bg-white">
              <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-4">
                <dt className="text-sm font-medium text-texto-suave">Título que otorga</dt>
                <dd className="text-sm text-texto">{carrera.tituloOtorgado ?? PENDIENTE}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-4">
                <dt className="text-sm font-medium text-texto-suave">Duración</dt>
                <dd className="text-sm text-texto">{duracion}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-4">
                <dt className="text-sm font-medium text-texto-suave">Resolución ministerial</dt>
                <dd className="text-sm text-texto">{carrera.resolucion ?? PENDIENTE}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-4">
                <dt className="text-sm font-medium text-texto-suave">Turno</dt>
                <dd className="text-sm text-texto">{TURNO}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-4">
                <dt className="text-sm font-medium text-texto-suave">Modalidad</dt>
                <dd className="text-sm text-texto">{modalidad}</dd>
              </div>
            </dl>
          </section>

          <section
            id="modalidad-y-horarios"
            aria-labelledby="titulo-modalidad-y-horarios"
            className={estilosSeccion}
          >
            <h2 id="titulo-modalidad-y-horarios" className={estilosTituloSeccion}>
              Modalidad y horarios
            </h2>
            {/*
              El turno es el institucional (RF-22 / RN-07). La modalidad es el dato real del
              backend, igual que en Carreras y en `CardCarrera`; el diseño la muestra como
              PENDIENTE, pero no se reemplaza el dato real. Los horarios no existen en el DTO
              (BE-E07), así que quedan PENDIENTE sin inventar.
            */}
            <ul className="mt-4 flex flex-wrap gap-3">
              <li className="rounded-full border border-borde-suave bg-white px-4 py-2 text-sm text-texto">
                Turno: exclusivamente nocturno
              </li>
              <li className="rounded-full border border-borde-suave bg-white px-4 py-2 text-sm text-texto">
                Modalidad: {modalidad}
              </li>
              <li className="rounded-full border border-borde-suave bg-white px-4 py-2 text-sm text-texto-suave">
                Horarios: {PENDIENTE}
              </li>
            </ul>
          </section>

          <section
            id="plan-de-estudios"
            aria-labelledby="titulo-plan-de-estudios"
            className={estilosSeccion}
          >
            <h2 id="titulo-plan-de-estudios" className={estilosTituloSeccion}>
              Plan de estudios
            </h2>
            {/*
              Anotación del diseño (comentario UX/UI, no es copy visible):
              "Plan de estudios vigente · Archivo oficial PENDIENTE · PDF" + botón
              "Descargar". El PDF todavía no existe en el backend ni en el Drive validado.
            */}
            <div className={estilosCajaAccion}>
              <div>
                <p className="font-medium text-texto">Plan de estudios vigente</p>
                <p className="mt-1 text-sm text-texto-suave">
                  El archivo oficial se publica cuando esté disponible.
                </p>
              </div>
              <Button variante="secundario" disabled>
                Descargar
              </Button>
            </div>
          </section>

          <section
            id="materias-y-correlatividades"
            aria-labelledby="titulo-materias-y-correlatividades"
            className={estilosSeccion}
          >
            <h2 id="titulo-materias-y-correlatividades" className={estilosTituloSeccion}>
              Materias y correlatividades
            </h2>
            {/*
              Anotación del diseño (comentario UX/UI, no es copy visible):
              "Tabla de datos legible y accesible (no captura de imagen). En mobile cada
              materia se apila como tarjeta." El plan vigente todavía no está validado
              (las filas del export son de ejemplo: "Materia · PENDIENTE"), así que la
              tabla queda con sus columnas y sin filas inventadas.
            */}
            <div className="mt-4 overflow-x-auto rounded-xl border border-borde-suave bg-white">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Materias y correlatividades del plan de estudios vigente
                </caption>
                <thead className="bg-fondo">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold text-texto">
                      Año
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-texto">
                      Materia
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-texto">
                      Correlativas para cursar
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-texto">
                      Correlativas para rendir
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-texto-suave">
                      La tabla de materias y correlatividades se publica cuando IFTS valide el plan
                      de la carrera.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="programas" aria-labelledby="titulo-programas" className={estilosSeccion}>
            <h2 id="titulo-programas" className={estilosTituloSeccion}>
              Programas
            </h2>
            {/*
              Anotación del diseño (comentario UX/UI, no es copy visible):
              "Programa de la materia · PENDIENTE / Archivo oficial PENDIENTE · PDF" + botón
              "Descargar", repetido por materia.
            */}
            <div className={estilosCajaAccion}>
              <div>
                <p className="font-medium text-texto">Programa de la materia</p>
                <p className="mt-1 text-sm text-texto-suave">
                  Los programas se publican junto con el plan de estudios vigente.
                </p>
              </div>
              <Button variante="secundario" disabled>
                Descargar
              </Button>
            </div>
          </section>

          <section
            id="resoluciones"
            aria-labelledby="titulo-resoluciones"
            className={estilosSeccion}
          >
            <h2 id="titulo-resoluciones" className={estilosTituloSeccion}>
              Resoluciones
            </h2>
            {/*
              Anotación del diseño (comentario UX/UI, no es copy visible):
              "Resolución de aprobación · PENDIENTE / Archivo oficial PENDIENTE · PDF" +
              botón "Descargar". El número de resolución sí existe en el DTO (`resolucion`);
              el PDF de la resolución todavía no.
            */}
            <div className={estilosCajaAccion}>
              <div>
                <p className="font-medium text-texto">Resolución de aprobación</p>
                <p className="mt-1 text-sm text-texto-suave">{carrera.resolucion ?? PENDIENTE}</p>
              </div>
              <Button variante="secundario" disabled>
                Descargar
              </Button>
            </div>
          </section>

          <section
            id="cuerpo-docente"
            aria-labelledby="titulo-cuerpo-docente"
            className={estilosSeccion}
          >
            <h2 id="titulo-cuerpo-docente" className={estilosTituloSeccion}>
              Cuerpo docente
            </h2>
            {/*
              Anotación del diseño (comentario UX/UI, no es copy visible):
              "Nómina del cuerpo docente a cargo (RF-16). Se administra desde el panel."
              "PENDIENTE INSTITUCIONAL · nómina oficial por carrera". Sin backend de
              docentes no hay nómina que mostrar.
            */}
            <div className={estilosCaja}>
              <p className="font-medium text-texto">Nómina del cuerpo docente</p>
              <p className="mt-1 text-sm text-texto-suave">
                La nómina se publica cuando esté disponible.
              </p>
            </div>
          </section>
        </div>

        <aside aria-label="Acciones y otras carreras" className="space-y-6">
          <section
            aria-labelledby="titulo-inscripcion"
            className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
          >
            <h2 id="titulo-inscripcion" className="text-lg font-semibold text-texto">
              ¿Querés inscribirte?
            </h2>
            <p className="mt-2 text-sm text-texto-suave">
              La inscripción se realiza en el sistema oficial del GCBA.
            </p>
            {/*
              Anotación del diseño (comentario UX/UI, no es copy visible):
              "PENDIENTE INSTITUCIONAL · URL oficial de inscripción".
            */}
            {ACCIONES_INSCRIPCION.queda ? (
              <p className="mt-4 text-sm text-texto-suave">
                El enlace oficial se publica cuando esté disponible.
              </p>
            ) : (
              <a
                href={ENLACES.inscripcion}
                className="mt-4 inline-block min-h-11 rounded-md bg-acento-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-acento-700"
                rel="noopener noreferrer"
              >
                {ACCIONES_INSCRIPCION.etiqueta}
              </a>
            )}
          </section>

          <section aria-labelledby="titulo-consultar">
            <h2 id="titulo-consultar" className="text-lg font-semibold text-texto">
              Consultar por esta carrera
            </h2>
            <Link
              to="/contacto"
              className="mt-4 block rounded-xl border border-borde-suave bg-white p-6 text-sm font-medium text-acento-700 transition-colors hover:border-acento-600"
            >
              Ir al formulario de consulta →
            </Link>
          </section>

          <nav
            aria-labelledby="titulo-esta-carrera"
            className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
          >
            <h2 id="titulo-esta-carrera" className="text-lg font-semibold text-texto">
              En esta carrera
            </h2>
            <ul className="mt-4 space-y-2">
              {ANCLAS_ESTA_CARRERA.map((ancla) => (
                <li key={ancla.id}>
                  <a
                    href={`#${ancla.id}`}
                    className="inline-block min-h-11 py-2 text-sm text-texto-suave transition-colors hover:text-acento-700"
                  >
                    {ancla.etiqueta}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

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
