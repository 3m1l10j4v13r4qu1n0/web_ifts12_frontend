import { Link } from 'react-router-dom';
import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import { ENLACES } from '../constants/enlaces';

const SECCIONES_INSTITUCIONAL = [
  {
    id: 'historia',
    titulo: 'Historia del instituto',
    descripcion:
      'Trayectoria, hitos y datos institucionales. El recorrido histórico se publica cuando el equipo valide el contenido oficial.',
  },
  {
    id: 'mision-vision',
    titulo: 'Misión y visión',
    descripcion:
      'Propósitos formativos del instituto en el marco del sistema de educación superior de la Ciudad.',
  },
  {
    id: 'bedelia',
    titulo: 'Bedelía',
    descripcion:
      'Información y vías de contacto con el personal de bedelía durante el horario de atención.',
  },
  {
    id: 'reglamento',
    titulo: 'Reglamento orgánico',
    descripcion:
      'Normativa que organiza la vida institucional. La versión completa se publica como documento adjunto.',
  },
  {
    id: 'convivencia',
    titulo: 'Código de convivencia',
    descripcion: 'Acuerdos de convivencia vigentes para estudiantes y docentes del instituto.',
  },
];

const ENLACES_INSTITUCIONALES = [
  { id: 'ciudad-bilingue', etiqueta: 'Ciudad Bilingüe', href: '' },
  { id: 'centro-simulacion', etiqueta: 'Centro de Simulación', href: '' },
];

const ISOLOGOTIPOS = [
  { src: '/IFTS12.jpg', alt: 'IFTS N.º 12' },
  { src: '/logoCABA.png', alt: 'Gobierno de la Ciudad de Buenos Aires' },
  { src: '/logoUpcn.png', alt: 'UPCN' },
];

function InstitucionalPage() {
  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        eyebrow="El instituto"
        seccion="rojo"
        titulo="Institucional"
        descripcion="Conocé el instituto: su historia, autoridades, normativa y los programas institucionales de la Ciudad."
      />

      <div className="mx-auto grid max-w-contenido grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section aria-labelledby="titulo-institucion">
            <h2 id="titulo-institucion" className="text-2xl font-bold text-texto">
              El instituto
            </h2>
            <div className="mt-4 space-y-4">
              {SECCIONES_INSTITUCIONAL.map((seccion) => (
                <article
                  key={seccion.id}
                  className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
                >
                  <h3 className="text-base font-semibold text-texto">{seccion.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-texto-suave">
                    {seccion.descripcion}
                  </p>
                  <span className="mt-3 inline-block rounded-md bg-fondo px-3 py-1 text-xs font-medium uppercase tracking-wide text-texto-suave">
                    Próximamente
                  </span>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside aria-label="Enlaces institucionales" className="space-y-6">
          <section
            aria-labelledby="titulo-enlaces"
            className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
          >
            <h2 id="titulo-enlaces" className="text-lg font-semibold text-texto">
              Enlaces de interés
            </h2>
            <ul className="mt-4 space-y-2">
              {ENLACES_INSTITUCIONALES.map((enlace) =>
                enlace.href === '' ? (
                  <li
                    key={enlace.id}
                    aria-disabled="true"
                    className="cursor-default rounded-lg border border-borde-suave px-3 py-2 text-sm text-texto-suave"
                  >
                    {enlace.etiqueta} · próximamente
                  </li>
                ) : (
                  <li key={enlace.id}>
                    <a
                      href={enlace.href}
                      className="block rounded-lg px-3 py-2 text-sm text-acento-700 transition-colors hover:bg-fondo"
                      rel="noopener noreferrer"
                    >
                      {enlace.etiqueta} →
                    </a>
                  </li>
                ),
              )}
              <li>
                {ENLACES.inscripcion === '' ? (
                  <span className="block cursor-default rounded-lg border border-borde-suave px-3 py-2 text-sm text-texto-suave">
                    Inscripciones GCBA · próximamente
                  </span>
                ) : (
                  <a
                    href={ENLACES.inscripcion}
                    className="block rounded-lg px-3 py-2 text-sm text-acento-700 transition-colors hover:bg-fondo"
                    rel="noopener noreferrer"
                  >
                    Inscripciones GCBA →
                  </a>
                )}
              </li>
            </ul>
          </section>

          <section
            aria-labelledby="titulo-isologotipos"
            className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
          >
            <h2 id="titulo-isologotipos" className="text-lg font-semibold text-texto">
              Isologotipos
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {ISOLOGOTIPOS.map((logo) => (
                <img
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto bg-fondo p-1"
                />
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave">
            <h2 className="text-lg font-semibold text-texto">¿Necesitás más información?</h2>
            <Link
              to="/contacto"
              className="mt-3 inline-block text-sm font-medium text-acento-700 hover:text-acento-800"
            >
              Ir a la sección de contacto →
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default InstitucionalPage;
