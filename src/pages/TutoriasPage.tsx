import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import FormularioConsulta from '../components/ui/FormularioConsulta';

function TutoriasPage() {
  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        eyebrow="Acompañamiento"
        seccion="ambar"
        titulo="Tutorías"
        descripcion="Espacio de acompañamiento y orientación para estudiantes que impulsa tu trayectoria en el instituto."
      />

      <div className="mx-auto grid max-w-contenido grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section
            aria-labelledby="titulo-espacio"
            className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
          >
            <h2 id="titulo-espacio" className="text-xl font-semibold text-texto">
              Espacio de tutorías y acompañamiento
            </h2>
            <p className="mt-3 leading-relaxed text-texto-suave">
              Las tutorías acompañan tu recorrido académico: orientación en la organización de la
              cursada, acompañamiento ante dificultades y vínculo con las comunidades del instituto.
            </p>
          </section>

          <section
            aria-labelledby="titulo-funcionamiento"
            className="space-y-3 rounded-xl border border-dashed border-borde bg-white p-6"
          >
            <h2 id="titulo-funcionamiento" className="text-xl font-semibold text-texto">
              Funcionamiento
            </h2>
            <p className="text-texto-suave">
              Días, horarios y modalidad de atención de las tutorías. Se publica cuando el equipo
              confirme el cronograma del ciclo lectivo.
            </p>
            <span className="inline-block rounded-md bg-fondo px-3 py-1 text-xs font-medium uppercase tracking-wide text-texto-suave">
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
