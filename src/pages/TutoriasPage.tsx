import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import { DIRECCION_INSTITUTO, HORARIO_ATENCION } from '../constants/navegacion';
import { ASUNTO_TUTORIAS, CORREO_TUTORIAS, ENLACE_CORREO_TUTORIAS } from '../constants/tutorias';

function TutoriasPage() {
  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        breadcrumb={[{ etiqueta: 'Inicio', href: '/' }, { etiqueta: 'Tutoría' }]}
        eyebrow="Tutoría"
        seccion="ambar"
        titulo="Tutoría"
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
            "PENDIENTE INSTITUCIONAL · texto oficial del equipo de tutorías". Edith entregó el
            texto de 3 párrafos (acompañamiento, permanencia y egreso), pero el literal no está
            transcripto en Capa 1: se publica cuando el instituto lo entregue y no se redacta por
            cuenta propia.
          */}
          <p className="mt-6 rounded-xl border border-borde-suave bg-white p-6 text-texto-suave">
            El equipo de tutorías publica el texto de presentación del espacio cuando esté
            disponible.
          </p>

          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible):
            "Foto del espacio de tutorías · PENDIENTE (M1)". La imagen viene en el documento de
            Edith y todavía no está en el repo de assets.
          */}
          <div className="mt-4 rounded-xl border border-dashed border-borde bg-fondo p-6 text-sm text-texto-suave">
            La foto del espacio de tutorías se publica cuando esté disponible.
          </div>
        </section>

        {/*
          Devolución de Edith §7 (ticket 0000090): se quita la tabla de días y horarios y queda
          solo el canal de contacto. Las consultas de tutorías no pasan por el formulario general.
        */}
        <section aria-labelledby="titulo-contacto-equipo">
          <h2 id="titulo-contacto-equipo" className="text-2xl font-bold text-texto">
            Contacto con el equipo de tutores
          </h2>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <li className="rounded-xl border border-borde-suave bg-white p-5 shadow-suave">
              <h3 className="text-base font-semibold text-texto">Correo de tutorías</h3>
              <p className="mt-1 text-sm text-texto-suave">
                Canal único de contacto con el equipo.
              </p>
              <p className="mt-3 text-sm">
                <a
                  href={ENLACE_CORREO_TUTORIAS}
                  className="font-medium text-acento-700 underline hover:text-acento-800"
                >
                  {CORREO_TUTORIAS}
                </a>
              </p>
              <p className="mt-3 text-sm text-texto-suave">
                Usá el asunto <span className="font-medium text-texto">{ASUNTO_TUTORIAS}</span> e
                indicá tu año y carrera.
              </p>
            </li>

            <li className="rounded-xl border border-borde-suave bg-white p-5 shadow-suave">
              <h3 className="text-base font-semibold text-texto">Dónde</h3>
              <p className="mt-1 text-sm text-texto-suave">
                {DIRECCION_INSTITUTO} · {HORARIO_ATENCION}.
              </p>
            </li>
          </ul>

          {/*
            Datos institucionales del export. Anotaciones del diseño (comentario UX/UI, no es
            copy visible): "PENDIENTE INSTITUCIONAL · correo institucional". El correo general del
            instituto sigue sin definirse (devolución §11): no se publica una dirección no
            confirmada.
          */}
          <div className="mt-4 rounded-xl border border-borde-suave bg-white p-5 shadow-suave">
            <h3 className="text-base font-semibold text-texto">IFTS N.º 12</h3>
            <p className="mt-1 text-sm text-texto-suave">{DIRECCION_INSTITUTO}</p>
            <p className="mt-1 text-sm text-texto-suave">
              Horario de atención: {HORARIO_ATENCION}.
            </p>
            <p className="mt-3 text-sm text-texto-suave">
              Correo institucional: se publica cuando esté disponible.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default TutoriasPage;
