import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { registrarConsulta } from '../api/services/contacto.service';
import FormularioConsulta from '../components/ui/FormularioConsulta';

vi.mock('../api/services/contacto.service');

describe('FormularioConsulta', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_CONTACTO_HABILITADO', 'true');
    vi.mocked(registrarConsulta).mockReset().mockResolvedValue();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });
  it('muestra errores al enviar el formulario vacío', () => {
    render(<FormularioConsulta />);

    fireEvent.click(screen.getByRole('button', { name: 'Enviar consulta' }));

    expect(screen.getByText('Completá tu nombre')).toBeInTheDocument();
    expect(screen.getByText('Completá tu correo electrónico')).toBeInTheDocument();
    expect(screen.getByText('Escribí tu consulta')).toBeInTheDocument();
  });

  it('rechaza un correo electrónico inválido', () => {
    render(<FormularioConsulta />);

    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'correo-invalido' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar consulta' }));

    expect(screen.getByText('Ingresá un correo electrónico válido')).toBeInTheDocument();
  });

  it('confirma el registro cuando la API acepta los campos válidos', async () => {
    render(<FormularioConsulta />);

    fireEvent.change(screen.getByLabelText('Nombre y apellido'), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'ana@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Consulta'), {
      target: { value: '¿Cuándo abre la inscripción?' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar consulta' }));

    expect(await screen.findByText(/consulta registrada/i)).toBeInTheDocument();
    expect(registrarConsulta).toHaveBeenCalledWith({
      nombre: 'Ana',
      email: 'ana@example.com',
      mensaje: '¿Cuándo abre la inscripción?',
    });
  });

  it('valida asunto y privacidad cuando están habilitados (Contacto)', () => {
    render(<FormularioConsulta conAsunto conPrivacidad etiquetaMensaje="Mensaje" />);

    fireEvent.change(screen.getByLabelText('Nombre y apellido'), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'ana@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Mensaje'), {
      target: { value: 'Quiero consultar por la inscripción.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar consulta' }));

    expect(screen.getByText('Seleccioná un asunto')).toBeInTheDocument();
    expect(screen.getByText('Aceptá la política de privacidad')).toBeInTheDocument();
  });

  it('acepta asunto elegido y privacidad aceptada (Contacto)', async () => {
    render(<FormularioConsulta conAsunto conPrivacidad etiquetaMensaje="Mensaje" />);

    fireEvent.change(screen.getByLabelText('Nombre y apellido'), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'ana@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Asunto'), { target: { value: 'Ingreso' } });
    fireEvent.change(screen.getByLabelText('Mensaje'), {
      target: { value: '¿Cuándo abre la inscripción?' },
    });
    fireEvent.click(screen.getByRole('checkbox', { name: /política de privacidad/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Enviar consulta' }));

    expect(await screen.findByText(/consulta registrada/i)).toBeInTheDocument();
    expect(registrarConsulta).toHaveBeenCalledWith({
      nombre: 'Ana',
      email: 'ana@example.com',
      mensaje: 'Ingreso\n\n¿Cuándo abre la inscripción?',
    });
  });

  it('limpia todos los campos, incluidos asunto y privacidad', () => {
    render(<FormularioConsulta conAsunto conPrivacidad etiquetaMensaje="Mensaje" />);

    fireEvent.change(screen.getByLabelText('Nombre y apellido'), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText('Asunto'), { target: { value: 'Ingreso' } });
    fireEvent.click(screen.getByRole('checkbox', { name: /política de privacidad/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Limpiar' }));

    expect(screen.getByLabelText('Nombre y apellido')).toHaveValue('');
    expect(screen.getByLabelText('Asunto')).toHaveValue('');
    expect(screen.getByRole('checkbox', { name: /política de privacidad/i })).not.toBeChecked();
  });

  it('muestra el fallo real y no confirma una consulta rechazada', async () => {
    vi.mocked(registrarConsulta).mockRejectedValueOnce({ status: 500, mensaje: 'Error de prueba' });
    render(<FormularioConsulta />);
    fireEvent.change(screen.getByLabelText('Nombre y apellido'), { target: { value: 'TEST' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'test@example.invalid' },
    });
    fireEvent.change(screen.getByLabelText('Consulta'), { target: { value: 'TEST' } });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar consulta' }));
    expect(await screen.findByText('Error de prueba')).toBeInTheDocument();
    expect(screen.queryByText(/consulta registrada/i)).not.toBeInTheDocument();
  });
});

describe('FormularioConsulta sin contrato de contacto', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_CONTACTO_HABILITADO', 'false');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('muestra el aviso de proceso, deshabilita los campos y no confirma envío', () => {
    render(<FormularioConsulta />);

    expect(screen.getByText('Contenido en preparación')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre y apellido')).toBeDisabled();
    expect(screen.getByLabelText('Correo electrónico')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Enviar consulta' })).toBeDisabled();
    expect(screen.queryByText(/consulta registrada/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Enviar consulta' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
