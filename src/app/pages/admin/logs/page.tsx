import HeaderAdmin from "@/app/components/headerAdmin";
import SidebarAdmin from "@/app/components/sideBar";


const LogsView = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <HeaderAdmin />
      <div className="flex flex-1">
        <SidebarAdmin />
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Vista de Logs</h1>
          <p className="text-lg text-gray-600 mb-6">Aquí podrá visualizar logs de usuarios</p>
        </div>
      </div>
    </div>
  );
};

export default LogsView;
