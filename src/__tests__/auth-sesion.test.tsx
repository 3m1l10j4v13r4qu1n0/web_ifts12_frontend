import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NOMBRE_TOKEN } from '../api/client';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../routes/ProtectedRoute';
import { renderConRouter } from '../test-utils';

const CLAVE_USUARIO = 'auth_usuario';

function ProbadorDeSesion() {
  const { user, token, login, logout } = useAuth();

  return (
    <div>
      <p>Sesión: {token === null ? 'sin token' : token}</p>
      <p>Usuario: {user === null ? 'sin usuario' : user.nombre}</p>
      <button
        type="button"
        onClick={() =>
          login({ id: 1, nombre: 'Ana Pérez', email: 'ana@ifts12', rol: 'admin' }, 'jwt-nuevo')
        }
      >
        Iniciar sesión de prueba
      </button>
      <button type="button" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}

function renderSesion() {
  return renderConRouter(<ProbadorDeSesion />, { conAuth: true });
}

beforeEach(() => {
  localStorage.clear();
});

describe('AuthContext', () => {
  it('arranca sin sesión cuando el storage está vacío', () => {
    renderSesion();

    expect(screen.getByText('Sesión: sin token')).toBeInTheDocument();
    expect(screen.getByText('Usuario: sin usuario')).toBeInTheDocument();
  });

  it('login guarda token y usuario en el contexto y en localStorage', async () => {
    renderSesion();

    await userEvent.setup().click(screen.getByRole('button', { name: 'Iniciar sesión de prueba' }));

    expect(screen.getByText('Sesión: jwt-nuevo')).toBeInTheDocument();
    expect(screen.getByText('Usuario: Ana Pérez')).toBeInTheDocument();
    expect(localStorage.getItem(NOMBRE_TOKEN)).toBe('jwt-nuevo');
    expect(localStorage.getItem(CLAVE_USUARIO)).toContain('ana@ifts12');
  });

  it('restaura la sesión desde localStorage al montar', () => {
    localStorage.setItem(NOMBRE_TOKEN, 'jwt-guardado');
    localStorage.setItem(
      CLAVE_USUARIO,
      JSON.stringify({ id: 3, nombre: 'Ana Pérez', email: 'ana@ifts12', rol: 'admin' }),
    );

    renderSesion();

    expect(screen.getByText('Sesión: jwt-guardado')).toBeInTheDocument();
    expect(screen.getByText('Usuario: Ana Pérez')).toBeInTheDocument();
  });

  it('descarta un usuario corrupto en el storage', () => {
    localStorage.setItem(NOMBRE_TOKEN, 'jwt-guardado');
    localStorage.setItem(CLAVE_USUARIO, 'no-es-json');

    renderSesion();

    expect(screen.getByText('Sesión: jwt-guardado')).toBeInTheDocument();
    expect(screen.getByText('Usuario: sin usuario')).toBeInTheDocument();
  });

  it('logout limpia el contexto y el storage (sin endpoint remoto)', async () => {
    localStorage.setItem(NOMBRE_TOKEN, 'jwt-guardado');
    localStorage.setItem(
      CLAVE_USUARIO,
      JSON.stringify({ id: 3, nombre: 'Ana Pérez', email: 'ana@ifts12', rol: null }),
    );

    renderSesion();
    await userEvent.setup().click(screen.getByRole('button', { name: 'Cerrar sesión' }));

    expect(screen.getByText('Sesión: sin token')).toBeInTheDocument();
    expect(screen.getByText('Usuario: sin usuario')).toBeInTheDocument();
    expect(localStorage.getItem(NOMBRE_TOKEN)).toBeNull();
    expect(localStorage.getItem(CLAVE_USUARIO)).toBeNull();
  });
});

describe('ProtectedRoute', () => {
  it('redirige al login del panel cuando no hay token', () => {
    renderConRouter(
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <p>Contenido protegido</p>
            </ProtectedRoute>
          }
        />
        <Route path="/admin/login" element={<p>Redirigido al login</p>} />
      </Routes>,
      { ruta: '/admin', conAuth: true },
    );

    expect(screen.getByText('Redirigido al login')).toBeInTheDocument();
    expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument();
  });

  it('muestra el contenido cuando hay sesión guardada', () => {
    localStorage.setItem(NOMBRE_TOKEN, 'jwt-guardado');
    localStorage.setItem(
      CLAVE_USUARIO,
      JSON.stringify({ id: 3, nombre: 'Ana Pérez', email: 'ana@ifts12', rol: null }),
    );

    renderConRouter(
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <p>Contenido protegido</p>
            </ProtectedRoute>
          }
        />
        <Route path="/admin/login" element={<p>Redirigido al login</p>} />
      </Routes>,
      { ruta: '/admin', conAuth: true },
    );

    expect(screen.getByText('Contenido protegido')).toBeInTheDocument();
    expect(screen.queryByText('Redirigido al login')).not.toBeInTheDocument();
  });
});

describe('ProtectedRoute sin contrato de auth', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('muestra el aviso de proceso en vez de redirigir al login', () => {
    vi.stubEnv('VITE_ADMIN_HABILITADO', 'false');

    renderConRouter(
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <p>Panel privado</p>
            </ProtectedRoute>
          }
        />
        <Route path="/admin/login" element={<p>Redirigido al login</p>} />
      </Routes>,
      { ruta: '/admin', conAuth: true },
    );

    expect(screen.getByText('Contenido en preparación')).toBeInTheDocument();
    expect(screen.queryByText('Panel privado')).not.toBeInTheDocument();
    expect(screen.queryByText('Redirigido al login')).not.toBeInTheDocument();
  });
});
