import { useState } from 'react';
import Checkbox from './Checkbox';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Asuntos del select del formulario de Contacto (export `09 · Contacto`). El diseño trae
 * "Seleccionar asunto" como placeholder y la bajada de la página menciona consultas
 * generales, de ingreso y de tutorías (mismo criterio que el CTA de Tutorías, T12).
 */
const ASUNTOS = ['Consulta general', 'Ingreso', 'Tutorías'];

interface FormularioConsultaProps {
  titulo?: string;
  /** Ayuda visible bajo el título (ej. "Campos obligatorios marcados con *."). */
  ayuda?: string;
  /** Agrega el campo obligatorio Asunto (solo en `/contacto`, diseño `09 · Contacto`). */
  conAsunto?: boolean;
  /** Agrega el checkbox obligatorio de política de privacidad (solo en `/contacto`). */
  conPrivacidad?: boolean;
  /** Etiqueta del textarea: "Consulta" (consulta directa) o "Mensaje" (Contacto). */
  etiquetaMensaje?: string;
}

interface ErroresCampos {
  nombre?: string;
  correo?: string;
  asunto?: string;
  consulta?: string;
  privacidad?: string;
}

function FormularioConsulta({
  titulo = 'Formulario de consulta directa',
  ayuda,
  conAsunto = false,
  conPrivacidad = false,
  etiquetaMensaje = 'Consulta',
}: FormularioConsultaProps) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [consulta, setConsulta] = useState('');
  const [privacidad, setPrivacidad] = useState(false);
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
    if (conAsunto && asunto === '') {
      campos.asunto = 'Seleccioná un asunto';
    }
    if (consulta.trim() === '') {
      campos.consulta = `Escribí tu ${etiquetaMensaje.toLowerCase()}`;
    }
    if (conPrivacidad && !privacidad) {
      campos.privacidad = 'Aceptá la política de privacidad';
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
    setAsunto('');
    setConsulta('');
    setPrivacidad(false);
    setErrores({});
    setEnviada(false);
  }

  const estadoInput = (invalido: boolean) =>
    invalido
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-borde focus:border-acento-600 focus:ring-acento-600';

  const claseControl = (invalido: boolean) =>
    `mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-texto placeholder:text-texto-suave focus:outline-none focus:ring-1 ${estadoInput(invalido)}`;

  return (
    <section
      aria-label={titulo}
      className="w-full rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
    >
      <h3 className="text-sm font-semibold uppercase tracking-wide text-texto">{titulo}</h3>
      {ayuda !== undefined && <p className="mt-1 text-sm text-texto-suave">{ayuda}</p>}

      <form onSubmit={enviar} noValidate className="mt-4 space-y-4" aria-live="polite">
        <div>
          <label htmlFor="consulta-nombre" className="block text-sm font-medium text-texto">
            Nombre y apellido
          </label>
          <input
            id="consulta-nombre"
            type="text"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            aria-invalid={errores.nombre !== undefined}
            className={claseControl(errores.nombre !== undefined)}
          />
          {errores.nombre !== undefined && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errores.nombre}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="consulta-correo" className="block text-sm font-medium text-texto">
            Correo electrónico
          </label>
          <input
            id="consulta-correo"
            type="email"
            value={correo}
            onChange={(evento) => setCorreo(evento.target.value)}
            aria-invalid={errores.correo !== undefined}
            className={claseControl(errores.correo !== undefined)}
          />
          {errores.correo !== undefined && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errores.correo}
            </p>
          )}
        </div>

        {conAsunto && (
          <div>
            <label htmlFor="consulta-asunto" className="block text-sm font-medium text-texto">
              Asunto
            </label>
            <select
              id="consulta-asunto"
              value={asunto}
              onChange={(evento) => setAsunto(evento.target.value)}
              aria-invalid={errores.asunto !== undefined}
              className={claseControl(errores.asunto !== undefined)}
            >
              <option value="">Seleccionar asunto</option>
              {ASUNTOS.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
            {errores.asunto !== undefined && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errores.asunto}
              </p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="consulta-mensaje" className="block text-sm font-medium text-texto">
            {etiquetaMensaje}
          </label>
          <textarea
            id="consulta-mensaje"
            rows={3}
            value={consulta}
            onChange={(evento) => setConsulta(evento.target.value)}
            aria-invalid={errores.consulta !== undefined}
            className={claseControl(errores.consulta !== undefined)}
          />
          {errores.consulta !== undefined && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errores.consulta}
            </p>
          )}
        </div>

        {conPrivacidad && (
          <div>
            <Checkbox
              id="consulta-privacidad"
              checked={privacidad}
              onChange={(evento) => setPrivacidad(evento.target.checked)}
              aria-invalid={errores.privacidad !== undefined}
            >
              Acepto la política de privacidad
            </Checkbox>
            {errores.privacidad !== undefined && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errores.privacidad}
              </p>
            )}
          </div>
        )}

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
            className="inline-flex items-center justify-center rounded-lg border border-borde bg-white px-5 py-2.5 text-sm font-medium text-texto transition-colors hover:border-acento-600 hover:text-acento-700"
          >
            Limpiar
          </button>
        </div>

        {/*
          Anotación del diseño (comentario UX/UI, no es copy visible): "El mensaje de éxito
          confirma solo lo que responda la API: no promete envío de correo si solo se registra
          la consulta." El envío real depende del backend (`POST /api/contacto`, HU-01).
        */}
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
