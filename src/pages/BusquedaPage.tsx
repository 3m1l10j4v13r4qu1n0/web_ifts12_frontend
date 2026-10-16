import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import Button from '../components/ui/Button';
import Estado from '../components/ui/Estado';
import FiltroTag from '../components/ui/FiltroTag';
import { Input } from '../components/ui/FormField';
import Paginacion from '../components/ui/Paginacion';
import { useCarreras } from '../hooks/useCarreras';
import { useNovedades } from '../hooks/useNovedades';
import { buscarContenidoLocal } from '../utils/busqueda';

/** Resultados por página de la lista (el export muestra 4 tarjetas y paginación). */
const RESULTADOS_POR_PAGINA = 4;

/**
 * Orden de los chips "Secciones" según el export `11 · Resultados de búsqueda`. Los chips se
 * arman con las secciones presentes en los resultados de la consulta: el alcance buscable
 * todavía no está confirmado con Análisis (I4), así que no se ofrecen filtros que no devolverían
 * nada. Las secciones fuera de este orden van después, alfabéticas.
 */
const ORDEN_SECCIONES_DISENO = ['Carreras', 'Institucional', 'Novedades', 'Normativa'];

/** Accesos directos del estado sin resultados (`11b`). */
const ACCESOS_SIN_RESULTADOS = [
  { etiqueta: 'Carreras', href: '/carreras' },
  { etiqueta: 'Ingresantes', href: '/ingresantes' },
  { etiqueta: 'Estudiantes', href: '/estudiantes' },
  { etiqueta: 'Preguntas frecuentes', href: '/faq' },
  { etiqueta: 'Contacto', href: '/contacto' },
];

function ordenarSecciones(secciones: string[]): string[] {
  return [...secciones].sort((a, b) => {
    const ia = ORDEN_SECCIONES_DISENO.indexOf(a);
    const ib = ORDEN_SECCIONES_DISENO.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });
}

function BusquedaPage() {
  const [params, setParams] = useSearchParams();
  const consulta = params.get('q') ?? '';

  const [borrador, setBorrador] = useState(consulta);
  const [seccionActiva, setSeccionActiva] = useState('todo');
  const [pagina, setPagina] = useState(1);

  const { carreras } = useCarreras();
  const { novedades } = useNovedades();

  // Al cambiar la consulta (incluido el enlace del header) se resincroniza el buscador y se
  // vuelven a cero los filtros: son de la consulta anterior.
  useEffect(() => {
    setBorrador(consulta);
    setSeccionActiva('todo');
    setPagina(1);
  }, [consulta]);

  const resultados = useMemo(
    () => buscarContenidoLocal(consulta, { carreras, novedades }),
    [consulta, carreras, novedades],
  );

  const secciones = useMemo(
    () => ordenarSecciones([...new Set(resultados.map((resultado) => resultado.seccion))]),
    [resultados],
  );

  const filtrados = useMemo(
    () =>
      seccionActiva === 'todo'
        ? resultados
        : resultados.filter((resultado) => resultado.seccion === seccionActiva),
    [resultados, seccionActiva],
  );

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / RESULTADOS_POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = filtrados.slice(
    (paginaActual - 1) * RESULTADOS_POR_PAGINA,
    paginaActual * RESULTADOS_POR_PAGINA,
  );

  // Se agrupa por sección conservando el orden de aparición de los resultados.
  const grupos = useMemo(() => {
    const mapa = new Map<string, typeof visibles>();
    for (const resultado of visibles) {
      const lista = mapa.get(resultado.seccion) ?? [];
      lista.push(resultado);
      mapa.set(resultado.seccion, lista);
    }
    return [...mapa.entries()];
  }, [visibles]);

  const hayConsulta = consulta.trim() !== '';
  const hayResultados = resultados.length > 0;
  const resumen = `${filtrados.length} ${
    filtrados.length === 1 ? 'resultado' : 'resultados'
  } para «${consulta}» · criterio: títulos y metadatos.`;

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const termino = borrador.trim();
    setParams(termino === '' ? {} : { q: termino });
  };

  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        breadcrumb={[{ etiqueta: 'Inicio', href: '/' }, { etiqueta: 'Resultados de búsqueda' }]}
        eyebrow="Búsqueda"
        seccion="cian"
        titulo="Resultados de búsqueda"
      />

      <section className="mx-auto max-w-contenido px-4 py-12">
        <form
          onSubmit={buscar}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end"
        >
          <label htmlFor="buscar-sitio" className="sr-only">
            Buscar en el sitio
          </label>
          <Input
            id="buscar-sitio"
            type="search"
            value={borrador}
            onChange={(evento) => setBorrador(evento.target.value)}
            placeholder="Buscar en el sitio"
            className="sm:max-w-sm"
          />
          <Button type="submit" variante="primario">
            Buscar
          </Button>
        </form>

        {!hayConsulta ? (
          <div className="mt-10">
            <Estado
              tipo="empty"
              titulo="Ingresá un término de búsqueda"
              mensaje="Podés buscar por carrera, novedad o sección del sitio."
            />
          </div>
        ) : (
          <div className="mt-10">
            {hayResultados && (
              <fieldset className="flex flex-wrap items-center gap-2">
                <legend className="sr-only">Secciones</legend>
                <span aria-hidden="true" className="text-sm font-medium text-texto">
                  Secciones:
                </span>
                <FiltroTag
                  activo={seccionActiva === 'todo'}
                  onClick={() => {
                    setSeccionActiva('todo');
                    setPagina(1);
                  }}
                >
                  Todo el sitio
                </FiltroTag>
                {secciones.map((seccion) => (
                  <FiltroTag
                    key={seccion}
                    activo={seccionActiva === seccion}
                    onClick={() => {
                      setSeccionActiva(seccion);
                      setPagina(1);
                    }}
                  >
                    {seccion}
                  </FiltroTag>
                ))}
              </fieldset>
            )}

            {filtrados.length > 0 ? (
              <>
                {/*
                  Anotación del diseño (no renderizar): "criterio: títulos y metadatos (alcance y
                  datos buscables a confirmar con Análisis · I4)". El criterio se mantiene; la
                  nota de alcance pendiente es de UX/UI.
                */}
                <p className="mt-6 text-sm text-texto-suave">{resumen}</p>

                <div className="mt-8 space-y-10">
                  {grupos.map(([seccion, items]) => (
                    <div key={seccion}>
                      <h2 className="text-xl font-semibold text-texto">{seccion}</h2>
                      <ul className="mt-4 divide-y divide-borde-suave rounded-lg border border-borde-suave bg-white">
                        {items.map((resultado) => (
                          <li key={resultado.id}>
                            <Link
                              to={resultado.href}
                              className="block px-4 py-4 transition-colors hover:bg-fondo"
                            >
                              <span className="text-base font-medium text-texto">
                                {resultado.titulo}
                              </span>
                              {resultado.descripcion !== '' && (
                                <span className="mt-1 block text-sm text-texto-suave">
                                  {resultado.descripcion}
                                </span>
                              )}
                              <span className="mt-2 block text-xs text-texto-suave">
                                {resultado.contexto.join(' › ')}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Paginacion pagina={paginaActual} total={totalPaginas} onChange={setPagina} />
                </div>
              </>
            ) : (
              <div className="mt-8">
                <Estado
                  tipo="empty"
                  titulo={`Sin resultados para «${consulta}»`}
                  mensaje="Revisá la ortografía, probá con otra palabra o navegá por las secciones."
                  accion={
                    <Button
                      variante="secundario"
                      onClick={() => (hayResultados ? setSeccionActiva('todo') : setParams({}))}
                    >
                      Limpiar filtros
                    </Button>
                  }
                />
                <nav
                  aria-label="Secciones sugeridas"
                  className="mt-6 flex flex-wrap justify-center gap-2"
                >
                  {ACCESOS_SIN_RESULTADOS.map((acceso) => (
                    <Link
                      key={acceso.href}
                      to={acceso.href}
                      className="rounded-full border border-borde bg-white px-4 py-2 text-sm font-medium text-acento-700 transition-colors hover:border-acento-600"
                    >
                      {acceso.etiqueta}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default BusquedaPage;
