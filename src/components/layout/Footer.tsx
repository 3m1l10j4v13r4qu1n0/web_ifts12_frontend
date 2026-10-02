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
  horario: 'Exclusivamente nocturno',
};

function EnlaceColumna({ item }: { item: ItemNavegacion }) {
  if (item.href === '') {
    return (
      <li aria-disabled="true" className="cursor-default text-sm text-slate-500">
        {item.etiqueta}
      </li>
    );
  }

  if (item.href.startsWith('/')) {
    return (
      <li>
        <Link to={item.href} className="text-sm text-slate-300 transition-colors hover:text-white">
          {item.etiqueta}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <a
        href={item.href}
        className="text-sm text-slate-300 transition-colors hover:text-white"
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
      <li aria-disabled="true" className="cursor-default text-sm text-slate-500">
        {acceso.etiqueta}
      </li>
    );
  }

  return (
    <li>
      <a
        href={acceso.href}
        className="text-sm text-slate-300 transition-colors hover:text-white"
        rel="noopener noreferrer"
      >
        {acceso.etiqueta}
      </a>
    </li>
  );
}

const ISOLOGOTIPOS = [
  { src: '/IFTS12.jpg', alt: 'IFTS N.º 12' },
  { src: '/logoCABA.png', alt: 'Gobierno de la Ciudad de Buenos Aires' },
  { src: '/logoUpcn.png', alt: 'UPCN' },
];

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-lg font-semibold text-white">{DATOS_INSTITUCIONALES.nombre}</h2>
            <p className="mt-2 text-sm text-slate-400">{DATOS_INSTITUCIONALES.organismo}</p>
            <address className="mt-4 not-italic">
              <p className="text-sm text-slate-300">{DATOS_INSTITUCIONALES.direccion}</p>
              <p className="text-sm text-slate-300">{DATOS_INSTITUCIONALES.horario}</p>
            </address>
          </div>

          <nav aria-label="Mapa del sitio en el pie">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Mapa del sitio
            </h2>
            <ul className="mt-3 space-y-2">
              {NAV_FOOTER_MAPA.map((item) => (
                <EnlaceColumna key={item.etiqueta} item={item} />
              ))}
            </ul>
          </nav>

          <nav aria-label="Servicios en el pie">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Servicios</h2>
            <ul className="mt-3 space-y-2">
              {NAV_FOOTER_SERVICIOS.map((item) => (
                <EnlaceColumna key={item.etiqueta} item={item} />
              ))}
            </ul>
          </nav>

          <nav aria-label="Plataformas externas en el pie">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Plataformas externas
            </h2>
            <ul className="mt-3 space-y-2">
              {NAV_FOOTER_PLATAFORMAS.map((acceso) => (
                <EnlacePlataforma key={acceso.id} acceso={acceso} />
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-8">
          <FormularioConsulta titulo="¿Tenés dudas? Escribinos" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-slate-800 pt-8">
          {ISOLOGOTIPOS.map((logo) => (
            <img
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              className="h-10 w-auto bg-white/90 p-1"
            />
          ))}
        </div>

        <div className="mt-8 border-t border-slate-800 pt-4 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {DATOS_INSTITUCIONALES.nombre} · Gobierno de la Ciudad de
            Buenos Aires
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Sitio en construcción: los contenidos institucionales se validan con el equipo de UX/UI.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
