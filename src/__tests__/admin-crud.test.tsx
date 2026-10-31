import { fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { guardarAdmin, listarAdmin } from '../api/services/admin.service';
import AdminCrudPanel from '../pages/AdminCrudPanel';
import { renderConRouter } from '../test-utils';

vi.mock('../api/services/admin.service', async (original) => ({
  ...(await original<typeof import('../api/services/admin.service')>()),
  listarAdmin: vi.fn(),
  guardarAdmin: vi.fn(),
  eliminarAdmin: vi.fn(),
}));
vi.mock('../contexts/AuthContext', async (original) => ({
  ...(await original<typeof import('../contexts/AuthContext')>()),
  useAuth: () => ({ user: { nombre: 'Editor de prueba', rol: 'editor' }, logout: vi.fn() }),
}));

describe('CRUD académico básico', () => {
  beforeEach(() => {
    vi.mocked(listarAdmin).mockReset().mockResolvedValue([]);
    vi.mocked(guardarAdmin).mockReset();
  });
  async function formulario() {
    renderConRouter(<AdminCrudPanel />);
    fireEvent.click(await screen.findByRole('button', { name: 'Crear registro' }));
    fireEvent.change(screen.getByLabelText(/Nombre/), { target: { value: 'Carrera de prueba' } });
  }
  it('permite al editor crear y confirma únicamente después de guardar', async () => {
    vi.mocked(guardarAdmin).mockResolvedValue({ id: 91, nombre: 'Carrera de prueba' });
    await formulario();
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));
    await waitFor(() =>
      expect(guardarAdmin).toHaveBeenCalledWith(
        'carreras',
        expect.objectContaining({ nombre: 'Carrera de prueba', activa: true }),
        undefined,
      ),
    );
    expect(await screen.findByText('Cambios guardados.')).toBeInTheDocument();
  });
  it('conserva el formulario y muestra el error cuando falla el guardado', async () => {
    vi.mocked(guardarAdmin).mockRejectedValue({ status: 409, mensaje: 'Ya existe la carrera' });
    await formulario();
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre/)).toHaveValue('Carrera de prueba');
    expect(screen.queryByText('Cambios guardados.')).toBeNull();
  });
});
