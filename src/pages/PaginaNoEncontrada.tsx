import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Estado from '../components/ui/Estado';
import { Input } from '../components/ui/FormField';

/**
 * Ruta 404 alineada al export `12 · Error 404 — Desktop 1440`: título y bajada del componente
 * `Estado`, botón "Ir al inicio" y formulario "Buscar en el sitio" que lleva a `/buscar?q=…`.
 * Sin breadcrumb: el export no lo muestra.
 */
function PaginaNoEncontrada() {
  const [consulta, setConsulta] = useState('');
  const navigate = useNavigate();

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const termino = consulta.trim();
    navigate(termino === '' ? '/buscar' : `/buscar?q=${encodeURIComponent(termino)}`);
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-contenido items-center justify-center px-4 py-12">
      <Estado
        tipo="404"
        className="w-full max-w-lg"
        accion={
          <>
            <Button href="/" variante="primario" className="mt-1">
              Ir al inicio
            </Button>
            <form
              onSubmit={buscar}
              className="mt-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
            >
              <label htmlFor="buscar-sitio-404" className="sr-only">
                Buscar en el sitio
              </label>
              <Input
                id="buscar-sitio-404"
                type="search"
                value={consulta}
                onChange={(evento) => setConsulta(evento.target.value)}
                placeholder="Buscar en el sitio"
                className="sm:max-w-xs"
              />
              <Button type="submit" variante="primario">
                Buscar
              </Button>
            </form>
          </>
        }
      />
    </main>
  );
}

export default PaginaNoEncontrada;
