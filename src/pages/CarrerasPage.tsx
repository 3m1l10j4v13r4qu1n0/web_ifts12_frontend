import { Link } from 'react-router-dom';
import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import AvisoCarga from '../components/ui/AvisoCarga';
import AvisoError from '../components/ui/AvisoError';
import CardCarrera from '../components/ui/CardCarrera';
import { useCarreras } from '../hooks/useCarreras';

function CarrerasPage() {
  const { carreras, cargando, error, recargar } = useCarreras();

  // Bajada del diseño (`02 · Carreras`). El número de carreras sale del backend, no se
  // fija en el copy: el export muestra 5, pero la cantidad real la manda la API.
  const descripcion =
    !cargando && error === null && carreras.length > 0
      ? `Oferta académica del IFTS N.º 12: ${carreras.length} ${
          carreras.length === 1 ? 'carrera' : 'carreras'
        } en turno exclusivamente nocturno. Ingresá a cada carrera para ver plan de estudios, correlatividades, programas, resoluciones y cuerpo docente.`
      : undefined;

  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        breadcrumb={[{ etiqueta: 'Inicio', href: '/' }, { etiqueta: 'Carreras' }]}
        eyebrow="Carreras"
        seccion="cian"
        titulo="Carreras"
        descripcion={descripcion}
      />

      <section aria-labelledby="titulo-carreras" className="mx-auto max-w-contenido px-4 py-14">
        <h2 id="titulo-carreras" className="text-2xl font-bold text-texto">
          Nuestras carreras
        </h2>
        {/*
          Anotación del diseño (comentario UX/UI, no es copy visible):
          "Listado completo con turno y modalidad (RF-01). Nombres según fichas oficiales."
        */}

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
        Resumen por carrera (diseño Desktop 1440). El turno es siempre nocturno (RN-07). La
        modalidad sale del dato real del backend; los horarios no existen todavía en el DTO
        (hallazgo BE-E07/DB-14), así que se marcan PENDIENTE sin inventar.
      */}
      <section aria-labelledby="titulo-turnos" className="border-y border-borde-suave bg-fondo">
        <div className="mx-auto max-w-contenido px-4 py-14">
          <h2 id="titulo-turnos" className="text-2xl font-bold text-texto">
            Turno, modalidad y horarios (resumen)
          </h2>
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible):
            "Estructura informativa por carrera (RF-04). Sin datos inventados: horarios y
            modalidad quedan PENDIENTES hasta confirmación institucional."
          */}

          {cargando ? (
            <AvisoCarga que="el resumen de carreras" />
          ) : error !== null ? (
            <AvisoError que="el resumen de carreras" mensaje={error} alReintentar={recargar} />
          ) : carreras.length === 0 ? (
            <p className="mt-6 rounded-xl border border-borde-suave bg-white p-6 text-texto-suave">
              No hay carreras publicadas por el momento.
            </p>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-lg border border-borde-suave bg-white">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption className="sr-only">Turno, modalidad y horarios por carrera</caption>
                <thead className="bg-fondo">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold text-texto">
                      Carrera
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-texto">
                      Turno
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-texto">
                      Modalidad
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-texto">
                      Horarios
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-texto">
                      Ficha
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {carreras.map((carrera) => (
                    <tr key={carrera.id} className="border-t border-borde-suave">
                      <th scope="row" className="px-4 py-3 align-top font-medium text-texto">
                        {carrera.nombre}
                      </th>
                      <td className="px-4 py-3 align-top text-texto-suave">Nocturno</td>
                      <td className="px-4 py-3 align-top text-texto-suave">
                        {carrera.modalidad !== '' ? carrera.modalidad : 'PENDIENTE'}
                      </td>
                      <td className="px-4 py-3 align-top text-texto-suave">PENDIENTE</td>
                      <td className="px-4 py-3 align-top">
                        <Link
                          to={`/carreras/${carrera.id}`}
                          className="font-medium text-acento-700 hover:underline"
                        >
                          Ver ficha
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default CarrerasPage;
