import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { normalizarErrorApi } from '../api/client';
import { claveRegistro } from '../api/services/admin.service';
import AdminLayout from '../components/layout/AdminLayout';
import Button from '../components/ui/Button';
import Estado from '../components/ui/Estado';
import Eyebrow from '../components/ui/Eyebrow';
import { FormField, Input, Select, Textarea } from '../components/ui/FormField';
import ModalBaja from '../components/ui/ModalBaja';
import TablaAdmin from '../components/ui/TablaAdmin';
import Tabs from '../components/ui/Tabs';
import { SECCIONES_ADMIN } from '../constants/admin';
import { useAuth } from '../contexts/AuthContext';
import { useAdminCrud } from '../hooks/useAdminCrud';
import type {
  CampoAdmin,
  RecursoAdmin,
  RegistroAdmin,
  SeccionAdmin,
  ValoresAdmin,
} from '../types/api/admin.types';

function nombreRegistro(registro: RegistroAdmin): string {
  return [registro.nombre || registro.codigo || `Registro ${registro.id}`, registro.apellido]
    .filter(Boolean)
    .join(' ');
}

function CrudAcademico({ seccion }: { seccion: SeccionAdmin }) {
  const { listado, catalogos, guardar, eliminar } = useAdminCrud(seccion.id);
  const [formulario, setFormulario] = useState<RegistroAdmin | null | undefined>(undefined);
  const [valores, setValores] = useState<Record<string, string | boolean>>({});
  const [baja, setBaja] = useState<RegistroAdmin | null>(null);
  const [aviso, setAviso] = useState('');
  const ocupado = guardar.isPending || eliminar.isPending;
  const error = listado.error || catalogos.error || guardar.error || eliminar.error;
  const campos: CampoAdmin[] = seccion.estado
    ? [...seccion.campos, { clave: seccion.estado, etiqueta: 'Activo', tipo: 'boolean' }]
    : seccion.campos;

  function abrir(registro: RegistroAdmin | null) {
    guardar.reset();
    eliminar.reset();
    setAviso('');
    setValores(
      Object.fromEntries(
        campos.map((campo) => [
          campo.clave,
          campo.tipo === 'boolean'
            ? registro?.[campo.clave] !== false
            : String(registro?.[campo.clave] ?? ''),
        ]),
      ),
    );
    setFormulario(registro);
  }

  function enviar(event: FormEvent) {
    event.preventDefault();
    const payload: ValoresAdmin = {};
    for (const campo of campos) {
      const valor = valores[campo.clave];
      payload[campo.clave] =
        campo.tipo === 'boolean'
          ? Boolean(valor)
          : valor === ''
            ? null
            : campo.tipo === 'number' || campo.referencia
              ? Number(valor)
              : String(valor).trim();
    }
    guardar.mutate(
      { valores: payload, registro: formulario ?? undefined },
      {
        onSuccess: () => {
          setFormulario(undefined);
          setAviso('Cambios guardados.');
        },
      },
    );
  }

  function etiquetaCampo(campo: CampoAdmin, registro: RegistroAdmin): string {
    if (campo.referencia) {
      const relacionado = catalogos.data?.[campo.referencia]?.find(
        (item) => item.id === registro[campo.clave],
      );
      return relacionado ? nombreRegistro(relacionado) : String(registro[campo.clave] ?? '');
    }
    return String(registro[campo.clave] ?? '');
  }

  const columnas = seccion.campos
    .filter((campo) => campo.requerido || campo.clave === 'codigo' || campo.clave === 'nombre')
    .slice(0, 3);
  const filas = (listado.data ?? []).map((registro) => ({
    id: claveRegistro(seccion.id, registro),
    celdas: {
      ...Object.fromEntries(columnas.map((campo) => [campo.clave, etiquetaCampo(campo, registro)])),
      estado: seccion.estado
        ? registro[seccion.estado] === false
          ? 'Inactivo'
          : 'Activo'
        : 'Vinculado',
    },
  }));

  return (
    <section className="mt-6 space-y-5" aria-label={seccion.etiqueta}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">{seccion.etiqueta}</h2>
        <Button disabled={ocupado} onClick={() => abrir(null)}>
          Crear registro
        </Button>
      </div>
      {error && (
        <p role="alert" className="rounded border border-red-200 bg-red-50 p-3">
          {normalizarErrorApi(error).mensaje}
        </p>
      )}
      {aviso && (
        <p role="status" className="rounded border border-green-200 bg-green-50 p-3">
          {aviso}
        </p>
      )}
      {formulario !== undefined && (
        <form onSubmit={enviar} className="space-y-4 rounded-lg border border-borde bg-white p-5">
          <h3 className="text-lg font-semibold">
            {formulario ? 'Editar registro' : 'Nuevo registro'}
          </h3>
          <fieldset disabled={ocupado} className="grid gap-4 sm:grid-cols-2">
            {campos.map((campo) => {
              const id = `admin-${campo.clave}`;
              const cambiar = (valor: string | boolean) =>
                setValores((prev) => ({ ...prev, [campo.clave]: valor }));
              return (
                <FormField
                  key={campo.clave}
                  htmlFor={id}
                  etiqueta={campo.etiqueta}
                  requerido={campo.requerido}
                >
                  {campo.tipo === 'boolean' ? (
                    <input
                      id={id}
                      type="checkbox"
                      className="h-5 w-5"
                      checked={Boolean(valores[campo.clave])}
                      onChange={(e) => cambiar(e.target.checked)}
                    />
                  ) : campo.referencia ? (
                    <Select
                      id={id}
                      required={campo.requerido}
                      value={String(valores[campo.clave] ?? '')}
                      onChange={(e) => cambiar(e.target.value)}
                    >
                      <option value="">Seleccionar</option>
                      {(catalogos.data?.[campo.referencia] ?? []).map((item) => (
                        <option key={item.id} value={item.id}>
                          {nombreRegistro(item)}
                          {item.activa === false || item.activo === false ? ' (inactivo)' : ''}
                        </option>
                      ))}
                    </Select>
                  ) : campo.tipo === 'textarea' ? (
                    <Textarea
                      id={id}
                      value={String(valores[campo.clave] ?? '')}
                      onChange={(e) => cambiar(e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={id}
                      type={campo.tipo ?? 'text'}
                      required={campo.requerido}
                      maxLength={campo.maxLength}
                      min={campo.tipo === 'number' ? 1 : undefined}
                      max={campo.max}
                      step={campo.tipo === 'number' ? 1 : undefined}
                      value={String(valores[campo.clave] ?? '')}
                      onChange={(e) => cambiar(e.target.value)}
                    />
                  )}
                </FormField>
              );
            })}
          </fieldset>
          <div className="flex gap-3">
            <Button type="submit" disabled={ocupado}>
              Guardar cambios
            </Button>
            <Button
              variante="secundario"
              disabled={ocupado}
              onClick={() => setFormulario(undefined)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      )}
      {listado.isPending ? (
        <p role="status">Cargando registros…</p>
      ) : filas.length > 0 ? (
        <TablaAdmin
          columnas={[
            ...columnas.map((campo) => ({ clave: campo.clave, etiqueta: campo.etiqueta })),
            { clave: 'estado', etiqueta: 'Estado' },
          ]}
          filas={filas}
          acciones={(fila) => {
            const registro = listado.data?.find(
              (item) => claveRegistro(seccion.id, item) === fila.id,
            );
            if (!registro) return null;
            return (
              <div className="flex justify-end gap-2">
                <Button variante="secundario" disabled={ocupado} onClick={() => abrir(registro)}>
                  Editar
                </Button>
                <Button
                  variante="secundario"
                  disabled={
                    ocupado || (seccion.estado !== undefined && registro[seccion.estado] === false)
                  }
                  onClick={() => {
                    eliminar.reset();
                    setBaja(registro);
                  }}
                >
                  {seccion.estado ? 'Dar de baja' : 'Quitar vínculo'}
                </Button>
              </div>
            );
          }}
        />
      ) : (
        !error && (
          <Estado
            tipo="empty"
            titulo="Sin registros"
            mensaje="Todavía no hay registros en esta sección."
          />
        )
      )}
      <ModalBaja
        abierto={baja !== null}
        titulo={seccion.estado ? '¿Dar de baja este registro?' : '¿Quitar este vínculo?'}
        mensaje={
          seccion.estado
            ? 'Dejará de mostrarse como activo. Podés reactivarlo editando el registro.'
            : 'Se quitará únicamente la relación entre los registros.'
        }
        onCancelar={() => setBaja(null)}
        onConfirmar={() => {
          if (baja && !ocupado) {
            eliminar.mutate(baja, { onSuccess: () => setAviso('Operación guardada.') });
            setBaja(null);
          }
        }}
      />
    </section>
  );
}

function AdminCrudPanel() {
  const [recurso, setRecurso] = useState<RecursoAdmin>('carreras');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const seccion = SECCIONES_ADMIN.find((item) => item.id === recurso) ?? SECCIONES_ADMIN[0];
  return (
    <AdminLayout>
      <div className="min-h-screen bg-fondo">
        <div className="border-b border-borde-suave bg-white">
          <div className="mx-auto max-w-contenido px-4 py-8">
            <Eyebrow seccion="rojo">Administración</Eyebrow>
            <h1 className="mt-3 text-3xl font-semibold">Panel de administración</h1>
            <p className="mt-2 text-texto-suave">
              Gestión de la información académica del instituto.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span>
                {user?.nombre} · {user?.rol === 'editor' ? 'Editor' : 'Administrador'}
              </span>
              <Button
                variante="secundario"
                onClick={() => {
                  logout();
                  navigate('/admin/login', { replace: true });
                }}
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-contenido px-4 py-8">
          <Tabs
            tabs={SECCIONES_ADMIN.map(({ id, etiqueta }) => ({ id, etiqueta }))}
            activa={recurso}
            onChange={(id) => setRecurso(id as RecursoAdmin)}
          />
          <CrudAcademico key={recurso} seccion={seccion} />
        </div>
      </div>
    </AdminLayout>
  );
}
export default AdminCrudPanel;
