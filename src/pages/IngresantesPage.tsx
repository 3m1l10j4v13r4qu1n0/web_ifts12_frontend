import { Link } from 'react-router-dom';
import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import AvisoCarga from '../components/ui/AvisoCarga';
import AvisoError from '../components/ui/AvisoError';
import Button from '../components/ui/Button';
import CardCarrera from '../components/ui/CardCarrera';
import FaqAcordeon from '../components/ui/FaqAcordeon';
import { ENLACES } from '../constants/enlaces';
import { mockFaqs } from '../constants/mock-data';
import { useCarreras } from '../hooks/useCarreras';

const faqIngresantes = mockFaqs.filter((item) => item.categoria === 'ingresantes');

/**
 * Etapas del proceso de inscripción (export `03 · Ingresantes`, tabla "Fechas clave").
 * Anotación del diseño: "Las etapas listadas son estructura de ejemplo: validar con
 * Análisis Funcional." La fecha de cada etapa queda PENDIENTE hasta confirmación (I5 · RF-02),
 * sin publicar fechas inventadas.
 */
const ETAPAS_INSCRIPCION = [
  { etapa: 'Inscripción online', fecha: 'PENDIENTE' },
  { etapa: 'Presentación de documentación', fecha: 'PENDIENTE' },
  { etapa: 'Inicio de clases', fecha: 'PENDIENTE' },
];

/**
 * Bloques de la sección "Modalidad, horarios y equivalencias" (RF-04 · RF-05). La última
 * línea de cada tarjeta es mensaje de proceso para lo que está pendiente de confirmación
 * institucional ("PENDIENTE INSTITUCIONAL · modalidad por carrera / franja horaria /
 * procedimiento de equivalencias"), no copy renderizado.
 */
const INFOCARDS_INGRESO = [
  {
    titulo: 'Modalidad',
    descripcion: 'Modalidad de cursada por carrera.',
    nota: 'La modalidad de cada carrera se muestra en su ficha.',
  },
  {
    titulo: 'Horarios',
    descripcion: 'Turno exclusivamente nocturno. Franja horaria por carrera.',
    nota: 'La franja horaria de cada carrera se publica cuando el instituto la confirme.',
  },
  {
    titulo: 'Equivalencias',
    descripcion: 'Régimen de equivalencias para estudios previos.',
    nota: 'El procedimiento de equivalencias se publica cuando el instituto lo confirme.',
  },
];

function IngresantesPage() {
  const inscripcionDisponible = ENLACES.inscripcion !== '';
  const { carreras, total, cargando, error, recargar } = useCarreras();

  const hayCarreras = !cargando && error === null && total > 0;

  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        breadcrumb={[{ etiqueta: 'Inicio', href: '/' }, { etiqueta: 'Ingresantes' }]}
        eyebrow="Ingresantes"
        seccion="verde"
        titulo="Ingresantes"
        descripcion="Todo lo que necesitás para ingresar al IFTS N.º 12: carreras, requisitos, fechas, modalidad, equivalencias, pases y preguntas frecuentes."
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

        <section aria-labelledby="titulo-carreras">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              {hayCarreras && (
                <p className="text-sm text-texto-suave">
                  {total} {total === 1 ? 'carrera' : 'carreras'} · turno
                  nocturno
                </p>
              )}
              <h2 id="titulo-carreras" className="text-2xl font-bold text-texto">
                Carreras disponibles
              </h2>
            </div>
            <Button variante="fantasma" tamano="sm" href="/carreras">
              {hayCarreras ? `Ver las ${total} carreras` : 'Ver carreras'}
            </Button>
          </div>

          {cargando ? (
            <AvisoCarga que="las carreras" variante="grilla" />
          ) : error !== null ? (
            <AvisoError que="las carreras" mensaje={error} alReintentar={recargar} />
          ) : carreras.length > 0 ? (
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
          ) : (
            <p className="mt-6 rounded-xl border border-borde-suave bg-white p-6 text-texto-suave">
              No hay carreras publicadas por el momento.
            </p>
          )}
        </section>

        <section aria-labelledby="titulo-requisitos">
          <h2 id="titulo-requisitos" className="text-2xl font-bold text-texto">
            Requisitos y fechas de inscripción
          </h2>
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible): la bajada original
            es "Estructura lista para cargar; no se publican fechas sin confirmación
            (I5 · RF-02)".
          */}
          <p className="mt-2 text-texto-suave">No se publican fechas sin confirmación.</p>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave">
              <h3 className="text-base font-semibold text-texto">
                Requisitos de admisión y documentación
              </h3>
              {/*
                Anotación del diseño (comentario UX/UI, no es copy visible):
                "PENDIENTE INSTITUCIONAL · listado oficial de requisitos y documentación".
              */}
              <p className="mt-2 text-sm text-texto-suave">
                El listado oficial de requisitos y documentación se publica cuando el instituto lo
                confirme.
              </p>
              {/*
                Anotación del diseño (comentario UX/UI, no es copy visible):
                "PENDIENTE INSTITUCIONAL · URL oficial de inscripción GCBA".
              */}
              {inscripcionDisponible ? (
                <a
                  href={ENLACES.inscripcion}
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center rounded-md bg-acento-600 px-5 text-sm font-medium text-white transition-colors hover:bg-acento-700"
                >
                  Inscribirme en el sitio oficial (GCBA)
                </a>
              ) : (
                <p className="mt-4 text-sm text-texto-suave">
                  El enlace oficial se publica cuando esté disponible.
                </p>
              )}
            </div>

            <div className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave">
              <h3 className="text-base font-semibold text-texto">Fechas clave</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <caption className="sr-only">Etapas y fechas del proceso de inscripción</caption>
                  <thead className="bg-fondo">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold text-texto">
                        Etapa
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold text-texto">
                        Fecha
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ETAPAS_INSCRIPCION.map((etapa) => (
                      <tr key={etapa.etapa} className="border-t border-borde-suave">
                        <th scope="row" className="px-4 py-3 align-top font-medium text-texto">
                          {etapa.etapa}
                        </th>
                        <td className="px-4 py-3 align-top text-texto-suave">{etapa.fecha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="titulo-condiciones">
          <h2 id="titulo-condiciones" className="text-2xl font-bold text-texto">
            Modalidad, horarios y equivalencias
          </h2>
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible):
            la bajada original es "Condiciones de cursada e ingreso (RF-04 · RF-05)."
          */}
          <p className="mt-2 text-texto-suave">Condiciones de cursada e ingreso.</p>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {INFOCARDS_INGRESO.map((item) => (
              <li
                key={item.titulo}
                className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
              >
                <h3 className="text-base font-semibold text-texto">{item.titulo}</h3>
                <p className="mt-2 text-sm text-texto-suave">{item.descripcion}</p>
                <p className="mt-2 text-sm text-texto-suave">{item.nota}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="titulo-pases"
          className="space-y-4 rounded-xl border border-dashed border-borde bg-white p-6"
        >
          <h2 id="titulo-pases" className="text-xl font-semibold text-texto">
            Pases desde otros institutos
          </h2>
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible): la bajada original
            es "Información sobre pases y traspasos (RF-05 · RF-32). Informativo en v1: no es
            un trámite online."
          */}
          <p className="text-texto-suave">Información sobre pases y traspasos.</p>
          <div className="rounded-xl border border-borde-suave bg-fondo p-4">
            <h3 className="text-base font-semibold text-texto">Cómo pedir un pase</h3>
            {/*
              Anotación del diseño (comentario UX/UI, no es copy visible):
              "PENDIENTE INSTITUCIONAL · procedimiento oficial de pases".
            */}
            <p className="mt-2 text-sm text-texto-suave">
              El procedimiento oficial de pases se publica cuando el instituto lo confirme.
            </p>
          </div>
          <Button variante="secundario" href="/contacto">
            Consultar por Contacto
          </Button>
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
          {/*
            Anotación del diseño (comentario UX/UI, no es copy visible):
            "FAQ específica (RF-06). Respuestas oficiales PENDIENTES." Las respuestas se
            muestran como mensaje de proceso desde la T7.
          */}
          <div className="mt-6">
            <FaqAcordeon items={faqIngresantes} mostrarCategoria={false} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default IngresantesPage;
