import { Link, useParams } from 'react-router-dom';
import { ENLACES } from '../constants/enlaces';
import { mockCarreras } from '../constants/mock-data';
import PaginaNoEncontrada from './PaginaNoEncontrada';

const ACCIONES_INSCRIPCION = {
  etiqueta: 'Inscripción oficial (GCBA)',
  queda: ENLACES.inscripcion === '',
};

function CarreraDetallePage() {
  const { id } = useParams<{ id: string }>();
  const carrera = mockCarreras.find((item) => item.id === id);

  if (carrera === undefined) {
    return <PaginaNoEncontrada />;
  }

  const otrasCarreras = mockCarreras.filter((item) => item.id !== carrera.id);

  return (
    <main className="min-h-screen">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <nav aria-label="Ruta de navegación" className="text-sm text-slate-500">
            <Link to="/" className="hover:text-acento-700">
              Inicio
            </Link>
            {' / '}
            <Link to="/carreras" className="hover:text-acento-700">
              Carreras
            </Link>
            {' / '}
            <span className="text-slate-900">{carrera.nombre}</span>
          </nav>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">{carrera.nombre}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-acento-600 px-3 py-1 text-xs font-medium text-acento-700">
              Modalidad: {carrera.modalidad}
            </span>
            <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600">
              Turno: exclusivamente nocturno
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section aria-labelledby="titulo-descripcion">
            <h2 id="titulo-descripcion" className="text-xl font-semibold text-slate-900">
              Descripción
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">{carrera.descripcionBreve}</p>
          </section>

          <section
            aria-labelledby="titulo-plan"
            className="rounded-xl border border-dashed border-slate-300 bg-white p-6"
          >
            <h2 id="titulo-plan" className="text-xl font-semibold text-slate-900">
              Plan de estudios
            </h2>
            <p className="mt-3 text-slate-500">
              Plan de estudios, materias, correlatividades y programas pendientes de validación.
            </p>
            <span className="mt-4 inline-block rounded-md bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
              Próximamente
            </span>
          </section>
        </div>

        <aside aria-label="Acciones y otras carreras" className="space-y-6">
          <section
            aria-labelledby="titulo-acciones"
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 id="titulo-acciones" className="text-lg font-semibold text-slate-900">
              Acciones
            </h2>
            <div className="mt-4 space-y-3">
              <div
                aria-disabled={ACCIONES_INSCRIPCION.queda}
                className="rounded-lg border border-slate-200 p-4"
              >
                <p className="text-sm font-medium text-slate-700">
                  {ACCIONES_INSCRIPCION.etiqueta}
                </p>
                {ACCIONES_INSCRIPCION.queda ? (
                  <p className="mt-1 text-xs text-slate-500">
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
                className="block rounded-lg border border-slate-200 p-4 text-sm font-medium text-acento-700 transition-colors hover:border-acento-600"
              >
                Consultar por esta carrera →
              </Link>
            </div>
          </section>

          <section
            aria-labelledby="titulo-otras"
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 id="titulo-otras" className="text-lg font-semibold text-slate-900">
              Otras carreras
            </h2>
            <ul className="mt-4 space-y-2">
              {otrasCarreras.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/carreras/${item.id}`}
                    className="text-sm text-slate-600 transition-colors hover:text-acento-700"
                  >
                    {item.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default CarreraDetallePage;
