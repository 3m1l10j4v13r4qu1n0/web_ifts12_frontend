import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import FormularioConsulta from '../components/ui/FormularioConsulta';

describe('FormularioConsulta', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_CONTACTO_HABILITADO', 'true');
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

  it('confirma el registro cuando los campos son válidos', () => {
    render(<FormularioConsulta />);

    fireEvent.change(screen.getByLabelText('Nombre y apellido'), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'ana@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Consulta'), {
      target: { value: '¿Cuándo abre la inscripción?' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar consulta' }));

    expect(screen.getByText(/consulta registrada/i)).toBeInTheDocument();
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

  it('acepta asunto elegido y privacidad aceptada (Contacto)', () => {
    render(<FormularioConsulta conAsunto conPrivacidad etiquetaMensaje="Mensaje" />);

    fireEvent.change(screen.getByLabelText('Nombre y apellido'), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'ana@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Asunto'), { target: { value: 'Tutorías' } });
    fireEvent.change(screen.getByLabelText('Mensaje'), {
      target: { value: '¿Cómo contacto con tutorías?' },
    });
    fireEvent.click(screen.getByRole('checkbox', { name: /política de privacidad/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Enviar consulta' }));

    expect(screen.getByText(/consulta registrada/i)).toBeInTheDocument();
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
