import { useEffect } from 'react';
import Button from './Button';

interface ModalBajaProps {
  abierto: boolean;
  titulo?: string;
  mensaje?: string;
  onCancelar: () => void;
  onConfirmar: () => void;
}

/**
 * Modal de confirmación de baja (B2). role="dialog" aria-modal, foco inicial en
 * Cancelar, Esc cierra y el foco vuelve al botón que lo abrió (lo maneja quien
 * lo controla). Todavía no hay endpoint de baja real: solo se confirma.
 */
function ModalBaja({
  abierto,
  titulo = '¿Eliminar este contenido?',
  mensaje = 'Dejará de verse en el sitio. Esta acción no se puede deshacer.',
  onCancelar,
  onConfirmar,
}: ModalBajaProps) {
  useEffect(() => {
    if (!abierto) {
      return;
    }

    const alPresionar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        onCancelar();
      }
    };

    document.addEventListener('keydown', alPresionar);
    return () => document.removeEventListener('keydown', alPresionar);
  }, [abierto, onCancelar]);

  if (!abierto) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-baja-titulo"
        className="w-full max-w-md rounded-lg border border-borde-suave bg-white p-6 shadow-elevada"
      >
        <h2 id="modal-baja-titulo" className="text-lg font-semibold text-texto">
          {titulo}
        </h2>
        <p className="mt-2 text-sm text-texto-suave">{mensaje}</p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variante="secundario" onClick={onCancelar} autoFocus>
            Cancelar
          </Button>
          <Button variante="primario" onClick={onConfirmar}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModalBaja;
