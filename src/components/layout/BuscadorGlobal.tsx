import { useId, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscarContenidoLocal } from '../../utils/busqueda';

function BuscadorGlobal() {
  const [consulta, setConsulta] = useState('');
  const [abierto, setAbierto] = useState(false);
  const inputId = useId();
  const resultadosId = useId();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navigate = useNavigate();

  const resultados = useMemo(() => buscarContenidoLocal(consulta), [consulta]);
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
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-acento-600 focus:outline-none focus:ring-1 focus:ring-acento-600"
      />

      {mostrarResultados && (
        <div
          id={resultadosId}
          className="absolute right-0 top-full z-50 mt-2 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg"
        >
          {resultados.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-500">Sin resultados para «{consulta}».</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {resultados.map((resultado) => (
                <li key={resultado.id}>
                  <button
                    type="button"
                    onMouseDown={() => navigate(resultado.href)}
                    className="flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors hover:bg-slate-50"
                  >
                    <span className="text-sm font-medium text-slate-900">{resultado.titulo}</span>
                    <span className="text-xs text-slate-500">{resultado.descripcion}</span>
                    <span className="text-xs font-medium uppercase tracking-wide text-acento-700">
                      {resultado.categoria}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}

export default BuscadorGlobal;
