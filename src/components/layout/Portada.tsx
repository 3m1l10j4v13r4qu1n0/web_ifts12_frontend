import Button from '../ui/Button';

export interface AccionPortada {
  etiqueta: string;
  href: string;
  variante?: 'primario' | 'secundario';
}

interface PortadaProps {
  titulo: string;
  subtitulo?: string;
  acciones?: AccionPortada[];
}

function Portada({ titulo, subtitulo, acciones }: PortadaProps) {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-slate-100 to-acento-100">
      <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {titulo}
        </h1>
        {subtitulo !== undefined && (
          <p className="mt-4 max-w-2xl text-lg text-slate-600">{subtitulo}</p>
        )}
        {acciones !== undefined && acciones.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {acciones.map((accion) => (
              <Button
                key={accion.href}
                href={accion.href}
                variante={accion.variante ?? 'primario'}
                tamano="lg"
              >
                {accion.etiqueta}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Portada;
