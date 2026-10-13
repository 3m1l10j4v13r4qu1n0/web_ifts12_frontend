import { Link } from 'react-router-dom';
import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import CardCarrera from '../components/ui/CardCarrera';
import Estado from '../components/ui/Estado';
import FaqAcordeon from '../components/ui/FaqAcordeon';
import { ENLACES } from '../constants/enlaces';
import { mockFaqs } from '../constants/mock-data';
import { useCarreras } from '../hooks/useCarreras';

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
  const { carreras, cargando, error, recargar } = useCarreras();

  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        eyebrow="Ingreso"
        seccion="verde"
        titulo="Ingresantes"
        descripcion="Toda la información para empezar tu carrera en el instituto, desde la inscripción hasta tu primer día de clases."
      />

      <div className="mx-auto max-w-contenido space-y-14 px-4 py-12">
        <section
          aria-labelledby="titulo-inscripcion"
          className="flex flex-col gap-6 rounded-xl border border-borde-suave bg-white p-6 shadow-suave sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 id="titulo-inscripcion" className="text-xl font-semibold text-texto">
              Inscripción a las carreras
            </h2>
            <p className="mt-2 text-texto-suave">
              La inscripción se realiza a través del enlace oficial del GCBA. La fecha de apertura
              del próximo ciclo se publica en novedades.
            </p>
          </div>
          {inscripcionDisponible ? (
            <a
              href={ENLACES.inscripcion}
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md bg-acento-600 px-5 text-sm font-medium text-white transition-colors hover:bg-acento-700"
            >
              Inscribirme ahora
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex min-h-11 shrink-0 cursor-default items-center rounded-md bg-fondo px-5 text-sm font-medium text-texto-suave"
            >
              Enlace oficial próximamente
            </span>
          )}
        </section>

        <section aria-labelledby="titulo-carreras">
          <h2 id="titulo-carreras" className="text-2xl font-bold text-texto">
            Carreras disponibles
          </h2>
          {cargando ? (
            <Estado tipo="loading" className="mt-6" />
          ) : error !== null ? (
            <Estado
              tipo="error"
              mensaje={error}
              className="mt-6"
              accion={
                <button
                  type="button"
                  onClick={recargar}
                  className="mt-1 inline-flex min-h-11 items-center rounded-md border border-borde px-4 text-sm font-medium text-texto transition-colors hover:bg-fondo"
                >
                  Reintentar
                </button>
              }
            />
          ) : carreras.length > 0 ? (
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {carreras.map((carrera) => (
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
          ) : (
            <Estado tipo="empty" mensaje="Aún no hay carreras publicadas." className="mt-6" />
          )}
        </section>

        <section aria-labelledby="titulo-modalidad">
          <h2 id="titulo-modalidad" className="text-2xl font-bold text-texto">
            Modalidad, horarios y equivalencias
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {INFOCARDS_INGRESO.map((item) => (
              <li
                key={item.titulo}
                className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
              >
                <h3 className="text-base font-semibold text-texto">{item.titulo}</h3>
                <p className="mt-2 text-sm text-texto-suave">{item.descripcion}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="titulo-pases"
          className="space-y-4 rounded-xl border border-dashed border-borde bg-white p-6"
        >
          <h2 id="titulo-pases" className="text-xl font-semibold text-texto">
            Pases y cambio de carrera
          </h2>
          <p className="text-texto-suave">
            El instituto recibe pases y traspasos desde otros institutos de formación técnica
            superior. El procedimiento y los requisitos se detallan en la normativa vigente y en
            secretaría académica.
          </p>
          <span className="inline-block rounded-md bg-fondo px-3 py-1 text-xs font-medium uppercase tracking-wide text-texto-suave">
            Solicitud de pase próximamente
          </span>
        </section>

        <section aria-labelledby="titulo-faq" className="mx-auto max-w-3xl">
          <h2 id="titulo-faq" className="text-2xl font-bold text-texto">
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
