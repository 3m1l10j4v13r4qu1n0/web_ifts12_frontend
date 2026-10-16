import { useId, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarreras } from '../../hooks/useCarreras';
import { useNovedades } from '../../hooks/useNovedades';
import { buscarContenidoLocal } from '../../utils/busqueda';

/** El desplegable del header muestra un máximo de sugerencias; la página `/buscar` no limita. */
const SUGERENCIAS_MAX = 8;

function BuscadorGlobal() {
  const [consulta, setConsulta] = useState('');
  const [abierto, setAbierto] = useState(false);
  const inputId = useId();
  const resultadosId = useId();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navigate = useNavigate();

  // El buscador indexa lo mismo que muestran las páginas: si siguiera sobre los mocks,
  // ofrecería "Gestión Parlamentaria" con un enlace que ya no existe en el sitio.
  const { carreras } = useCarreras();
  const { novedades } = useNovedades();

  const resultados = useMemo(
    () => buscarContenidoLocal(consulta, { carreras, novedades }).slice(0, SUGERENCIAS_MAX),
    [consulta, carreras, novedades],
  );
  const mostrarResultados = abierto && consulta.trim() !== '';

  const abrir = () => {
    setAbierto(true);
  };

  const cerrarConRetraso = () => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setAbierto(false), 150);
  };

  const irAPrimerResultado = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (resultados.length > 0) {
      navigate(resultados[0].href);
      setAbierto(false);
    }
  };

  return (
    <form onSubmit={irAPrimerResultado} className="relative">
      <label htmlFor={inputId} className="sr-only">
        Buscar en el sitio
      </label>
      <input
        id={inputId}
        type="search"
        role="combobox"
        autoComplete="off"
        placeholder="Buscar carreras, novedades, secciones…"
        value={consulta}
        onChange={(evento) => {
          setConsulta(evento.target.value);
          abrir();
        }}
        onFocus={abrir}
        onBlur={cerrarConRetraso}
        aria-expanded={mostrarResultados}
        aria-autocomplete="list"
        aria-controls={mostrarResultados ? resultadosId : undefined}
        className="w-full rounded-lg border border-borde bg-white px-3 py-2 text-sm text-texto placeholder:text-texto-suave focus:border-acento-600 focus:outline-none focus:ring-1 focus:ring-acento-600"
      />

      {mostrarResultados && (
        <div
          id={resultadosId}
          className="absolute right-0 top-full z-50 mt-2 w-full overflow-hidden rounded-lg border border-borde-suave bg-white shadow-elevada"
        >
          {resultados.length === 0 ? (
            <p className="px-4 py-3 text-sm text-texto-suave">Sin resultados para «{consulta}».</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {resultados.map((resultado) => (
                <li key={resultado.id}>
                  <button
                    type="button"
                    onMouseDown={() => navigate(resultado.href)}
                    className="flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors hover:bg-fondo"
                  >
                    <span className="text-sm font-medium text-texto">{resultado.titulo}</span>
                    <span className="text-xs text-texto-suave">{resultado.descripcion}</span>
                    {resultado.seccion !== resultado.titulo && (
                      <span className="text-xs font-medium uppercase tracking-wide text-acento-700">
                        {resultado.seccion}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <Link
            to={`/buscar?q=${encodeURIComponent(consulta)}`}
            onMouseDown={() => setAbierto(false)}
            className="block border-t border-borde-suave px-4 py-3 text-center text-sm font-medium text-acento-700 transition-colors hover:bg-fondo"
          >
            Ver todos los resultados
          </Link>
        </div>
      )}
    </form>
  );
}

export default BuscadorGlobal;
