import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import Estado from '../components/ui/Estado';
import { useCarreras } from '../hooks/useCarreras';
import { useNovedades } from '../hooks/useNovedades';
import { buscarContenidoLocal, type ResultadoBusqueda } from '../utils/busqueda';

function BusquedaPage() {
  const [params] = useSearchParams();
  const consulta = params.get('q') ?? '';

  const { carreras } = useCarreras();
  const { novedades } = useNovedades();

  const resultados = useMemo(
    () => buscarContenidoLocal(consulta, { carreras, novedades }),
    [consulta, carreras, novedades],
  );

  // Los resultados se agrupan por tipo (I4): Secciones, Carreras, Novedades, FAQs.
  const grupos = useMemo(() => {
    const mapa = new Map<string, ResultadoBusqueda[]>();
    for (const resultado of resultados) {
      const lista = mapa.get(resultado.categoria) ?? [];
      lista.push(resultado);
      mapa.set(resultado.categoria, lista);
    }
    return [...mapa.entries()];
  }, [resultados]);

  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        eyebrow="Búsqueda"
        seccion="cian"
        titulo={consulta.trim() === '' ? 'Buscá en el sitio' : `Resultados para «${consulta}»`}
        descripcion={
          consulta.trim() === ''
            ? 'Escribí un término en el buscador del encabezado para encontrar carreras, novedades y secciones.'
            : `${resultados.length} resultado(s) encontrado(s).`
        }
      />

      <section className="mx-auto max-w-contenido px-4 py-12">
        {consulta.trim() === '' ? (
          <Estado
            tipo="empty"
            titulo="Ingresá un término de búsqueda"
            mensaje="Podés buscar por carrera, novedad o sección del sitio."
          />
        ) : grupos.length === 0 ? (
          <Estado
            tipo="empty"
            titulo="Sin resultados"
            mensaje={`No encontramos contenido para «${consulta}». Probá con otra palabra.`}
          />
        ) : (
          <div className="space-y-10">
            {grupos.map(([categoria, items]) => (
              <div key={categoria}>
                <h2 className="text-xl font-semibold text-texto">{categoria}</h2>
                <ul className="mt-4 divide-y divide-borde-suave rounded-lg border border-borde-suave bg-white">
                  {items.map((resultado) => (
                    <li key={resultado.id}>
                      <Link
                        to={resultado.href}
                        className="block px-4 py-4 transition-colors hover:bg-fondo"
                      >
                        <span className="text-base font-medium text-texto">{resultado.titulo}</span>
                        <span className="mt-1 block text-sm text-texto-suave">
                          {resultado.descripcion}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default BusquedaPage;
