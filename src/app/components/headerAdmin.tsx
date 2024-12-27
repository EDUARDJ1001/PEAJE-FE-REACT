const HeaderAdmin = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-700 text-white">
          {/* Contenedor para las imágenes, alineadas a la izquierda */}
          <div className="flex items-center">
            <img
                src="/img/EKKO_LOGO.png"
                alt="Logo Ekko"
                className="h-10 w-10 mr-4"
            />

            <img
                src="/img/municipalidad.png"
                alt="Logo Municipalidad"
                className="h-10 w-10"
            />
          </div>

          {/* Contenedor para los botones, alineados a la derecha */}
          <div className="flex items-center space-x-4">
            <a
                href="/pages/admin/dashboardAdmin"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg"
            >
                Volver al Panel
            </a>

            <a
                href="/pages/login"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg"
            >
                Cerrar Sesion
            </a>
          </div>
      </header>
    );
};

export default HeaderAdmin;
