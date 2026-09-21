import FormularioConsulta from '../components/ui/FormularioConsulta';

function ContactoPage() {
  return (
    <main className="min-h-screen">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-900">Contacto</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Escribinos tu consulta o acercate a la sede del instituto durante el horario de
            atención.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FormularioConsulta titulo="Formulario de contacto" />
        </div>

        <aside aria-label="Datos institucionales" className="space-y-6">
          <section
            aria-labelledby="titulo-direccion"
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 id="titulo-direccion" className="text-lg font-semibold text-slate-900">
              Dirección
            </h2>
            <address className="mt-3 not-italic text-slate-600">
              Misiones 26, C1083 ABB
              <br />
              Ciudad Autónoma de Buenos Aires, Argentina
            </address>
          </section>

          <section
            aria-labelledby="titulo-horario"
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 id="titulo-horario" className="text-lg font-semibold text-slate-900">
              Horario de atención
            </h2>
            <p className="mt-3 text-slate-600">
              El instituto funciona de manera exclusivamente nocturna. Consultá la disponibilidad
              para trámites administrativos.
            </p>
          </section>

          <section
            aria-labelledby="titulo-correo"
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 id="titulo-correo" className="text-lg font-semibold text-slate-900">
              Correo electrónico
            </h2>
            <p className="mt-3 text-slate-500">
              Próximamente se publicará el correo oficial de contacto del instituto.
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default ContactoPage;
