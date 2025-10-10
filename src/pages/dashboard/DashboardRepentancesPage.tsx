import { TableArrepentimiento } from "../../components/dashboard";
import { Loader } from "../../components/shared/Loader";
import { useAllArrepentimientos } from "../../hooks";

export const DashboardRepentancesPage = () => {
  const { data, isLoading } = useAllArrepentimientos();

  if (isLoading || !data) return <Loader />;

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Solicitudes de arrepentimiento</h1>
      <TableArrepentimiento arrepentimientos={data} />
    </div>
  );
};
