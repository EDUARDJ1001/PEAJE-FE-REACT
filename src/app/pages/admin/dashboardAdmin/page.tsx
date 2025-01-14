import HeaderAdmin from "@/app/components/headerAdmin";
import SidebarAdmin from "@/app/components/sideBar";

const DashboardAdmin = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <HeaderAdmin />
            <div className="flex flex-1">
                <SidebarAdmin />
                <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Panel de Administracion</h1>
                    <p className="text-lg text-gray-600 mb-6">Bienvenido al panel de administrador de peaje</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
