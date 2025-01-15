import HeaderAdmin from "@/app/components/headerAdmin";
import SidebarAdmin from "@/app/components/sideBar";


const Actividad = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <HeaderAdmin />
      <div className="flex flex-1">
        <SidebarAdmin />
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Generar de Reportes Por Vias</h1>
          <p className="text-lg text-gray-600 mb-6">Aquí podrá seleccionar la via de la cual requiera generar reporte</p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/pages/admin/reportes/generar/via1"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Via 1
            </a>
            <a
              href="/pages/admin/reportes/generar/via2"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Via 2
            </a>
            <a
              href="/pages/admin/reportes/generar/via3"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Via 3
            </a>
            <a
              href="/pages/admin/reportes/generar/via4"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Via 4
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actividad;
