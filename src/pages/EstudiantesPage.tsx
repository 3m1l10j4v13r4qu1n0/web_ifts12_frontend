import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import FaqAcordeon from '../components/ui/FaqAcordeon';
import { ENLACES } from '../constants/enlaces';
import { mockFaqs } from '../constants/mock-data';

const faqEstudiantes = mockFaqs.filter((item) => item.categoria === 'estudiantes');

const SERVICIOS_ESTUDIANTES = [
  {
    id: 'regularidad',
    titulo: 'Regularidad',
    descripcion: 'Requisitos para mantener tu regularidad.',
  },
  {
    id: 'constancias',
    titulo: 'Constancias',
    descripcion: 'Constancias de cursada, certificados y estado académico.',
  },
  {
    id: 'mesas-examen',
    titulo: 'Mesas de examen',
    descripcion: 'Fechas, inscripción y convocatorias de mesas.',
  },
  {
    id: 'becas',
    titulo: 'Becas',
    descripcion: 'Información sobre becas estudiantiles y su solicitud.',
  },
  {
    id: 'boleto-estudiantil',
    titulo: 'Boleto estudiantil',
    descripcion: 'Trámite del boleto estudiantil y requisitos.',
  },
  {
    id: 'titulos',
    titulo: 'Trámites de títulos',
    descripcion: 'Solicitud de título y analíticos.',
  },
  {
    id: 'traspasos',
    titulo: 'Traspasos entre IFTS',
    descripcion: 'Cambios de instituto y reconocimiento de trayectos.',
  },
  {
    id: 'campus-virtual',
    titulo: 'Campus virtual',
    descripcion: 'Acceso a Moodle para la cursada y los recursos.',
  },
];

function EstudiantesPage() {
  const campusDisponible = ENLACES.moodle !== '';

  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        eyebrow="Cursada"
        seccion="cian"
        titulo="Estudiantes"
        descripcion="Servicios, trámites y recursos para tu cursada en el instituto."
      />

      <div className="mx-auto max-w-contenido space-y-14 px-4 py-12">
        <section
          aria-labelledby="titulo-campus"
          className="flex flex-col gap-4 rounded-xl border border-borde-suave bg-white p-6 shadow-suave sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 id="titulo-campus" className="text-xl font-semibold text-texto">
              Campus virtual (Moodle)
            </h2>
            <p className="mt-2 text-texto-suave">
              Ingresá al aula virtual para consultar materias, recursos y novedades de la cursada.
            </p>
          </div>
          {campusDisponible ? (
            <a
              href={ENLACES.moodle}
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-acento-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-acento-700"
            >
              Ingresar al campus virtual
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex shrink-0 cursor-default items-center rounded-lg bg-fondo px-5 py-2.5 text-sm font-medium text-texto-suave"
            >
              Enlace oficial próximamente
            </span>
          )}
        </section>

        <section aria-labelledby="titulo-servicios">
          <h2 id="titulo-servicios" className="text-2xl font-bold text-texto">
            Servicios para estudiantes
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICIOS_ESTUDIANTES.map((servicio) => (
              <li
                key={servicio.id}
                aria-disabled="true"
                className="rounded-xl border border-dashed border-borde bg-white p-5"
              >
                <h3 className="text-sm font-semibold text-texto">{servicio.titulo}</h3>
                <p className="mt-1 text-sm text-texto-suave">{servicio.descripcion}</p>
                <span className="mt-3 inline-block rounded bg-fondo px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-texto-suave">
                  Próximamente
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="titulo-calendario"
          className="rounded-xl border border-dashed border-borde bg-white p-6"
        >
          <h2 id="titulo-calendario" className="text-xl font-semibold text-texto">
            Calendario académico
          </h2>
          <p className="mt-3 text-texto-suave">
            Fechas del ciclo lectivo, mesas de examen y recesos. Se publica cuando esté el
            calendario oficial del ciclo.
          </p>
        </section>

        <section aria-labelledby="titulo-faq" className="mx-auto max-w-3xl">
          <h2 id="titulo-faq" className="text-2xl font-bold text-texto">
            Preguntas frecuentes de estudiantes
          </h2>
          <div className="mt-6">
            <FaqAcordeon items={faqEstudiantes} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default EstudiantesPage;
