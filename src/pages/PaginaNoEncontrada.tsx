import { Link } from 'react-router-dom';
import Estado from '../components/ui/Estado';

function PaginaNoEncontrada() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-contenido items-center justify-center px-4 py-12">
      <Estado
        tipo="404"
        className="w-full max-w-lg"
        accion={
          <Link
            to="/"
            className="inline-flex min-h-11 items-center rounded-md bg-acento-600 px-5 text-sm font-medium text-white transition-colors hover:bg-acento-700"
          >
            Volver al inicio
          </Link>
        }
      />
    </main>
  );
}

export default PaginaNoEncontrada;
