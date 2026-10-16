import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import Button, { type VarianteBoton } from '../components/ui/Button';
import FaqAcordeon from '../components/ui/FaqAcordeon';
import { ENLACES } from '../constants/enlaces';
import { mockFaqs } from '../constants/mock-data';

const faqEstudiantes = mockFaqs.filter((item) => item.categoria === 'estudiantes');

interface Tramite {
  id: string;
  titulo: string;
  descripcion: string;
  cta: string;
  /** Ruta interna (`/…`) o ancla (`#…`) del CTA; `undefined` deja el botón deshabilitado. */
  href?: string;
  variante?: VarianteBoton;
}

/**
 * Trámites e información del export `04 · Estudiantes`. Las descripciones son las del diseño
 * sin las refs de requisitos (RF-07…RF-31), que quedan como anotación de código. Los destinos de
 * cada trámite todavía no existen como página: el CTA se muestra deshabilitado salvo el de mesas,
 * que baja a la tabla de la propia página, y el de Moodle, que es un servicio externo.
 */
const TRAMITES: Tramite[] = [
  {
    id: 'regularidad',
    titulo: 'Regularidad',
    descripcion: 'Condiciones para mantener la regularidad.',
    cta: 'Ver condiciones',
  },
  {
    id: 'constancias',
    titulo: 'Constancias',
    descripcion: 'Cómo se solicitan.',
    cta: 'Ver procedimiento',
  },
  {
    id: 'mesas-examen',
    titulo: 'Mesas de examen',
    descripcion: 'Fechas y modalidad.',
    cta: 'Ver mesas',
    href: '#mesas-de-examen-final',
  },
  {
    id: 'becas',
    titulo: 'Becas',
    descripcion: 'Tipos, requisitos y procedimiento.',
    cta: 'Ver becas',
  },
  {
    id: 'boleto-estudiantil',
    titulo: 'Boleto estudiantil',
    descripcion: 'Información del boleto.',
    cta: 'Cómo tramitar',
  },
  {
    id: 'titulos',
    titulo: 'Trámite de títulos',
    descripcion: 'Procedimiento de solicitud. Informativo en v1.',
    cta: 'Ver procedimiento',
  },
  {
    id: 'traspasos',
    titulo: 'Traspasos entre IFTS',
    descripcion: 'Procedimiento de traspaso. Informativo en v1.',
    cta: 'Ver requisitos',
  },
  {
    id: 'campus-virtual',
    titulo: 'Campus Virtual Moodle',
    descripcion: 'Aulas virtuales. Servicio externo.',
    cta: 'Ingresar a Moodle',
    variante: 'secundario',
  },
];

/**
 * Estructura del ciclo lectivo del export `04 · Estudiantes`. Las fechas quedan PENDIENTE hasta
 * que el instituto publique el calendario oficial: no se inventan fechas (I8 · RF-11).
 */
const CALENDARIO: { periodo: string; actividad: string; desde: string; hasta: string }[] = [
  { periodo: '1.er cuatrimestre', actividad: 'Cursada', desde: 'PENDIENTE', hasta: 'PENDIENTE' },
  { periodo: 'Receso', actividad: '—', desde: 'PENDIENTE', hasta: 'PENDIENTE' },
  { periodo: '2.º cuatrimestre', actividad: 'Cursada', desde: 'PENDIENTE', hasta: 'PENDIENTE' },
];

/**
 * Mesas de examen final del export: cronograma por turno (RF-09). La estructura de ejemplo del
 * diseño se repite con todos los datos PENDIENTE.
 */
const MESAS_EXAMEN: {
  id: string;
  turno: string;
  carrera: string;
  fecha: string;
  modalidad: string;
}[] = [
  {
    id: 'mesa-1',
    turno: 'Turno de examen',
    carrera: 'Todas',
    fecha: 'PENDIENTE',
    modalidad: 'PENDIENTE',
  },
  {
    id: 'mesa-2',
    turno: 'Turno de examen',
    carrera: 'Todas',
    fecha: 'PENDIENTE',
    modalidad: 'PENDIENTE',
  },
];

function EstudiantesPage() {
  const campusDisponible = ENLACES.moodle !== '';

  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        breadcrumb={[{ etiqueta: 'Inicio', href: '/' }, { etiqueta: 'Estudiantes' }]}
        eyebrow="Estudiantes"
        seccion="cian"
        titulo="Estudiantes"
        descripcion="Información y trámites para estudiantes actuales: regularidad, constancias, mesas, calendario, becas, boleto y títulos/traspasos."
      />

      <div className="mx-auto max-w-contenido space-y-14 px-4 py-12">
        {/*
          Anotación del diseño (comentario UX/UI, no es copy visible): la bajada original agrega
          "Reemplaza la propuesta 'Comunidad de alumnos' (B3)" y la nota "Información del propio
          sitio vs. trámites externos: los enlaces con ↗ abren servicios externos (Moodle, SIU,
          GCBA). No hay cuentas ni perfiles de estudiantes en este sitio."
        */}

        <section aria-labelledby="titulo-tramites">
          <h2 id="titulo-tramites" className="text-2xl font-bold text-texto">
            Trámites e información
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRAMITES.map((tramite) => {
              const esMoodle = tramite.id === 'campus-virtual';

              return (
                <li
                  key={tramite.id}
                  className="flex flex-col rounded-xl border border-borde-suave bg-white p-5 shadow-suave"
                >
                  <h3 className="text-base font-semibold text-texto">{tramite.titulo}</h3>
                  <p className="mt-1 flex-1 text-sm text-texto-suave">{tramite.descripcion}</p>
                  <div className="mt-4">
                    {esMoodle ? (
                      campusDisponible ? (
                        <Button variante="secundario" tamano="sm" href={ENLACES.moodle}>
                          {tramite.cta}
                        </Button>
                      ) : (
                        <span
                          aria-disabled="true"
                          className="inline-flex min-h-11 items-center rounded-md border border-borde bg-fondo px-3 text-sm font-medium text-texto-suave"
                        >
                          Enlace oficial próximamente
                        </span>
                      )
                    ) : (
                      <Button
                        variante={tramite.variante ?? 'fantasma'}
                        tamano="sm"
                        href={tramite.href}
                        disabled={tramite.href === undefined}
                      >
                        {tramite.cta}
                      </Button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="titulo-calendario">
          <h2 id="titulo-calendario" className="text-2xl font-bold text-texto">
            Calendario académico
          </h2>
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible):
            "Estructura del ciclo lectivo (RF-11). Sin fechas inventadas (I8)."
          */}
          <p className="mt-2 text-texto-suave">Estructura del ciclo lectivo.</p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-borde-suave bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Estructura del ciclo lectivo</caption>
              <thead className="bg-fondo">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Período
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Actividad
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Desde
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Hasta
                  </th>
                </tr>
              </thead>
              <tbody>
                {CALENDARIO.map((fila) => (
                  <tr key={fila.periodo} className="border-t border-borde-suave">
                    <th scope="row" className="px-4 py-3 align-top font-medium text-texto">
                      {fila.periodo}
                    </th>
                    <td className="px-4 py-3 align-top text-texto-suave">{fila.actividad}</td>
                    <td className="px-4 py-3 align-top text-texto-suave">{fila.desde}</td>
                    <td className="px-4 py-3 align-top text-texto-suave">{fila.hasta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible):
            "Calendario académico completo · Archivo oficial PENDIENTE · PDF" + botón "Descargar".
            El PDF todavía no existe en el backend ni en el Drive validado.
          */}
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-borde-suave bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-texto">Calendario académico completo</p>
              <p className="mt-1 text-sm text-texto-suave">
                El archivo oficial se publica cuando esté disponible.
              </p>
            </div>
            <Button variante="secundario" disabled>
              Descargar
            </Button>
          </div>
        </section>

        <section id="mesas-de-examen-final" aria-labelledby="titulo-mesas">
          <h2 id="titulo-mesas" className="text-2xl font-bold text-texto">
            Mesas de examen final
          </h2>
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible):
            "Cronograma por turno (RF-09)." La estructura de ejemplo se publica con datos
            PENDIENTE hasta que el instituto confirme el cronograma.
          */}
          <p className="mt-2 text-texto-suave">Cronograma por turno.</p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-borde-suave bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Cronograma de mesas de examen final</caption>
              <thead className="bg-fondo">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Turno
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Carrera
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Fecha
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Modalidad
                  </th>
                </tr>
              </thead>
              <tbody>
                {MESAS_EXAMEN.map((fila) => (
                  <tr key={fila.id} className="border-t border-borde-suave">
                    <th scope="row" className="px-4 py-3 align-top font-medium text-texto">
                      {fila.turno}
                    </th>
                    <td className="px-4 py-3 align-top text-texto-suave">{fila.carrera}</td>
                    <td className="px-4 py-3 align-top text-texto-suave">{fila.fecha}</td>
                    <td className="px-4 py-3 align-top text-texto-suave">{fila.modalidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="titulo-faq">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="titulo-faq" className="text-2xl font-bold text-texto">
              Preguntas frecuentes de estudiantes
            </h2>
            <Button variante="fantasma" tamano="sm" href="/faq">
              Ver todas las preguntas
            </Button>
          </div>
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible):
            "FAQ específica (RF-14). Respuestas oficiales PENDIENTES." Las respuestas se muestran
            como mensaje de proceso desde la T7.
          */}
          <div className="mt-6">
            <FaqAcordeon items={faqEstudiantes} mostrarCategoria={false} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default EstudiantesPage;
