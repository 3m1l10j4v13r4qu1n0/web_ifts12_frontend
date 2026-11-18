import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import Button from '../components/ui/Button';
import FaqAcordeon from '../components/ui/FaqAcordeon';
import { mockFaqs } from '../constants/mock-data';

const faqAlumnos = mockFaqs.filter((item) => item.categoria === 'estudiantes');

interface FilaCalendario {
  id: string;
  periodo: string;
  actividad: string;
  desde: string;
  hasta: string;
  /** Evento clave del calendario (mesas de examen): se destaca en negrita (V3 §6). */
  destacado?: boolean;
}

/**
 * Calendario académico (Mapa del Sitio V3 §6; devolución de Edith §6). Las mesas de examen no
 * tienen apartado propio: van dentro del calendario como evento clave. Las fechas quedan
 * PENDIENTE hasta que el instituto publique el calendario oficial: no se inventan fechas
 * (I8 · RF-11). ⏳ Formato definitivo: tabla, PDF descargable o ambos.
 */
const CALENDARIO: FilaCalendario[] = [
  {
    id: 'cuatrimestre-1',
    periodo: '1.er cuatrimestre',
    actividad: 'Cursada',
    desde: 'PENDIENTE',
    hasta: 'PENDIENTE',
  },
  {
    id: 'mesas-1',
    periodo: 'Mesas de examen final',
    actividad: 'Turno de examen · todas las carreras',
    desde: 'PENDIENTE',
    hasta: 'PENDIENTE',
    destacado: true,
  },
  {
    id: 'receso',
    periodo: 'Receso',
    actividad: '—',
    desde: 'PENDIENTE',
    hasta: 'PENDIENTE',
  },
  {
    id: 'cuatrimestre-2',
    periodo: '2.º cuatrimestre',
    actividad: 'Cursada',
    desde: 'PENDIENTE',
    hasta: 'PENDIENTE',
  },
  {
    id: 'mesas-2',
    periodo: 'Mesas de examen final',
    actividad: 'Turno de examen · todas las carreras',
    desde: 'PENDIENTE',
    hasta: 'PENDIENTE',
    destacado: true,
  },
];

function EstudiantesPage() {
  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        breadcrumb={[{ etiqueta: 'Inicio', href: '/' }, { etiqueta: 'Alumnos' }]}
        eyebrow="Alumnos"
        seccion="cian"
        titulo="Alumnos"
        descripcion="Calendario académico y respuestas a las dudas más frecuentes de los alumnos del IFTS N.º 12."
      />

      <div className="mx-auto max-w-contenido space-y-14 px-4 py-12">
        {/*
          Anotación del diseño (comentario UX/UI, no es copy visible): la bajada original agrega
          "Reemplaza la propuesta 'Comunidad de alumnos' (B3)" y la nota "Información del propio
          sitio vs. trámites externos: los enlaces con ↗ abren servicios externos (Moodle, SIU,
          GCBA). No hay cuentas ni perfiles de estudiantes en este sitio."
        */}

        {/*
          V3 §6: el calendario va primero y las mesas de examen se integran como evento clave.
          Se retiran las tarjetas de trámites (Regularidad, Constancias, Becas, Boleto, Títulos y
          Traspasos): su contenido pasa a las preguntas frecuentes desplegables.
        */}
        <section aria-labelledby="titulo-calendario">
          <h2 id="titulo-calendario" className="text-2xl font-bold text-texto">
            Calendario académico
          </h2>
          <p className="mt-2 text-texto-suave">
            Ciclo lectivo y mesas de examen final. Los eventos clave se destacan en negrita.
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-borde-suave bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Estructura del ciclo lectivo y mesas de examen final
              </caption>
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
                  <tr key={fila.id} className="border-t border-borde-suave">
                    <th scope="row" className="px-4 py-3 align-top font-medium text-texto">
                      {fila.destacado === true ? <strong>{fila.periodo}</strong> : fila.periodo}
                    </th>
                    <td className="px-4 py-3 align-top text-texto-suave">{fila.actividad}</td>
                    <td
                      className={
                        fila.destacado === true
                          ? 'px-4 py-3 align-top font-semibold text-texto'
                          : 'px-4 py-3 align-top text-texto-suave'
                      }
                    >
                      {fila.desde}
                    </td>
                    <td
                      className={
                        fila.destacado === true
                          ? 'px-4 py-3 align-top font-semibold text-texto'
                          : 'px-4 py-3 align-top text-texto-suave'
                      }
                    >
                      {fila.hasta}
                    </td>
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

        <section aria-labelledby="titulo-faq">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="titulo-faq" className="text-2xl font-bold text-texto">
              Preguntas frecuentes de alumnos
            </h2>
            <Button variante="fantasma" tamano="sm" href="/faq">
              Ver todas las preguntas
            </Button>
          </div>
          {/*
            Devolución de Edith §6: las preguntas reemplazan las tarjetas de trámites. Las
            respuestas sin confirmación institucional muestran el mensaje de proceso.
          */}
          <div className="mt-6">
            <FaqAcordeon items={faqAlumnos} mostrarCategoria={false} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default EstudiantesPage;
