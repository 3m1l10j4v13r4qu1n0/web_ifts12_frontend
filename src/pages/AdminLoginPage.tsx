import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import Eyebrow from '../components/ui/Eyebrow';
import { FormField, Input } from '../components/ui/FormField';

/**
 * B1 · Login de administración. SOLO interfaz: el backend todavía no expone un
 * endpoint de autenticación, así que el formulario no envía nada y el botón queda
 * deshabilitado con aviso de PENDIENTE (no se inventan credenciales ni sesión).
 */
function AdminLoginPage() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-fondo px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-borde-suave bg-white p-8 shadow-suave">
        <Eyebrow seccion="rojo">Panel de administración</Eyebrow>
        <h1 className="mt-3 text-2xl font-semibold text-texto">Ingreso de administración</h1>
        <p className="mt-2 text-sm text-texto-suave">Acceso restringido al equipo del instituto.</p>

        <form className="mt-6 space-y-4" onSubmit={(evento) => evento.preventDefault()}>
          <FormField etiqueta="Usuario" htmlFor="admin-usuario" requerido>
            <Input
              id="admin-usuario"
              type="text"
              autoComplete="username"
              value={usuario}
              onChange={(evento) => setUsuario(evento.target.value)}
            />
          </FormField>

          <FormField etiqueta="Contraseña" htmlFor="admin-clave" requerido>
            <Input
              id="admin-clave"
              type="password"
              autoComplete="current-password"
              value={clave}
              onChange={(evento) => setClave(evento.target.value)}
            />
          </FormField>

          <Checkbox id="admin-recordarme">Mantener sesión iniciada</Checkbox>

          <Button type="submit" tamano="lg" className="w-full" disabled>
            Ingresar
          </Button>
        </form>

        <p
          role="status"
          className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-aviso"
        >
          <strong>Pendiente:</strong> el ingreso se habilita cuando Backend exponga la
          autenticación. Esta pantalla es de interfaz, sin sesión real.
        </p>

        <Link
          to="/"
          className="mt-4 inline-block text-sm font-medium text-acento-700 hover:text-acento-800"
        >
          ← Volver al sitio
        </Link>
      </div>
    </main>
  );
}

export default AdminLoginPage;
