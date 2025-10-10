import { formatDateLong } from '../../../helpers'; // si tenés este helper, si no podés mostrar created_at directo
import { useNavigate } from 'react-router-dom';

// 🔹 Interfaz del formulario (igual a la que usaste en BotonArrepentimiento)
type ArrepentimientoForm = {
  id?: number;
  nombre: string;
  email: string;
  pedido: string;
  alias: string;
  motivo?: string;
  created_at?: string;
  estado?: string; // opcional, por si querés marcar como "Pendiente", "Revisado", etc.
};

interface Props {
  arrepentimientos: ArrepentimientoForm[];
}

// 🔹 Opciones de estado (por si querés manejarlas desde el dashboard)
const statusOptions = [
  { value: 'Pendiente', label: 'Pendiente' },
  { value: 'En revisión', label: 'En revisión' },
  { value: 'Resuelto', label: 'Resuelto' },
];

// 🔹 Encabezados de la tabla
const tableHeaders = ['Nombre', 'Email', 'Pedido', 'Alias', 'Motivo', 'Fecha', 'Estado'];

export const TableArrepentimiento = ({ arrepentimientos }: Props) => {
  const navigate = useNavigate();

  const handleStatusChange = (id: number, nuevoEstado: string) => {
    console.log(`Cambio de estado para ID ${id}: ${nuevoEstado}`);
    // Acá podrías llamar a Supabase para actualizar el estado
  };

  return (
    <div className='relative w-full h-full'>
      <table className='text-sm w-full caption-bottom overflow-auto'>
        <thead className='border-b border-gray-200 pb-3'>
          <tr className='text-sm font-bold'>
            {tableHeaders.map((header, index) => (
              <th key={index} className='h-12 px-4 text-left'>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className='[&_tr:last-child]:border-0'>
          {arrepentimientos?.map((item) => (
            <tr
              key={item.id}
              className='cursor-pointer hover:bg-gray-200 transition-colors duration-200'
              onClick={() => navigate(`/dashboard/arrepentimientos/${item.id}`)}
            >
              <td className='p-4 font-medium tracking-tighter'>{item.nombre}</td>
              <td className='p-4 font-medium tracking-tighter'>{item.email}</td>
              <td className='p-4 font-medium tracking-tighter'>{item.pedido}</td>
              <td className='p-4 font-medium tracking-tighter'>{item.alias}</td>
              <td className='p-4 font-medium tracking-tighter'>
                {item.motivo || '—'}
              </td>
              <td className='p-4 font-medium tracking-tighter'>
                {item.created_at ? formatDateLong(item.created_at) : '—'}
              </td>
              <td className='p-4 font-medium tracking-tighter'>
                <select
                  value={item.estado || 'Pendiente'}
                  onClick={(e) => e.stopPropagation()}
                  className='border border-gray-300 p-2 rounded'
                  onChange={(e) =>
                    handleStatusChange(item.id ?? 0, e.target.value)
                  }
                >
                  {statusOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
