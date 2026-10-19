import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import Button from '../components/ui/Button';
import FaqAcordeon from '../components/ui/FaqAcordeon';
import FormularioConsulta from '../components/ui/FormularioConsulta';
import type { FaqItem } from '../types/domain/sitio.types';

/**
 * Preguntas frecuentes de contacto del export `09 · Contacto`. El diseño lista las tres
 * preguntas sin respuestas: siguen el patrón de las FAQ de T7 con mensaje de proceso (no se
 * inventan respuestas).
 */
const FAQ_CONTACTO: FaqItem[] = [
  {
    id: 'faq-contacto-ingreso',
    categoria: 'institucional',
    pregunta: '¿A qué correo escribo para consultas de ingreso?',
    respuesta: 'La respuesta oficial se publica cuando esté disponible.',
  },
  {
    id: 'faq-contacto-constancias',
    categoria: 'institucional',
    pregunta: '¿Dónde pido constancias o certificados?',
    respuesta: 'La respuesta oficial se publica cuando esté disponible.',
  },
  {
    id: 'faq-contacto-tutorias',
    categoria: 'institucional',
    pregunta: '¿Cómo contacto al equipo de tutorías?',
    respuesta: 'La respuesta oficial se publica cuando esté disponible.',
  },
];

function ContactoPage() {
  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        breadcrumb={[{ etiqueta: 'Inicio', href: '/' }, { etiqueta: 'Contacto' }]}
        eyebrow="Contacto"
        seccion="rojo"
        titulo="Contacto"
        descripcion="Consultas generales, de ingreso y de tutorías. También podés usar la consulta directa del pie de página."
      />

      <div className="mx-auto grid max-w-contenido grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/*
            "Escribinos" del export. "Campos obligatorios marcados con *" es el texto de ayuda
            visible del diseño; la nota de estados ("Estados del formulario (error, enviando,
            éxito, fallo) en 06 · Estados. El mensaje de éxito confirma solo lo que responda la
            API…") queda como comentario UX/UI (no es copy visible).
          */}
          <FormularioConsulta
            titulo="Escribinos"
            ayuda="Campos obligatorios marcados con *."
            conAsunto
            conPrivacidad
            etiquetaMensaje="Mensaje"
          />
        </div>

        <aside aria-label="Datos institucionales" className="space-y-6">
          <section
            aria-labelledby="titulo-datos"
            className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
          >
            <h2 id="titulo-datos" className="text-lg font-semibold text-texto">
              Datos institucionales
            </h2>
            <address className="mt-3 not-italic text-texto-suave">
              Misiones 26, C1083 ABB, CABA
            </address>
            <p className="mt-2 text-texto-suave">Horario de atención: exclusivamente nocturno.</p>
            {/*
              Anotaciones del diseño (comentario UX/UI, no es copy visible): "PENDIENTE
              INSTITUCIONAL · correo institucional" y "PENDIENTE INSTITUCIONAL · teléfono (si
              corresponde publicarlo)". No se muestran direcciones ni teléfonos hasta que el
              instituto los confirme (mismo criterio que T12, I10).
            */}
            <p className="mt-3 text-sm text-texto-suave">
              El correo institucional se publica cuando esté disponible.
            </p>
            <p className="mt-2 text-sm text-texto-suave">
              El teléfono de contacto se publica cuando esté disponible.
            </p>
          </section>

          <section
            aria-labelledby="titulo-ubicacion"
            className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
          >
            <h2 id="titulo-ubicacion" className="text-lg font-semibold text-texto">
              Ubicación
            </h2>
            {/*
              Anotación del diseño (comentario UX/UI, no es copy visible): "Mapa embebido ·
              Misiones 26, CABA · proveedor y enlace PENDIENTE". El mapa todavía no existe y no
              se elige proveedor por cuenta propia.
            */}
            <div className="mt-3 rounded-xl border border-dashed border-borde bg-fondo p-6 text-sm text-texto-suave">
              El mapa de ubicación se publica cuando esté disponible.
            </div>
            <div className="mt-4">
              <Button variante="secundario" disabled>
                Cómo llegar
              </Button>
            </div>
            <p className="mt-2 text-xs text-texto-suave">
              El enlace al mapa externo se publica cuando esté disponible.
            </p>
          </section>
        </aside>
      </div>

      <section aria-labelledby="titulo-faq-contacto" className="mx-auto max-w-contenido px-4 pb-12">
        <h2 id="titulo-faq-contacto" className="text-2xl font-bold text-texto">
          Preguntas frecuentes de contacto
        </h2>
        <div className="mt-6">
          <FaqAcordeon items={FAQ_CONTACTO} mostrarCategoria={false} />
        </div>
      </section>
    </main>
  );
}

export default ContactoPage;
