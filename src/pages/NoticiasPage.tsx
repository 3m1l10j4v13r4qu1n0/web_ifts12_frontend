import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { mapNovedadesApiANoticias } from '../api/mappers/novedad.mapper';
import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import AvisoCarga from '../components/ui/AvisoCarga';
import AvisoError from '../components/ui/AvisoError';
import Button from '../components/ui/Button';
import CardNoticia from '../components/ui/CardNoticia';
import FiltroTag from '../components/ui/FiltroTag';
import { FormField, Input, Select } from '../components/ui/FormField';
import ModuloNoDisponible from '../components/ui/ModuloNoDisponible';
import Paginacion from '../components/ui/Paginacion';
import { useNovedades } from '../hooks/useNovedades';

const NOVEDADES_POR_PAGINA = 6;

/** Nombres de mes para las opciones del filtro (el valor es el `MM` de la fecha ISO). */
const NOMBRES_MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function NoticiasPage() {
  const [consulta, setConsulta] = useState('');
  const [anio, setAnio] = useState('');
  const [mes, setMes] = useState('');
  const [categoria, setCategoria] = useState('');
  const [pagina, setPagina] = useState(1);
  const { novedades, cargando, error, recargar, habilitado } = useNovedades();

  const noticias = useMemo(() => mapNovedadesApiANoticias(novedades), [novedades]);

  // Opciones de Año / Mes / Categoría derivadas de los datos reales del backend. No se
  // inventa el listado: las categorías del export ("Carreras", "Institucional", "Gacetillas",
  // "Docentes") son del wireframe y quedan pendientes de confirmar con Análisis Funcional.
  const anios = useMemo(() => {
    const unicos = new Set<string>();
    for (const noticia of noticias) {
      if (noticia.fecha.length >= 4) unicos.add(noticia.fecha.slice(0, 4));
    }
    return [...unicos].sort((a, b) => b.localeCompare(a));
  }, [noticias]);

  const meses = useMemo(() => {
    const unicos = new Set<string>();
    for (const noticia of noticias) {
      if (noticia.fecha.length >= 7) unicos.add(noticia.fecha.slice(5, 7));
    }
    return [...unicos].sort();
  }, [noticias]);

  const categorias = useMemo(() => {
    const unicas = new Set<string>();
    for (const noticia of noticias) {
      if (noticia.categoria !== undefined && noticia.categoria !== '') {
        unicas.add(noticia.categoria);
      }
    }
    return [...unicas].sort((a, b) => a.localeCompare(b));
  }, [noticias]);

  const noticiasFiltradas = useMemo(() => {
    // El backend ya ordena por `fecha_publicacion DESC` de forma fija (`app.py:81`), pero
    // re-ordenamos igual para no depender de eso: si el backend cambia el orden, la página
    // sigue mostrando reciente→antigua.
    const ordenadas = [...noticias].sort((a, b) => {
      if (a.fecha === '' && b.fecha === '') return 0;
      if (a.fecha === '') return 1;
      if (b.fecha === '') return -1;
      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });

    const termino = normalizar(consulta.trim());
    return ordenadas.filter((noticia) => {
      if (termino !== '' && !normalizar(`${noticia.titulo} ${noticia.resumen}`).includes(termino)) {
        return false;
      }
      if (anio !== '' && noticia.fecha.slice(0, 4) !== anio) return false;
      if (mes !== '' && noticia.fecha.slice(5, 7) !== mes) return false;
      if (categoria !== '' && noticia.categoria !== categoria) return false;
      return true;
    });
  }, [noticias, consulta, anio, mes, categoria]);

  const totalPaginas = Math.max(1, Math.ceil(noticiasFiltradas.length / NOVEDADES_POR_PAGINA));
  // Los filtros se aplican en vivo; por eso si la página actual queda fuera de rango (por
  // ejemplo, al filtrar y reducir los resultados) se ajusta sin quedar en una página vacía.
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = noticiasFiltradas.slice(
    (paginaActual - 1) * NOVEDADES_POR_PAGINA,
    paginaActual * NOVEDADES_POR_PAGINA,
  );

  // `GET /api/novedades` no figura en el apispec: con el módulo apagado se conservan el
  // encabezado y el breadcrumb, y se ocultan filtros, contador, grilla y paginación.
  if (!habilitado) {
    return (
      <main className="min-h-screen">
        <EncabezadoPagina
          breadcrumb={[{ etiqueta: 'Inicio', href: '/' }, { etiqueta: 'Novedades' }]}
          eyebrow="Novedades"
          seccion="naranja"
          titulo="Novedades"
          descripcion="Gacetillas, avisos y comunicaciones del instituto, de la más reciente a la más antigua."
        />
        <div className="mx-auto max-w-contenido px-4 py-12">
          <ModuloNoDisponible
            que="las novedades"
            mensaje="Las novedades se publican cuando el recurso esté disponible en el contrato de API."
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        breadcrumb={[{ etiqueta: 'Inicio', href: '/' }, { etiqueta: 'Novedades' }]}
        eyebrow="Novedades"
        seccion="naranja"
        titulo="Novedades"
        descripcion="Gacetillas, avisos y comunicaciones del instituto, de la más reciente a la más antigua."
      />

      <div className="mx-auto max-w-contenido px-4 py-12">
        {/*
          Barra de filtros del diseño: "Buscar en novedades" + Año + Mes + "Filtrar". Los
          filtros se aplican en vivo (se mantiene la búsqueda actual, que ya era en vivo);
          "Filtrar" vuelve a la primera página, que es su único efecto con el filtrado en vivo.
        */}
        <form
          className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto] md:items-end"
          onSubmit={(evento) => {
            evento.preventDefault();
            setPagina(1);
          }}
        >
          <FormField etiqueta="Buscar en novedades" htmlFor="buscador-noticias">
            <Input
              id="buscador-noticias"
              type="search"
              value={consulta}
              onChange={(evento) => setConsulta(evento.target.value)}
              placeholder="Palabra clave"
            />
          </FormField>

          <FormField etiqueta="Año" htmlFor="filtro-anio">
            <Select
              id="filtro-anio"
              value={anio}
              onChange={(evento) => setAnio(evento.target.value)}
            >
              <option value="">Todos</option>
              {anios.map((valor) => (
                <option key={valor} value={valor}>
                  {valor}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField etiqueta="Mes" htmlFor="filtro-mes">
            <Select id="filtro-mes" value={mes} onChange={(evento) => setMes(evento.target.value)}>
              <option value="">Todos</option>
              {meses.map((valor) => (
                <option key={valor} value={valor}>
                  {NOMBRES_MESES[Number(valor) - 1]}
                </option>
              ))}
            </Select>
          </FormField>

          <Button type="submit" variante="primario">
            Filtrar
          </Button>
        </form>

        <fieldset className="mt-6 flex flex-wrap items-center gap-2">
          <legend className="sr-only">Categoría</legend>
          <span aria-hidden="true" className="text-sm font-medium text-texto">
            Categoría:
          </span>
          <FiltroTag activo={categoria === ''} onClick={() => setCategoria('')}>
            Todas
          </FiltroTag>
          {categorias.map((valor) => (
            <FiltroTag key={valor} activo={categoria === valor} onClick={() => setCategoria(valor)}>
              {valor}
            </FiltroTag>
          ))}
        </fieldset>

        {cargando ? (
          <AvisoCarga que="las novedades" />
        ) : error !== null ? (
          <AvisoError que="las novedades" mensaje={error} alReintentar={recargar} />
        ) : (
          <section className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-2xl font-semibold text-texto">Publicaciones</h2>
              <p className="text-sm text-texto-suave">
                {visibles.length} de {noticiasFiltradas.length} resultados · orden: más reciente
                primero.
              </p>
            </div>

            {noticiasFiltradas.length === 0 ? (
              <p className="mt-6 rounded-xl border border-borde-suave bg-white p-6 text-texto-suave">
                {consulta === '' && anio === '' && mes === '' && categoria === ''
                  ? 'Todavía no hay novedades publicadas.'
                  : 'No se encontraron novedades con esos filtros. Probá con otros criterios.'}
              </p>
            ) : (
              <>
                <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {visibles.map((noticia) => (
                    <li key={noticia.id}>
                      <Link
                        to={`/noticias/${noticia.id}`}
                        className="block h-full rounded-xl transition-transform hover:-translate-y-0.5"
                      >
                        <CardNoticia noticia={noticia} />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Paginacion pagina={paginaActual} total={totalPaginas} onChange={setPagina} />
                </div>
              </>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default NoticiasPage;
