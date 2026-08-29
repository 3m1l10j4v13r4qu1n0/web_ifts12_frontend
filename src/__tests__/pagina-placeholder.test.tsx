import { render, screen } from '@testing-library/react';
import PaginaPlaceholder from '../pages/PaginaPlaceholder';

describe('PaginaPlaceholder', () => {
  it('muestra el titulo y el aviso de construccion', () => {
    render(<PaginaPlaceholder titulo="Carreras" />);

    expect(screen.getByRole('heading', { level: 1, name: 'Carreras' })).toBeInTheDocument();
    expect(screen.getByText(/construccion/i)).toBeInTheDocument();
  });
});
