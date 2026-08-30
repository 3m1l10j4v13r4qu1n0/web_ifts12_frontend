import { Link } from 'react-router-dom';

function PaginaNoEncontrada() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Pagina no encontrada</h1>
      <Link to="/" className="mt-4 inline-block text-blue-600 underline">
        Volver a la home
      </Link>
    </main>
  );
}

export default PaginaNoEncontrada;
