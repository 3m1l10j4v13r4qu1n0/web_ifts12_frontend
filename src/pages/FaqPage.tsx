import { useState } from 'react';
import { Link } from 'react-router-dom';
import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import Estado from '../components/ui/Estado';
import FaqAcordeon from '../components/ui/FaqAcordeon';
import Tabs from '../components/ui/Tabs';
import { mockFaqs } from '../constants/mock-data';
import type { FaqCategoria } from '../types/domain/sitio.types';

const ETIQUETAS: Record<FaqCategoria, string> = {
  ingresantes: 'Ingresantes',
  estudiantes: 'Estudiantes',
  docentes: 'Docentes',
  institucional: 'Institucional',
};

const TABS = [
  { id: 'todas', etiqueta: 'Todas' },
  ...(Object.keys(ETIQUETAS) as FaqCategoria[]).map((categoria) => ({
    id: categoria,
    etiqueta: ETIQUETAS[categoria],
  })),
];

function FaqPage() {
  const [categoria, setCategoria] = useState('todas');

  const faqs = categoria === 'todas' ? mockFaqs : mockFaqs.filter((f) => f.categoria === categoria);

  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        eyebrow="Preguntas frecuentes"
        seccion="ambar"
        titulo="Preguntas frecuentes"
        descripcion="Respuestas sobre ingreso, cursada, trámites e información institucional."
      />

      <section aria-labelledby="titulo-faq" className="mx-auto max-w-3xl px-4 py-12">
        <h2 id="titulo-faq" className="sr-only">
          Listado de preguntas frecuentes
        </h2>

        <Tabs tabs={TABS} activa={categoria} onChange={setCategoria} />

        <div className="mt-6">
          {faqs.length > 0 ? (
            <FaqAcordeon items={faqs} />
          ) : (
            <Estado tipo="empty" mensaje="Todavía no hay preguntas en esta categoría." />
          )}
        </div>

        <div className="mt-8 rounded-xl border border-borde-suave bg-fondo p-6">
          <p className="text-sm text-texto-suave">
            ¿No encontraste tu respuesta? Escribinos a través del formulario de contacto.
          </p>
          <Link
            to="/contacto"
            className="mt-3 inline-block text-sm font-medium text-acento-700 hover:text-acento-800"
          >
            Ir a la sección de contacto →
          </Link>
        </div>
      </section>
    </main>
  );
}

export default FaqPage;
