import { Info } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../api/services/auth.service';
import AdminLayout from '../components/layout/AdminLayout';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import Eyebrow from '../components/ui/Eyebrow';
import { FormField, Input } from '../components/ui/FormField';
import { useAuth } from '../contexts/AuthContext';
import type { ApiError } from '../types/api/error.types';

/**
 * A1 · Login de administración (frame "A1 · Admin · Login — Desktop 1440" del
 * Figma v2). Login exclusivo para el personal que administra contenidos (RF-23,
 * RN-05); B1: aviso de que Moodle es un servicio externo con su propio acceso.
 *
 * Consume `POST /api/auth/login` real: en éxito guarda la sesión (token +
 * usuario) en el AuthContext y navega al panel; en error muestra el mensaje que
 * normaliza el interceptor global de `src/api/client.ts`, sin try/catch de por
 * medio que reinterprete el error.
 *
 * Anotaciones del frame (estados y flujo: "error de validación, credenciales
 * incorrectas, cargando y sesión expirada → 06 · Estados"; "login OK → Panel")
 * quedan como comentario de código: no se renderizan (regla de anotaciones).
 */
function AdminLoginPage() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mostrarClave, setMostrarClave] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (enviando) {
      return;
    }

    if (usuario.trim() === '' || clave === '') {
      setError('Completá el usuario y la contraseña.');
      return;
    }

    setError(null);
    setEnviando(true);

    try {
      const respuesta = await iniciarSesion({ email: usuario.trim(), password: clave });

      login(
        {
          id: respuesta.usuario.id,
          nombre: `${respuesta.usuario.nombre} ${respuesta.usuario.apellido}`.trim(),
          email: respuesta.usuario.email,
          rol: respuesta.usuario.rol,
        },
        respuesta.token,
      );
      navigate('/admin', { replace: true });
    } catch (capturado) {
      const apiError = capturado as Partial<ApiError>;
      setError(
        typeof apiError.mensaje === 'string' && apiError.mensaje.trim() !== ''
          ? apiError.mensaje
          : 'No pudimos iniciar sesión. Intentá de nuevo más tarde.',
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AdminLayout>
      <div className="px-4 py-10 sm:px-8 lg:px-[120px]">
        <div className="mx-auto w-full max-w-[480px]">
          <section className="rounded-lg border border-borde-suave bg-white p-6 shadow-suave sm:p-10">
            <Eyebrow seccion="admin">Panel de administración</Eyebrow>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-texto">
              Ingreso al panel de administración
            </h1>
            <p className="mt-2 text-base text-texto-suave">
              Acceso exclusivo para el personal autorizado que administra los contenidos del sitio.
            </p>

            {/* Aviso B1: el frame lo cita con la ref; acá va solo el copy. */}
            <div
              className="mt-4 flex gap-3 rounded-md border-l-4 border-acento-700 bg-acento-50 p-3.5"
              role="note"
            >
              <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-acento-700" />
              <p className="text-sm font-semibold text-texto">
                ¿Buscás el Campus Virtual? Moodle es un servicio externo con su propio acceso; este
                formulario no usa credenciales de Moodle.
              </p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={enviar} noValidate>
              <FormField etiqueta="Usuario o correo" htmlFor="admin-usuario" requerido>
                <Input
                  id="admin-usuario"
                  type="text"
                  autoComplete="username"
                  placeholder="usuario@ifts12"
                  className="min-h-12 rounded"
                  value={usuario}
                  onChange={(evento) => setUsuario(evento.target.value)}
                />
              </FormField>

              <FormField etiqueta="Contraseña" htmlFor="admin-clave" requerido>
                <Input
                  id="admin-clave"
                  type={mostrarClave ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="min-h-12 rounded"
                  value={clave}
                  onChange={(evento) => setClave(evento.target.value)}
                />
              </FormField>

              <Checkbox
                id="admin-mostrar-clave"
                checked={mostrarClave}
                onChange={(evento) => setMostrarClave(evento.target.checked)}
              >
                Mostrar contraseña
              </Checkbox>

              {error !== null && (
                <p
                  role="alert"
                  className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-error"
                >
                  {error}
                </p>
              )}

              <Button
                type="submit"
                tamano="lg"
                cargando={enviando}
                className="w-full min-h-14 rounded"
              >
                Iniciar sesión
              </Button>
            </form>

            <p className="mt-4 text-xs text-texto-suave">
              ¿Olvidaste tu contraseña? Contactá a quien administra el sitio (procedimiento de
              recuperación pendiente).
            </p>

            {/* Bloque "Roles y permisos (RF-24)" del frame: mensaje de proceso, sin
                perfiles inventados; la anotación "PENDIENTE INSTITUCIONAL" no se renderiza. */}
            <div className="mt-4 rounded-lg border border-borde-suave bg-white p-4">
              <p className="text-sm font-semibold text-texto">Roles y permisos</p>
              <p className="mt-2 rounded border border-dashed border-aviso bg-amber-50 px-3 py-2 text-xs text-aviso">
                Los roles y permisos se definen con Análisis Funcional; todavía no se muestran
                perfiles en este formulario.
              </p>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminLoginPage;
