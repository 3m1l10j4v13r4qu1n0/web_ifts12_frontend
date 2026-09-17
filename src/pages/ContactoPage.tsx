function ContactoPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Contacto</h1>

      <section aria-labelledby="contacto-direccion" className="mt-10">
        <h2 id="contacto-direccion" className="text-xl font-semibold text-slate-800">
          Dirección
        </h2>
        <address className="mt-4 not-italic text-slate-600 leading-relaxed">
          Misiones 26, C1083 ABB
          <br />
          Ciudad Autónoma de Buenos Aires, Argentina
        </address>
      </section>

      <section aria-labelledby="contacto-horario" className="mt-8">
        <h2 id="contacto-horario" className="text-xl font-semibold text-slate-800">
          Horario de atención
        </h2>
        <p className="mt-4 text-slate-600">
          Atención en turno nocturno. Consultar disponibilidad para trámites administrativos.
        </p>
      </section>

      <section aria-labelledby="contacto-correo" className="mt-8">
        <h2 id="contacto-correo" className="text-xl font-semibold text-slate-800">
          Correo electrónico
        </h2>
        <p className="mt-4 text-slate-500">
          Próximamente se publicará el correo oficial de contacto del instituto.
        </p>
      </section>
    </main>
  );
}

export default ContactoPage;
