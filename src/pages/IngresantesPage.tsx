import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import Button from '../components/ui/Button';
import FaqAcordeon from '../components/ui/FaqAcordeon';
import { ENLACES } from '../constants/enlaces';
import { mockFaqs } from '../constants/mock-data';

const faqIngresantes = mockFaqs.filter((item) => item.categoria === 'ingresantes');

/**
 * Inscripción a las tecnicaturas (Mapa del Sitio V3 §5; devolución de Edith §5). Las tres
 * preguntas y sus respuestas están validadas por el instituto. El enlace de preinscripción y el
 * instructivo paso a paso los marcó Edith como `[INSERTAR]`: se publican cuando IFTS/Dirección
 * los entregue, sin URLs inventadas (RN-10).
 */
const PREGUNTAS_INSCRIPCION = [
  {
    id: 'como-me-inscribo',
    pregunta: '¿Cómo me inscribo?',
    respuesta:
      'Con la preinscripción online del sistema de la Agencia de Aprendizaje a lo Largo de la Vida (GCBA), que incluye un instructivo paso a paso.',
  },
  {
    id: 'requisitos',
    pregunta: '¿Qué requisitos necesito?',
    respuesta:
      'Título secundario o certificado en trámite; convalidación si el título es del extranjero; DNI o pasaporte.',
  },
  {
    id: 'donde-preinscripcion',
    pregunta: '¿Dónde hago la preinscripción?',
    respuesta:
      'En el sitio oficial del Gobierno de la Ciudad, con el sistema de preinscripción de la Agencia de Aprendizaje a lo Largo de la Vida.',
  },
];

function IngresantesPage() {
  const inscripcionDisponible = ENLACES.inscripcion !== '';
  const instructivoDisponible = ENLACES.instructivoInscripcion !== '';

  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        breadcrumb={[{ etiqueta: 'Inicio', href: '/' }, { etiqueta: 'Ingresantes' }]}
        eyebrow="Ingresantes"
        seccion="verde"
        titulo="Ingresantes"
        descripcion="Cómo inscribirte en el IFTS N.º 12: preinscripción online del GCBA, requisitos y documentación."
      />

      <div className="mx-auto max-w-contenido space-y-14 px-4 py-12">
        {/*
          Anotación del diseño (comentario UX/UI, no es copy visible): "(RF-03)".
        */}
        <aside
          aria-label="Sobre la inscripción"
          className="rounded-xl border border-borde-suave bg-fondo p-6"
        >
          <p className="text-sm text-texto-suave">
            La inscripción se realiza en el sitio oficial del Gobierno de la Ciudad. Este sitio
            informa el recorrido; no inscribe.
          </p>
        </aside>

        {/*
          V3 §5: se quita de Ingresantes el listado de carreras (confunde la navegación) y con él
          los bloques Modalidad, Horarios, Equivalencias y Pases, que pasan a Alumnos.
        */}
        <section aria-labelledby="titulo-inscripcion">
          <h2 id="titulo-inscripcion" className="text-2xl font-bold text-texto">
            Inscripción a las tecnicaturas
          </h2>
          <p className="mt-2 text-texto-suave">
            La preinscripción se hace online, por el sistema del Gobierno de la Ciudad.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {PREGUNTAS_INSCRIPCION.map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
              >
                <h3 className="text-base font-semibold text-texto">{item.pregunta}</h3>
                <p className="mt-2 text-sm text-texto-suave">{item.respuesta}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-borde-suave bg-white p-6 shadow-suave">
            <h3 className="text-base font-semibold text-texto">Preinscripción e instructivo</h3>

            {inscripcionDisponible ? (
              <a
                href={ENLACES.inscripcion}
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center rounded-md bg-acento-600 px-5 text-sm font-medium text-white transition-colors hover:bg-acento-700"
              >
                Inscribirme en el sitio oficial (GCBA)
              </a>
            ) : (
              <p className="mt-2 text-sm text-texto-suave">
                El enlace oficial de preinscripción se publica cuando esté disponible.
              </p>
            )}

            {instructivoDisponible ? (
              <a
                href={ENLACES.instructivoInscripcion}
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center rounded-md border border-borde bg-white px-5 text-sm font-medium text-texto transition-colors hover:border-acento-600 hover:text-acento-700"
              >
                Ver el instructivo paso a paso
              </a>
            ) : (
              <p className="mt-2 text-sm text-texto-suave">
                El instructivo paso a paso se publica cuando esté disponible.
              </p>
            )}
          </div>
        </section>

        <section aria-labelledby="titulo-faq">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="titulo-faq" className="text-2xl font-bold text-texto">
              Preguntas frecuentes de ingresantes
            </h2>
            <Button variante="fantasma" tamano="sm" href="/faq">
              Ver todas las preguntas
            </Button>
          </div>
          <p className="mt-2 text-texto-suave">
            Respuestas institucionales sobre el ingreso y la validez de los títulos.
          </p>
          {/* Título y validez oficial: el texto de Edith todavía no está transcripto en Capa 1. */}
          <div className="mt-6">
            <FaqAcordeon items={faqIngresantes} mostrarCategoria={false} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default IngresantesPage;
