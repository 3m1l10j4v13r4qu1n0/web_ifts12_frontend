import { useState } from 'react';
import { normalizarErrorApi } from '../api/client';
import { type Consulta, registrarConsulta } from '../api/services/contacto.service';

export function useConsulta() {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enviada, setEnviada] = useState(false);

  function limpiarEstado() {
    setError(null);
    setEnviada(false);
  }

  function enviarConsulta(consulta: Consulta) {
    if (enviando) return;
    limpiarEstado();
    setEnviando(true);
    void registrarConsulta(consulta)
      .then(() => setEnviada(true))
      .catch((fallo: unknown) => setError(normalizarErrorApi(fallo).mensaje))
      .finally(() => setEnviando(false));
  }

  return { enviada, enviando, error, enviarConsulta, limpiarEstado };
}
