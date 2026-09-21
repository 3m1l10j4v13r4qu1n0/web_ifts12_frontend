import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormularioConsultaProps {
  titulo?: string;
}

interface ErroresCampos {
  nombre?: string;
  correo?: string;
  consulta?: string;
}

function FormularioConsulta({
  titulo = 'Formulario de consulta directa',
}: FormularioConsultaProps) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [consulta, setConsulta] = useState('');
  const [errores, setErrores] = useState<ErroresCampos>({});
  const [enviada, setEnviada] = useState(false);

  function validar(): ErroresCampos {
    const campos: ErroresCampos = {};

    if (nombre.trim() === '') {
      campos.nombre = 'Completá tu nombre';
    }
    if (correo.trim() === '') {
      campos.correo = 'Completá tu correo electrónico';
    } else if (!EMAIL_RE.test(correo.trim())) {
      campos.correo = 'Ingresá un correo electrónico válido';
    }
    if (consulta.trim() === '') {
      campos.consulta = 'Escribí tu consulta';
    }

    return campos;
  }

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEnviada(false);

    const camposInvalidos = validar();
    setErrores(camposInvalidos);

    if (Object.keys(camposInvalidos).length === 0) {
      setEnviada(true);
    }
  }

  function limpiar() {
    setNombre('');
    setCorreo('');
    setConsulta('');
    setErrores({});
    setEnviada(false);
  }

  const estadoInput = (invalido: boolean) =>
    invalido
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-slate-300 focus:border-acento-600 focus:ring-acento-600';

  return (
    <section
      aria-label={titulo}
      className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">{titulo}</h3>

      <form onSubmit={enviar} noValidate className="mt-4 space-y-4" aria-live="polite">
        <div>
          <label htmlFor="consulta-nombre" className="block text-sm font-medium text-slate-700">
            Nombre
          </label>
          <input
            id="consulta-nombre"
            type="text"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            aria-invalid={errores.nombre !== undefined}
            className={`mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 ${estadoInput(errores.nombre !== undefined)}`}
          />
          {errores.nombre !== undefined && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errores.nombre}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="consulta-correo" className="block text-sm font-medium text-slate-700">
            Correo electrónico
          </label>
          <input
            id="consulta-correo"
            type="email"
            value={correo}
            onChange={(evento) => setCorreo(evento.target.value)}
            aria-invalid={errores.correo !== undefined}
            className={`mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 ${estadoInput(errores.correo !== undefined)}`}
          />
          {errores.correo !== undefined && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errores.correo}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="consulta-mensaje" className="block text-sm font-medium text-slate-700">
            Consulta
          </label>
          <textarea
            id="consulta-mensaje"
            rows={3}
            value={consulta}
            onChange={(evento) => setConsulta(evento.target.value)}
            aria-invalid={errores.consulta !== undefined}
            className={`mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 ${estadoInput(errores.consulta !== undefined)}`}
          />
          {errores.consulta !== undefined && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errores.consulta}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-acento-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-acento-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento-700"
          >
            Enviar consulta
          </button>
          <button
            type="button"
            onClick={limpiar}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-acento-600 hover:text-acento-700"
          >
            Limpiar
          </button>
        </div>

        {enviada && (
          <p
            role="status"
            className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800"
          >
            Consulta registrada. El envío real estará disponible cuando el backend habilite el canal
            oficial de contacto.
          </p>
        )}
      </form>
    </section>
  );
}

export default FormularioConsulta;
