import { usePlanPublico } from '../../hooks/useContenidoPublico';

export default function ContenidoAcademico({ slug }: { slug: string }) {
  const { consulta, materias, existePlan } = usePlanPublico(slug);
  const filas = consulta.data?.materias ?? [];
  const ids = new Set(filas.map((fila) => fila.materia.id));
  const detalles = (materias.data ?? []).filter((item) => ids.has(item.id));
  const docentes = [
    ...new Map(
      detalles.flatMap((materia) => materia.docentes ?? []).map((docente) => [docente.id, docente]),
    ).values(),
  ];
  return (
    <>
      <section id="materias-y-correlatividades" className="scroll-mt-52">
        <h2 className="text-2xl font-bold">Materias y correlatividades</h2>
        {/* Texto definitivo de la devolución de Edith §4 (Mapa del Sitio V3 §4). */}
        <p className="mt-2 text-sm text-texto-suave">
          A continuación encontrarás el listado de asignaturas de la carrera y el año/cuatrimestre
          al cual pertenecen. Para detalles sobre el régimen de correlatividades asociado, podés
          revisar atentamente el plan de estudios.
        </p>
        {consulta.isError || materias.isError ? (
          <p role="alert">
            No se pudo consultar la información académica. Volvé a cargar la página.
          </p>
        ) : existePlan && consulta.isPending ? (
          <p role="status">Cargando materias…</p>
        ) : filas.length ? (
          <div className="mt-4 overflow-x-auto rounded-xl border border-borde-suave bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="p-3">Año</th>
                  <th className="p-3">Cuatrimestre</th>
                  <th className="p-3">Materia</th>
                </tr>
              </thead>
              <tbody>
                {filas.map((fila) => (
                  <tr key={fila.materia.id} className="border-t border-borde-suave">
                    <td className="p-3">{fila.anio}</td>
                    <td className="p-3">{fila.cuatrimestre ?? '—'}</td>
                    <td className="p-3">{fila.materia.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4">
            Las materias se publican cuando estén cargadas. Podés consultar el documento del plan de
            estudios.
          </p>
        )}
      </section>
      <section id="cuerpo-docente" className="scroll-mt-52">
        <h2 className="text-2xl font-bold">Cuerpo docente</h2>
        {docentes.length ? (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {docentes.map((docente) => (
              <li key={docente.id} className="rounded-lg border border-borde-suave bg-white p-4">
                {docente.nombre} {docente.apellido}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">
            La nómina se publica cuando esté vinculada a las materias del plan.
          </p>
        )}
      </section>
    </>
  );
}
