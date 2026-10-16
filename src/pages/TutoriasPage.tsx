import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import Button from '../components/ui/Button';
import FormularioConsulta from '../components/ui/FormularioConsulta';

/**
 * Turnos de atención del export `05 · Tutorías` (tabla Día / Horario / Modalidad). El diseño
 * trae dos filas de estructura con todo PENDIENTE: no hay cronograma oficial publicado y no se
 * inventan días ni horarios.
 */
const TURNOS_TUTORIAS: { id: string; dia: string; horario: string; modalidad: string }[] = [
  { id: 'turno-1', dia: 'PENDIENTE', horario: 'PENDIENTE', modalidad: 'PENDIENTE' },
  { id: 'turno-2', dia: 'PENDIENTE', horario: 'PENDIENTE', modalidad: 'PENDIENTE' },
];

function TutoriasPage() {
  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        breadcrumb={[{ etiqueta: 'Inicio', href: '/' }, { etiqueta: 'Tutorías' }]}
        eyebrow="Tutorías"
        seccion="ambar"
        titulo="Tutorías"
        descripcion="Espacio de acompañamiento al estudiante. Información institucional del servicio de tutorías."
      />

      <div className="mx-auto max-w-contenido space-y-14 px-4 py-12">
        {/*
          Anotación del diseño (comentario UX/UI, no es copy visible): la bajada original agrega
          "(sin reserva de turnos ni solicitud online · I12)". I12 y las refs del export no se
          renderizan (guard anti-anotaciones).
        */}

        <section aria-labelledby="titulo-presentacion">
          <h2 id="titulo-presentacion" className="text-2xl font-bold text-texto">
            Presentación del espacio
          </h2>
          <p className="mt-2 text-texto-suave">Qué es y para quién.</p>

          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible):
            "Texto de presentación del espacio de acompañamiento · PENDIENTE INSTITUCIONAL" y
            "PENDIENTE INSTITUCIONAL · texto oficial del equipo de tutorías". El texto oficial
            todavía no existe: se muestra como mensaje de proceso (no se inventa contenido).
          */}
          <p className="mt-6 rounded-xl border border-borde-suave bg-white p-6 text-texto-suave">
            El equipo de tutorías publica el texto de presentación del espacio cuando esté
            disponible.
          </p>

          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible):
            "Foto del espacio de tutorías · PENDIENTE (M1)". La imagen todavía no existe.
          */}
          <div className="mt-4 rounded-xl border border-dashed border-borde bg-fondo p-6 text-sm text-texto-suave">
            La foto del espacio de tutorías se publica cuando esté disponible.
          </div>
        </section>

        <section aria-labelledby="titulo-atencion">
          <h2 id="titulo-atencion" className="text-2xl font-bold text-texto">
            Días, horarios y modalidades de atención
          </h2>

          <div className="mt-6 overflow-x-auto rounded-xl border border-borde-suave bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Turnos de atención de tutorías</caption>
              <thead className="bg-fondo">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Día
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Horario
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-texto">
                    Modalidad
                  </th>
                </tr>
              </thead>
              <tbody>
                {TURNOS_TUTORIAS.map((fila) => (
                  <tr key={fila.id} className="border-t border-borde-suave">
                    <th scope="row" className="px-4 py-3 align-top font-medium text-texto">
                      {fila.dia}
                    </th>
                    <td className="px-4 py-3 align-top text-texto-suave">{fila.horario}</td>
                    <td className="px-4 py-3 align-top text-texto-suave">{fila.modalidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="titulo-contacto-equipo">
          <h2 id="titulo-contacto-equipo" className="text-2xl font-bold text-texto">
            Contacto con el equipo de tutores
          </h2>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <li className="rounded-xl border border-borde-suave bg-white p-5 shadow-suave">
              <h3 className="text-base font-semibold text-texto">Correo de tutorías</h3>
              <p className="mt-1 text-sm text-texto-suave">
                Canal de contacto directo con el equipo.
              </p>
              {/*
                Anotación del diseño (comentario UX/UI, no es copy visible):
                "PENDIENTE INSTITUCIONAL · correo oficial (no usar direcciones no confirmadas)".
                No se muestra ninguna dirección hasta que el instituto confirme la oficial.
              */}
              <p className="mt-3 text-sm text-texto-suave">
                El correo oficial del equipo se publica cuando esté disponible.
              </p>
            </li>

            <li className="rounded-xl border border-borde-suave bg-white p-5 shadow-suave">
              <h3 className="text-base font-semibold text-texto">Dónde</h3>
              <p className="mt-1 text-sm text-texto-suave">
                Misiones 26, C1083 ABB, CABA · Atención exclusivamente nocturna.
              </p>
            </li>

            <li className="rounded-xl border border-borde-suave bg-white p-5 shadow-suave">
              <h3 className="text-base font-semibold text-texto">¿Tenés una consulta?</h3>
              <p className="mt-1 text-sm text-texto-suave">
                Escribinos desde el formulario de Contacto eligiendo el asunto
                &ldquo;Tutorías&rdquo;.
              </p>
              <div className="mt-4">
                <Button variante="secundario" tamano="sm" href="/contacto">
                  Ir a Contacto
                </Button>
              </div>
            </li>
          </ul>

          {/*
            Datos institucionales del export. Anotaciones del diseño (comentario UX/UI, no es
            copy visible): "PENDIENTE INSTITUCIONAL · franja horaria exacta" y
            "PENDIENTE INSTITUCIONAL · dirección oficial (I10, no inventar)": la dirección y la
            bajada de "Correo institucional" se publican cuando el instituto las confirme.
          */}
          <div className="mt-4 rounded-xl border border-borde-suave bg-white p-5 shadow-suave">
            <h3 className="text-base font-semibold text-texto">IFTS N.º 12</h3>
            <p className="mt-1 text-sm text-texto-suave">Misiones 26, C1083 ABB, CABA</p>
            <p className="mt-1 text-sm text-texto-suave">
              Horario de atención: exclusivamente nocturno.
            </p>
            <p className="mt-3 text-sm text-texto-suave">
              Correo institucional: se publica cuando esté disponible.
            </p>
          </div>
        </section>

        {/*
          "Consulta directa" del export: el título lo aporta el propio formulario (mismo patrón
          que Contacto). Anotación del diseño (comentario UX/UI, no es copy visible):
          "Campos obligatorios marcados con *. Se valida formato de correo. El mensaje de éxito
          confirma solo lo que responda la API (I1)." La validación de formato ya la hace el
          componente; el envío real depende del backend (I1).
        */}
        <FormularioConsulta titulo="Consulta directa" />
      </div>
    </main>
  );
}

export default TutoriasPage;
