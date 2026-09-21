import FaqAcordeon from '../components/ui/FaqAcordeon';
import { mockFaqs } from '../constants/mock-data';

const faqDocentes = mockFaqs.filter((item) => item.categoria === 'docentes');

const ESPACIOS_DOCENTES = [
  {
    id: 'informacion-general',
    titulo: 'Información para docentes',
    descripcion: 'Normativas, comunicados y novedades del cuerpo docente.',
  },
  {
    id: 'docentes-por-carrera',
    titulo: 'Docentes por carrera',
    descripcion: 'Equipos docentes de cada carrera y sus vías de comunicación.',
  },
  {
    id: 'concursos',
    titulo: 'Concursos docentes',
    descripcion: 'Convocatorias y requisitos de concursos y coberturas de horas.',
  },
  {
    id: 'normativas',
    titulo: 'Repositorio de normativas',
    descripcion: 'Resoluciones, reglamentos y disposiciones vigentes.',
  },
  {
    id: 'documentacion',
    titulo: 'Documentación académica',
    descripcion: 'Formularios y plantillas para la gestión académica.',
  },
];

function DocentesPage() {
  return (
    <main className="min-h-screen">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-900">Docentes</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Recursos, normativas y novedades para el equipo docente del instituto.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12">
        <section aria-labelledby="titulo-espacios">
          <h2 id="titulo-espacios" className="text-2xl font-bold text-slate-900">
            Espacios docentes
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ESPACIOS_DOCENTES.map((espacio) => (
              <li
                key={espacio.id}
                aria-disabled="true"
                className="rounded-xl border border-dashed border-slate-300 bg-white p-6"
              >
                <h3 className="text-base font-semibold text-slate-900">{espacio.titulo}</h3>
                <p className="mt-2 text-sm text-slate-500">{espacio.descripcion}</p>
                <span className="mt-4 inline-block rounded-md bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Próximamente
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="titulo-faq" className="mx-auto max-w-3xl">
          <h2 id="titulo-faq" className="text-2xl font-bold text-slate-900">
            Preguntas frecuentes de docentes
          </h2>
          <div className="mt-6">
            <FaqAcordeon items={faqDocentes} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default DocentesPage;
