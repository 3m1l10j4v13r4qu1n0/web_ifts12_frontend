import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import Button from '../components/ui/Button';

/**
 * Estructura de autoridades del export `07 · Institucional`. Anotación del diseño (comentario
 * UX/UI, no es copy visible): "Ejemplos de cargo = estructura, no dato (B7)" y "PENDIENTE
 * INSTITUCIONAL · validar con Nosotros/Drive (B7)": los tres bloques son la estructura del
 * diseño, no nombres ni cargos reales.
 */
const AUTORIDADES = ['autoridad-1', 'autoridad-2', 'autoridad-3'];

/**
 * Filas de la tabla Bedelía del export (RF-29). Anotación del diseño (comentario UX/UI, no es
 * copy visible): "Pendiente definir si se publican datos individuales o información genérica
 * del rol" y celdas "PENDIENTE": no hay datos oficiales publicados y no se inventan.
 */
const FILAS_BEDELIA: {
  id: string;
  anio: string;
  bedel: string;
  horario: string;
  contacto: string;
}[] = [
  {
    id: 'anio-1',
    anio: '1.er año',
    bedel: 'PENDIENTE',
    horario: 'PENDIENTE',
    contacto: 'PENDIENTE',
  },
  {
    id: 'anio-2',
    anio: '2.º año',
    bedel: 'PENDIENTE',
    horario: 'PENDIENTE',
    contacto: 'PENDIENTE',
  },
  {
    id: 'anio-3',
    anio: '3.er año',
    bedel: 'PENDIENTE',
    horario: 'PENDIENTE',
    contacto: 'PENDIENTE',
  },
];

/**
 * Documentos de Normativa del export (RF-20). Anotación del diseño (comentario UX/UI, no es
 * copy visible): "Archivo oficial PENDIENTE · PDF" + botón "Descargar". Los archivos todavía
 * no existen: se muestran como mensaje de proceso con la descarga deshabilitada (patrón de T4).
 */
const DOCUMENTOS_NORMATIVA = [
  { titulo: 'Reglamento orgánico' },
  { titulo: 'Código de convivencia' },
  { titulo: 'Otra normativa institucional' },
];

/**
 * Enlaces de interés institucional del export (RF-33). Anotación del diseño (comentario UX/UI,
 * no es copy visible): "Externo · URL PENDIENTE": las URLs oficiales siguen pendientes y no se
 * inventan.
 */
const ENLACES_INSTITUCIONALES = [
  { id: 'ciudad-bilingue', titulo: 'Ciudad Bilingüe' },
  { id: 'centro-simulacion', titulo: 'Centro de Simulación' },
];

function InstitucionalPage() {
  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        breadcrumb={[{ etiqueta: 'Inicio', href: '/' }, { etiqueta: 'Institucional' }]}
        eyebrow="El instituto"
        seccion="rojo"
        titulo="Institucional"
        descripcion="Historia, autoridades, bedelía, normativa y enlaces de interés del IFTS N.º 12."
      />

      {/*
        Anotaciones del diseño (comentario UX/UI, no es copy visible): las refs de la bajada
        original "(RF-18 · RF-19 · RF-20 · RF-29 · RF-33)" no se renderizan (guard
        anti-anotaciones).
      */}
      <div className="mx-auto max-w-contenido space-y-14 px-4 py-12">
        <section aria-labelledby="titulo-historia">
          <h2 id="titulo-historia" className="text-2xl font-bold text-texto">
            Historia del IFTS N.º 12
          </h2>
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible): "Texto de historia y
            presentación del instituto · PENDIENTE INSTITUCIONAL (I6)" y "PENDIENTE
            INSTITUCIONAL · historia oficial". El texto oficial todavía no existe: se muestra
            como mensaje de proceso (no se inventa contenido).
          */}
          <p className="mt-6 rounded-xl border border-borde-suave bg-white p-6 text-texto-suave">
            El instituto publica el texto de historia y presentación cuando esté validado por el
            equipo institucional.
          </p>
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible):
            "Foto institucional · PENDIENTE (M1)". La imagen todavía no existe.
          */}
          <div className="mt-4 rounded-xl border border-dashed border-borde bg-fondo p-6 text-sm text-texto-suave">
            La foto institucional se publica cuando esté disponible.
          </div>
        </section>

        <section aria-labelledby="titulo-autoridades">
          <h2 id="titulo-autoridades" className="text-2xl font-bold text-texto">
            Autoridades
          </h2>
          <p className="mt-2 text-texto-suave">Cargos y nombres solo con fuente verificable.</p>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUTORIDADES.map((id) => (
              <li
                key={id}
                className="rounded-xl border border-borde-suave bg-white p-5 shadow-suave"
              >
                <h3 className="text-base font-semibold text-texto">Nombre y apellido</h3>
                <p className="mt-1 text-sm text-texto-suave">Cargo · a validar</p>
                <p className="mt-3 text-sm text-texto-suave">
                  El instituto publica los nombres y cargos cuando estén verificados.
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="titulo-bedelia">
          <h2 id="titulo-bedelia" className="text-2xl font-bold text-texto">
            Bedelía
          </h2>
          <p className="mt-2 text-texto-suave">Horarios y puntos de contacto por año.</p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-borde-suave bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Datos de bedelía por año de cursada</caption>
              <thead className="bg-fondo">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Año / carrera
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Bedel/a
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Horario
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Contacto
                  </th>
                </tr>
              </thead>
              <tbody>
                {FILAS_BEDELIA.map((fila) => (
                  <tr key={fila.id} className="border-t border-borde-suave">
                    <th scope="row" className="px-4 py-3 align-top font-medium text-texto">
                      {fila.anio}
                    </th>
                    <td className="px-4 py-3 align-top text-texto-suave">{fila.bedel}</td>
                    <td className="px-4 py-3 align-top text-texto-suave">{fila.horario}</td>
                    <td className="px-4 py-3 align-top text-texto-suave">{fila.contacto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="titulo-normativa">
          <h2 id="titulo-normativa" className="text-2xl font-bold text-texto">
            Normativa
          </h2>
          <p className="mt-2 text-texto-suave">
            Marco normativo, reglamento orgánico y código de convivencia.
          </p>

          <ul className="mt-6 space-y-3">
            {DOCUMENTOS_NORMATIVA.map((documento) => (
              <li
                key={documento.titulo}
                className="flex flex-col gap-3 rounded-xl border border-borde-suave bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-texto">{documento.titulo}</p>
                  <p className="mt-1 text-sm text-texto-suave">
                    El archivo oficial se publica cuando esté disponible.
                  </p>
                </div>
                <Button variante="secundario" disabled>
                  Descargar
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="titulo-enlaces">
          <h2 id="titulo-enlaces" className="text-2xl font-bold text-texto">
            Enlaces de interés institucional
          </h2>
          <p className="mt-2 text-texto-suave">Enlaces externos.</p>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ENLACES_INSTITUCIONALES.map((enlace) => (
              <li
                key={enlace.id}
                className="flex flex-col rounded-xl border border-borde-suave bg-white p-5 shadow-suave"
              >
                <h3 className="text-base font-semibold text-texto">{enlace.titulo}</h3>
                <div className="mt-4">
                  <span
                    aria-disabled="true"
                    className="inline-flex min-h-11 items-center rounded-md border border-borde bg-fondo px-3 text-sm font-medium text-texto-suave"
                  >
                    Enlace oficial próximamente
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default InstitucionalPage;
