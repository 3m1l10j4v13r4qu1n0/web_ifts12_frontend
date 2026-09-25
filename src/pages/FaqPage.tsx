import { Link } from 'react-router-dom';
import FaqAcordeon from '../components/ui/FaqAcordeon';
import { mockFaqs } from '../constants/mock-data';

function FaqPage() {
  return (
    <main className="min-h-screen">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-900">Preguntas frecuentes</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Respuestas sobre ingreso, cursada, trámites e información institucional.
          </p>
        </div>
      </div>

      <section aria-labelledby="titulo-faq" className="mx-auto max-w-3xl px-4 py-12">
        <h2 id="titulo-faq" className="sr-only">
          Listado de preguntas frecuentes
        </h2>
        <FaqAcordeon items={mockFaqs} />

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm text-slate-600">
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
