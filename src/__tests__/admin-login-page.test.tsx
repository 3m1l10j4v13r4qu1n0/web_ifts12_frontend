import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { iniciarSesion } from '../api/services/auth.service';
import AdminLoginPage from '../pages/AdminLoginPage';
import { renderConRouter } from '../test-utils';

vi.mock('../api/services/auth.service');

const iniciarSesionMock = vi.mocked(iniciarSesion);

function renderizar() {
  return renderConRouter(<AdminLoginPage />, { ruta: '/admin/login', conAuth: true });
}

beforeEach(() => {
  localStorage.clear();
  iniciarSesionMock.mockReset();
});

describe('AdminLoginPage', () => {
  it('muestra el layout y la estructura del frame A1', () => {
    renderizar();

    // Aparece en la franja de marca del AdminLayout y en el eyebrow de la tarjeta.
    expect(screen.getAllByText('Panel de administración').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole('link', { name: 'Volver al sitio público' })).toHaveAttribute(
      'href',
      '/',
    );
    expect(
      screen.getByRole('heading', { level: 1, name: 'Ingreso al panel de administración' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Acceso exclusivo para el personal autorizado que administra los contenidos del sitio.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Moodle es un servicio externo con su propio acceso/),
    ).toBeInTheDocument();
    expect(screen.getByText(/acceso exclusivo para personal autorizado/)).toBeInTheDocument();
  });

  it('trae los campos del diseño, el checkbox mostrar contraseña y el botón', () => {
    renderizar();

    expect(screen.getByLabelText(/Usuario o correo/)).toHaveAttribute(
      'placeholder',
      'usuario@ifts12',
    );
    expect(screen.getByLabelText(/^Contraseña/)).toHaveAttribute('type', 'password');
    expect(screen.getByRole('checkbox', { name: 'Mostrar contraseña' })).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeEnabled();
  });

  it('alterna la visibilidad de la contraseña con el checkbox', async () => {
    const usuario = userEvent.setup();
    renderizar();

    await usuario.click(screen.getByRole('checkbox', { name: 'Mostrar contraseña' }));

    expect(screen.getByLabelText(/^Contraseña/)).toHaveAttribute('type', 'text');
  });

  it('valida los campos vacíos sin llamar al backend', async () => {
    const usuario = userEvent.setup();
    renderizar();

    await usuario.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Completá el usuario y la contraseña.',
    );
    expect(iniciarSesionMock).not.toHaveBeenCalled();
  });

  it('muestra el mensaje del backend cuando las credenciales son inválidas', async () => {
    const usuario = userEvent.setup();
    iniciarSesionMock.mockRejectedValue({ status: 401, mensaje: 'Credenciales inválidas' });
    renderizar();

    await usuario.type(screen.getByLabelText(/Usuario o correo/), 'admin@ifts12');
    await usuario.type(screen.getByLabelText(/^Contraseña/), 'mal');
    await usuario.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Credenciales inválidas');
    expect(iniciarSesionMock).toHaveBeenCalledWith({
      email: 'admin@ifts12',
      password: 'mal',
    });
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('guarda la sesión y navega al panel en un login exitoso', async () => {
    const usuario = userEvent.setup();
    iniciarSesionMock.mockResolvedValue({
      token: 'jwt-de-prueba',
      usuario: {
        id: 7,
        nombre: 'Edith',
        apellido: 'Gómez',
        email: 'edith@ifts12',
        rol: 'admin',
      },
    });

    renderConRouter(
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<p>Panel de administración visible</p>} />
      </Routes>,
      { ruta: '/admin/login', conAuth: true },
    );

    await usuario.type(screen.getByLabelText(/Usuario o correo/), 'edith@ifts12');
    await usuario.type(screen.getByLabelText(/^Contraseña/), 'secreta');
    await usuario.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    expect(await screen.findByText('Panel de administración visible')).toBeInTheDocument();
    expect(localStorage.getItem('auth_token')).toBe('jwt-de-prueba');
    expect(localStorage.getItem('auth_usuario')).toContain('edith@ifts12');
  });

  it('ofrece volver al sitio público y explica el procedimiento de recuperación', () => {
    renderizar();

    const pie = screen.getByRole('contentinfo');
    expect(within(pie).getByText(/Panel de administración/)).toBeInTheDocument();
    expect(
      screen.getByText(/¿Olvidaste tu contraseña\? Contactá a quien administra el sitio/),
    ).toBeInTheDocument();
    expect(screen.getByText('Roles y permisos')).toBeInTheDocument();
  });
});
