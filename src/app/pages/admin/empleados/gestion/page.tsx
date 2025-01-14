import HeaderAdmin from "@/app/components/headerAdmin";
import SidebarAdmin from "@/app/components/sideBar";

const EmpleadosAdmin = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <HeaderAdmin />
            <div className="flex flex-1">
                <SidebarAdmin />
                <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Bienvenido al Panel de Gestion de Empleados</h1>
                    <p className="text-lg text-gray-600 mb-6">Aquí podrá gestionar usuarios</p>

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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpleadosAdmin;
