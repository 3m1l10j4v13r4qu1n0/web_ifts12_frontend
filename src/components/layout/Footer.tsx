import { Link } from 'react-router-dom';
import {
  type AccesoExterno,
  type ItemNavegacion,
  NAV_FOOTER_MAPA,
  NAV_FOOTER_PLATAFORMAS,
  NAV_FOOTER_SERVICIOS,
} from '../../constants/navegacion';
import FormularioConsulta from '../ui/FormularioConsulta';

const DATOS_INSTITUCIONALES = {
  nombre: 'IFTS N.º 12',
  organismo: 'Instituto de Formación Técnica Superior N.º 12 · Ministerio de Educación · GCBA',
  direccion: 'Misiones 26, C1083 ABB, CABA',
  horario: 'Exclusivamente nocturno · Presencial, Híbrida y a distancia',
};

function EnlaceColumna({ item }: { item: ItemNavegacion }) {
  if (item.href === '') {
    return (
      <li aria-disabled="true" className="cursor-default text-sm text-slate-600">
        {item.etiqueta}
      </li>
    );
  }

  if (item.href.startsWith('/')) {
    return (
      <li>
        <Link
          to={item.href}
          className="text-sm text-slate-700 transition-colors hover:text-acento-700"
        >
          {item.etiqueta}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <a
        href={item.href}
        className="text-sm text-slate-700 transition-colors hover:text-acento-700"
        rel="noopener noreferrer"
      >
        {item.etiqueta}
      </a>
    </li>
  );
}

function EnlacePlataforma({ acceso }: { acceso: AccesoExterno }) {
  if (acceso.href === '') {
    return (
      <li aria-disabled="true" className="cursor-default text-sm text-slate-600">
        {acceso.etiqueta}
      </li>
    );
  }

  return (
    <li>
      <a
        href={acceso.href}
        className="text-sm text-slate-700 transition-colors hover:text-acento-700"
        rel="noopener noreferrer"
      >
        {acceso.etiqueta}
      </a>
    </li>
  );
}

const ISOLOGOTIPOS = [
  { src: '/logoCABA.png', alt: 'Gobierno de la Ciudad de Buenos Aires' },
  { src: '/IFTS12.jpg', alt: 'IFTS N.º 12' },
  { src: '/logoUpcn-oficial.png', alt: 'UPCN' },
];

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700">
      <div className="mx-auto max-w-contenido px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{DATOS_INSTITUCIONALES.nombre}</h2>
            <p className="mt-2 text-sm text-slate-600">{DATOS_INSTITUCIONALES.organismo}</p>
            <address className="mt-4 not-italic">
              <p className="text-sm text-slate-700">{DATOS_INSTITUCIONALES.direccion}</p>
              <p className="text-sm text-slate-700">{DATOS_INSTITUCIONALES.horario}</p>
            </address>
          </div>

          <nav aria-label="Mapa del sitio en el pie">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Mapa del sitio
            </h2>
            <ul className="mt-3 space-y-2">
              {NAV_FOOTER_MAPA.map((item) => (
                <EnlaceColumna key={item.etiqueta} item={item} />
              ))}
            </ul>
          </nav>

          <nav aria-label="Servicios en el pie">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Servicios
            </h2>
            <ul className="mt-3 space-y-2">
              {NAV_FOOTER_SERVICIOS.map((item) => (
                <EnlaceColumna key={item.etiqueta} item={item} />
              ))}
            </ul>
          </nav>

          <nav aria-label="Plataformas externas en el pie">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Plataformas externas
            </h2>
            <ul className="mt-3 space-y-2">
              {NAV_FOOTER_PLATAFORMAS.map((acceso) => (
                <EnlacePlataforma key={acceso.id} acceso={acceso} />
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8">
          <FormularioConsulta titulo="¿Tenés dudas? Escribinos" />
        </div>

        <section
          aria-label="Identidad institucional"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 border-t border-slate-200 py-8"
        >
          {ISOLOGOTIPOS.map((logo) => (
            <img
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              className={
                logo.alt === 'UPCN'
                  ? 'h-auto w-56 max-w-full object-contain'
                  : 'h-20 w-24 object-contain sm:h-24 sm:w-28'
              }
              loading="lazy"
            />
          ))}
        </section>

        <div className="mt-8 border-t border-slate-200 pt-4 text-center">
          {/* Acceso temporal solicitado por el profesor; se oculta desde la configuración del build. */}
          {import.meta.env.VITE_MOSTRAR_ACCESO_ADMIN === 'true' && (
            <Link
              to="/admin/login"
              className="mb-4 inline-flex min-h-11 items-center rounded-md border border-slate-300 px-4 text-xs text-slate-600 transition-colors hover:border-acento-600 hover:text-acento-700"
            >
              Administración
            </Link>
          )}
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} {DATOS_INSTITUCIONALES.nombre} · Gobierno de la Ciudad de
            Buenos Aires
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Sitio en construcción: los contenidos institucionales se validan con el equipo de UX/UI.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
