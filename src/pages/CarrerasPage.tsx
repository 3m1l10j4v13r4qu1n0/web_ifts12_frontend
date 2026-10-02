import { Link } from 'react-router-dom';
import CardCarrera from '../components/ui/CardCarrera';
import { mockCarreras } from '../constants/mock-data';

function CarrerasPage() {
  return (
    <main className="min-h-screen">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-900">Carreras</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Oferta académica del instituto. La ficha completa de cada carrera (plan de estudios,
            materias y programas) se publica cuando el equipo de Análisis valide los contenidos
            oficiales.
          </p>
        </div>
      </div>

      <section aria-labelledby="titulo-carreras" className="mx-auto max-w-6xl px-4 py-14">
        <h2 id="titulo-carreras" className="text-2xl font-bold text-slate-900">
          Carreras disponibles
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockCarreras.map((carrera) => (
            <li key={carrera.id}>
              <Link
                to={`/carreras/${carrera.id}`}
                className="block h-full rounded-xl transition-transform hover:-translate-y-0.5"
              >
                <CardCarrera carrera={carrera} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="titulo-modalidad" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 id="titulo-modalidad" className="text-2xl font-bold text-slate-900">
            Modalidad y horarios
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Todas las carreras del instituto se dictan en modalidad presencial. El instituto
            funciona de manera exclusivamente nocturna.
          </p>
        </div>
      </section>
    </main>
  );
}

export default CarrerasPage;
