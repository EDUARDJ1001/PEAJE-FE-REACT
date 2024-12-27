import HeaderAdmin from "@/app/components/headerAdmin";


const DashboardAdmin = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <HeaderAdmin />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Bienvenido al Dashboard de Administrador</h1>
        <p className="text-lg text-gray-600 mb-6">Aquí podrá gestionar usuarios, reportes y vías.</p>
        
        <div className="flex flex-wrap gap-4">
          <a
            href="/pages/admin/empleados/registrar"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Registrar Nuevo Empleado
          </a>
          <a
            href="/pages/admin/empleados/listarEmpleados"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Gestionar Empleados Existentes
          </a>
          <a
            href="/pages/admin/reportes"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Reportes
          </a>
          <a
            href="/pages/admin/actividad"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Ver Actividad de Via
          </a>
          <a
            href="/pages/admin/logs"
            className="bg-blue-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Ver Logs de Usuarios
          </a>
          <a
            href="/pages/admin/tickets"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Imprimir Tickets
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
