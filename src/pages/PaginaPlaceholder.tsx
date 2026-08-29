function PaginaPlaceholder({ titulo }: { titulo: string }) {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">{titulo}</h1>
      <p className="mt-2 text-gray-600">
        Seccion en construccion: se completa cuando lleguen los wireframes de UX/UI y los contratos
        de Backend.
      </p>
    </main>
  );
}

export default PaginaPlaceholder;
