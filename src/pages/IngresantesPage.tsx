import { Link } from 'react-router-dom';
import CardCarrera from '../components/ui/CardCarrera';
import FaqAcordeon from '../components/ui/FaqAcordeon';
import { ENLACES } from '../constants/enlaces';
import { mockCarreras, mockFaqs } from '../constants/mock-data';

const faqIngresantes = mockFaqs.filter((item) => item.categoria === 'ingresantes');

const INFOCARDS_INGRESO = [
  {
    titulo: 'Modalidad',
    descripcion: 'Las carreras se dictan en modalidad presencial.',
  },
  {
    titulo: 'Horarios',
    descripcion: 'Turno exclusivamente nocturno, de lunes a viernes.',
  },
  {
    titulo: 'Equivalencias',
    descripcion: 'Se evalúan estudios previos y equivalencias en secretaría académica.',
  },
];

function IngresantesPage() {
  const inscripcionDisponible = ENLACES.inscripcion !== '';

  return (
    <main className="min-h-screen">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-900">Ingresantes</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Toda la información para empezar tu carrera en el instituto, desde la inscripción hasta
            tu primer día de clases.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12">
        <section
          aria-labelledby="titulo-inscripcion"
          className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 id="titulo-inscripcion" className="text-xl font-semibold text-slate-900">
              Inscripción a las carreras
            </h2>
            <p className="mt-2 text-slate-600">
              La inscripción se realiza a través del enlace oficial del GCBA. La fecha de apertura
              del próximo ciclo se publica en novedades.
            </p>
          </div>
          {inscripcionDisponible ? (
            <a
              href={ENLACES.inscripcion}
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-acento-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-acento-700"
            >
              Inscribirme ahora
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex shrink-0 cursor-default items-center rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-500"
            >
              Enlace oficial próximamente
            </span>
          )}
        </section>

        <section aria-labelledby="titulo-carreras">
          <h2 id="titulo-carreras" className="text-2xl font-bold text-slate-900">
            Carreras disponibles
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockCarreras.map((carrera) => (
              <li key={carrera.id}>
                <Link
                  to={`/carreras/${carrera.id}`}
                  className="block rounded-xl transition-transform hover:-translate-y-0.5"
                >
                  <CardCarrera carrera={carrera} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="titulo-modalidad">
          <h2 id="titulo-modalidad" className="text-2xl font-bold text-slate-900">
            Modalidad, horarios y equivalencias
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {INFOCARDS_INGRESO.map((item) => (
              <li
                key={item.titulo}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-slate-900">{item.titulo}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.descripcion}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="titulo-pases"
          className="space-y-4 rounded-xl border border-dashed border-slate-300 bg-white p-6"
        >
          <h2 id="titulo-pases" className="text-xl font-semibold text-slate-900">
            Pases y cambio de carrera
          </h2>
          <p className="text-slate-500">
            El instituto recibe pases y traspasos desde otros institutos de formación técnica
            superior. El procedimiento y los requisitos se detallan en la normativa vigente y en
            secretaría académica.
          </p>
          <span className="inline-block rounded-md bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
            Solicitud de pase próximamente
          </span>
        </section>

        <section aria-labelledby="titulo-faq" className="mx-auto max-w-3xl">
          <h2 id="titulo-faq" className="text-2xl font-bold text-slate-900">
            Preguntas frecuentes de ingresantes
          </h2>
          <div className="mt-6">
            <FaqAcordeon items={faqIngresantes} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default IngresantesPage;
