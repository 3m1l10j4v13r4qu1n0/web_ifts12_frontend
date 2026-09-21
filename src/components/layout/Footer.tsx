import { Link } from 'react-router-dom';
import { ENLACES } from '../../constants/enlaces';
import { MENU_PRINCIPAL, NAV_FOOTER } from '../../constants/navegacion';

const enlacesExternos = [
  { etiqueta: 'Campus virtual', href: ENLACES.moodle },
  { etiqueta: 'Inscripción', href: ENLACES.inscripcion },
];

function Footer() {
  const hayEnlacesExternos = enlacesExternos.some((enlace) => enlace.href !== '');

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold text-white">IFTS N.º 12</p>
          <p className="mt-2 text-sm">Instituto de Formación Técnica Superior N.º 12.</p>
          <address className="mt-4 not-italic text-sm leading-relaxed">
            Misiones 26, C1083 ABB
            <br />
            Ciudad Autónoma de Buenos Aires
          </address>
          <p className="mt-2 text-sm">Horario de atención: turno nocturno</p>
        </div>

        <nav aria-label="Enlaces institucionales">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Institucional
          </h3>
          <ul className="mt-3 space-y-2">
            {NAV_FOOTER.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="text-sm transition-colors hover:text-white">
                  {item.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Secciones del sitio">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Secciones</h3>
          <ul className="mt-3 space-y-2">
            {MENU_PRINCIPAL.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="text-sm transition-colors hover:text-white">
                  {item.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Conexiones</h3>
          {hayEnlacesExternos ? (
            <ul className="mt-3 space-y-2">
              {enlacesExternos.map((enlace) => (
                <li key={enlace.etiqueta}>
                  <a
                    href={enlace.href}
                    className="text-sm transition-colors hover:text-white"
                    rel="noopener noreferrer"
                  >
                    {enlace.etiqueta}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm">
              Los enlaces oficiales al campus virtual y a la inscripción se publicarán cuando estén
              disponibles.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} IFTS N.º 12 — Instituto de Formación Técnica Superior.
          </p>
          <img
            src="/logoUpcn.png"
            alt="Logo de UPCN, patrocinador del sitio"
            className="h-8 w-auto rounded bg-white px-2 py-1"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
