import { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Button from '../components/ui/Button';
import Estado from '../components/ui/Estado';
import Eyebrow from '../components/ui/Eyebrow';
import Tabs from '../components/ui/Tabs';

const SECCIONES = [
  { id: 'carreras', etiqueta: 'Carreras', singular: 'una carrera' },
  { id: 'novedades', etiqueta: 'Novedades', singular: 'una novedad' },
  { id: 'faqs', etiqueta: 'Preguntas frecuentes', singular: 'una pregunta frecuente' },
];

/**
 * B2 · Panel de administración. SOLO interfaz: los endpoints de escritura
 * (alta/edición/baja) todavía no existen, así que las acciones quedan
 * deshabilitadas y los datos se muestran como PENDIENTE de contrato.
 */
function AdminPanelPage() {
  const [seccion, setSeccion] = useState('carreras');
  const activa = SECCIONES.find((item) => item.id === seccion) ?? SECCIONES[0];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-fondo">
        <div className="border-b border-borde-suave bg-white">
          <div className="mx-auto max-w-contenido px-4 py-8">
            <Eyebrow seccion="rojo">Administración</Eyebrow>
            <h1 className="mt-3 text-3xl font-semibold text-texto">Panel de administración</h1>
            <p className="mt-2 text-texto-suave">
              Gestión de contenidos del sitio. Interfaz sin conexión al backend todavía.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-contenido px-4 py-8">
          <Tabs
            tabs={SECCIONES.map(({ id, etiqueta }) => ({ id, etiqueta }))}
            activa={seccion}
            onChange={setSeccion}
          />

          <div className="mt-6 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-texto">{activa.etiqueta}</h2>
            <Button disabled>Nuevo (pendiente)</Button>
          </div>

          <Estado
            tipo="empty"
            titulo="Sin contenido cargado"
            mensaje={`Cargar, editar y dar de baja ${activa.singular} se habilita cuando Backend exponga los endpoints de escritura.`}
            className="mt-6"
          />

          <p
            role="status"
            className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-aviso"
          >
            <strong>Pendiente:</strong> esta pantalla no realiza llamadas reales ni persiste datos.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPanelPage;
