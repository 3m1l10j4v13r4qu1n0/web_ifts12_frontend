import Portada from '../components/layout/Portada';
import AccesosRapidos from '../components/ui/AccesosRapidos';
import CardCarrera from '../components/ui/CardCarrera';
import Comunidades from '../components/ui/Comunidades';
import FaqAcordeon from '../components/ui/FaqAcordeon';
import SliderNoticias from '../components/ui/SliderNoticias';
import { ENLACES } from '../constants/enlaces';
import {
  mockAccesosRapidos,
  mockCarreras,
  mockComunidades,
  mockFaqs,
  mockNoticias,
} from '../constants/mock-data';

const noticiasOrdenadas = [...mockNoticias].sort((a, b) => {
  if (a.fecha === '' && b.fecha === '') return 0;
  if (a.fecha === '') return 1;
  if (b.fecha === '') return -1;
  return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
});

function HomePage() {
  const accionesPortada: {
    etiqueta: string;
    href: string;
    variante?: 'primario' | 'secundario';
  }[] = [{ etiqueta: 'Ver carreras', href: '/carreras' }];

  if (ENLACES.inscripcion !== '') {
    accionesPortada.push({ etiqueta: 'Inscripción', href: ENLACES.inscripcion });
  }

  return (
    <main>
      <Portada
        titulo="Instituto de Formación Técnica Superior N.º 12"
        subtitulo="Formación técnica superior, pública y de calidad. Contenidos provisorios pendientes de validación."
        acciones={accionesPortada}
      />

      {ENLACES.moodle !== '' && (
        <section
          aria-label="Acceso al campus virtual"
          className="border-y border-slate-200 bg-acento-100"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
            <p className="text-center text-slate-800 sm:text-left">
              Accedé al campus virtual para iniciar o continuar tu cursada.
            </p>
            <a
              href={ENLACES.moodle}
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-acento-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-acento-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento-700"
            >
              Ingresar al campus virtual
            </a>
          </div>
        </section>
      )}

      <section aria-labelledby="titulo-accesos" className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="titulo-accesos" className="text-2xl font-bold text-slate-900">
          Accesos rápidos
        </h2>
        <div className="mt-6">
          <AccesosRapidos items={mockAccesosRapidos} />
        </div>
      </section>

      <section aria-labelledby="titulo-carreras" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 id="titulo-carreras" className="text-2xl font-bold text-slate-900">
            Carreras
          </h2>
          <p className="mt-2 text-slate-600">Conocé la oferta académica del instituto.</p>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockCarreras.map((carrera) => (
              <li key={carrera.id}>
                <CardCarrera carrera={carrera} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="titulo-novedades" className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="titulo-novedades" className="text-2xl font-bold text-slate-900">
          Novedades
        </h2>
        <div className="mt-6">
          <SliderNoticias noticias={noticiasOrdenadas} titulo="Novedades" />
        </div>
      </section>

      <section
        aria-labelledby="titulo-comunidades"
        className="border-y border-slate-200 bg-slate-50"
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 id="titulo-comunidades" className="text-2xl font-bold text-slate-900">
            Comunidades
          </h2>
          <p className="mt-2 text-slate-600">
            Espacios de acompañamiento, recursos y novedades según tu vínculo con el instituto.
          </p>
          <div className="mt-6">
            <Comunidades items={mockComunidades} />
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-faq" className="mx-auto max-w-3xl px-4 py-16">
        <h2 id="titulo-faq" className="text-2xl font-bold text-slate-900">
          Preguntas frecuentes
        </h2>
        <p className="mt-2 text-slate-600">Respuestas sobre ingreso, cursada y trámites.</p>
        <div className="mt-6">
          <FaqAcordeon items={mockFaqs} />
        </div>
      </section>
    </main>
  );
}

export default HomePage;
