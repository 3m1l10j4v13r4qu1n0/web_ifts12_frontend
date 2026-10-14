import { Link } from 'react-router-dom';
import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import AvisoCarga from '../components/ui/AvisoCarga';
import AvisoError from '../components/ui/AvisoError';
import CardCarrera from '../components/ui/CardCarrera';
import { useCarreras } from '../hooks/useCarreras';

function CarrerasPage() {
  const { carreras, cargando, error, recargar } = useCarreras();

  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        eyebrow="Oferta académica"
        seccion="cian"
        titulo="Carreras"
        descripcion="Oferta académica del instituto. La ficha completa de cada carrera (plan de estudios, materias y programas) se publica cuando el equipo de Análisis valide los contenidos oficiales."
      />

      <section aria-labelledby="titulo-carreras" className="mx-auto max-w-contenido px-4 py-14">
        <h2 id="titulo-carreras" className="text-2xl font-bold text-texto">
          Carreras disponibles
        </h2>

        {cargando ? (
          <AvisoCarga que="las carreras" />
        ) : error !== null ? (
          <AvisoError que="las carreras" mensaje={error} alReintentar={recargar} />
        ) : carreras.length === 0 ? (
          <p className="mt-6 rounded-xl border border-borde-suave bg-white p-6 text-texto-suave">
            No hay carreras publicadas por el momento.
          </p>
        ) : (
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {carreras.map((carrera) => (
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
        )}
      </section>

      {/*
        Los horarios no se muestran porque el backend no los expone: no existe campo
        `horarios` en el DTO ni ruta que lo devuelva (ver hallazgo BE-E07 y DB-14). La
        modalidad se muestra por carrera, desde el dato real.
      */}
      <section aria-labelledby="titulo-turnos" className="border-y border-borde-suave bg-fondo">
        <div className="mx-auto max-w-contenido px-4 py-14">
          <h2 id="titulo-turnos" className="text-2xl font-bold text-texto">
            Horarios
          </h2>
          <p className="mt-3 max-w-2xl text-texto-suave">
            Los horarios por carrera se publican cuando estén disponibles. La modalidad de cada
            carrera figura en su ficha.
          </p>
        </div>
      </section>
    </main>
  );
}

export default CarrerasPage;
