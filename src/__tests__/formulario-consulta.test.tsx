import { fireEvent, render, screen } from '@testing-library/react';
import FormularioConsulta from '../components/ui/FormularioConsulta';

describe('FormularioConsulta', () => {
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

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'ana@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Consulta'), {
      target: { value: '¿Cuándo abre la inscripción?' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar consulta' }));

    expect(screen.getByText(/consulta registrada/i)).toBeInTheDocument();
  });
});
