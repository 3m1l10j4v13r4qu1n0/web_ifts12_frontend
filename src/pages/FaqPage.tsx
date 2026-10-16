import { useMemo, useState } from 'react';
import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import Button from '../components/ui/Button';
import Estado from '../components/ui/Estado';
import FaqAcordeon from '../components/ui/FaqAcordeon';
import { FormField, Input } from '../components/ui/FormField';
import Tabs from '../components/ui/Tabs';
import { mockFaqs } from '../constants/mock-data';

/**
 * Segmentos del export `10 · Preguntas frecuentes (segmentada)`. El diseño muestra tres
 * pestañas (Ingresantes / Estudiantes / Docentes); las FAQ institucionales no tienen pestaña y
 * quedan accesibles solo desde el buscador global del header.
 */
const SEGMENTOS = [
  { id: 'ingresantes', etiqueta: 'Ingresantes' },
  { id: 'estudiantes', etiqueta: 'Estudiantes' },
  { id: 'docentes', etiqueta: 'Docentes' },
] as const;

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function FaqPage() {
  const [segmento, setSegmento] = useState<string>('ingresantes');
  const [consulta, setConsulta] = useState('');

  const faqsDelSegmento = useMemo(
    () => mockFaqs.filter((faq) => faq.categoria === segmento),
    [segmento],
  );

  // Buscador interno: filtra dentro del segmento activo por pregunta o respuesta.
  const faqsFiltradas = useMemo(() => {
    const termino = normalizar(consulta.trim());
    if (termino === '') return faqsDelSegmento;
    return faqsDelSegmento.filter(
      (faq) =>
        normalizar(faq.pregunta).includes(termino) || normalizar(faq.respuesta).includes(termino),
    );
  }, [faqsDelSegmento, consulta]);

  const hayBusqueda = consulta.trim() !== '';

  return (
    <main className="min-h-screen">
      {/*
        Anotación del diseño (no renderizar): la bajada original es "Respuestas por perfil:
        ingresantes, estudiantes y docentes (RF-06 · RF-14 · I3). Accesible desde Home, pie de
        página y cada sección." Las refs y la nota de dónde se enlaza son de UX/UI.
      */}
      <EncabezadoPagina
        breadcrumb={[{ etiqueta: 'Inicio', href: '/' }, { etiqueta: 'Preguntas frecuentes' }]}
        eyebrow="Preguntas frecuentes"
        seccion="ambar"
        titulo="Preguntas frecuentes"
        descripcion="Respuestas por perfil: ingresantes, estudiantes y docentes."
      />

      <section aria-labelledby="titulo-faq" className="mx-auto max-w-3xl px-4 py-12">
        <h2 id="titulo-faq" className="sr-only">
          Listado de preguntas frecuentes
        </h2>

        <Tabs tabs={SEGMENTOS} activa={segmento} onChange={setSegmento} />

        <div className="mt-6">
          <FormField etiqueta="Buscar en preguntas frecuentes" htmlFor="buscar-faq">
            <Input
              id="buscar-faq"
              type="search"
              placeholder="Escribí una palabra clave"
              value={consulta}
              onChange={(evento) => setConsulta(evento.target.value)}
            />
          </FormField>
        </div>

        <div className="mt-6">
          {faqsFiltradas.length > 0 ? (
            <FaqAcordeon items={faqsFiltradas} mostrarCategoria={false} />
          ) : (
            <Estado
              tipo="empty"
              mensaje={
                hayBusqueda
                  ? 'No encontramos preguntas que coincidan con tu búsqueda.'
                  : 'Todavía no hay preguntas en este segmento.'
              }
            />
          )}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-borde-suave bg-fondo p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-texto">¿No encontraste lo que buscabas?</p>
          <Button href="/contacto" variante="primario">
            Ir a Contacto
          </Button>
        </div>
      </section>
    </main>
  );
}

export default FaqPage;
