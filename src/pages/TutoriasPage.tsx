import FormularioConsulta from '../components/ui/FormularioConsulta';

function TutoriasPage() {
  return (
    <main className="min-h-screen">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-900">Tutorías</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Espacio de acompañamiento y orientación para estudiantes que impulsa tu trayectoria en
            el instituto.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section
            aria-labelledby="titulo-espacio"
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 id="titulo-espacio" className="text-xl font-semibold text-slate-900">
              Espacio de tutorías y acompañamiento
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Las tutorías acompañan tu recorrido académico: orientación en la organización de la
              cursada, acompañamiento ante dificultades y vínculo con las comunidades del instituto.
            </p>
          </section>

          <section
            aria-labelledby="titulo-funcionamiento"
            className="space-y-3 rounded-xl border border-dashed border-slate-300 bg-white p-6"
          >
            <h2 id="titulo-funcionamiento" className="text-xl font-semibold text-slate-900">
              Funcionamiento
            </h2>
            <p className="text-slate-500">
              Días, horarios y modalidad de atención de las tutorías. Se publica cuando el equipo
              confirme el cronograma del ciclo lectivo.
            </p>
            <span className="inline-block rounded-md bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
              Próximamente
            </span>
          </section>
        </div>

        <aside aria-label="Consultas sobre tutorías" className="space-y-6">
          <FormularioConsulta titulo="Consultá sobre tutorías" />
        </aside>
      </div>
    </main>
  );
}

export default TutoriasPage;
