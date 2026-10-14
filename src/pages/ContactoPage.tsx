import EncabezadoPagina from '../components/layout/EncabezadoPagina';
import FormularioConsulta from '../components/ui/FormularioConsulta';

function ContactoPage() {
  return (
    <main className="min-h-screen">
      <EncabezadoPagina
        eyebrow="Contacto"
        seccion="rojo"
        titulo="Contacto"
        descripcion="Escribinos tu consulta o acercate a la sede del instituto durante el horario de atención."
      />

      <div className="mx-auto grid max-w-contenido grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FormularioConsulta titulo="Formulario de contacto" />
        </div>

        <aside aria-label="Datos institucionales" className="space-y-6">
          <section
            aria-labelledby="titulo-direccion"
            className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
          >
            <h2 id="titulo-direccion" className="text-lg font-semibold text-texto">
              Dirección
            </h2>
            <address className="mt-3 not-italic text-texto-suave">
              Misiones 26, C1083 ABB
              <br />
              Ciudad Autónoma de Buenos Aires, Argentina
            </address>
          </section>

          <section
            aria-labelledby="titulo-horario"
            className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
          >
            <h2 id="titulo-horario" className="text-lg font-semibold text-texto">
              Horario de atención
            </h2>
            <p className="mt-3 text-texto-suave">
              El instituto funciona de manera exclusivamente nocturna. Consultá la disponibilidad
              para trámites administrativos.
            </p>
          </section>

          <section
            aria-labelledby="titulo-correo"
            className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
          >
            <h2 id="titulo-correo" className="text-lg font-semibold text-texto">
              Correo electrónico
            </h2>
            <p className="mt-3 text-texto-suave">
              Próximamente se publicará el correo oficial de contacto del instituto.
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default ContactoPage;
