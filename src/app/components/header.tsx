const Header = () => {
  const handleLogout = () => {
      // Limpiar el localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/pages/homepage';
  };

  return (
      <header className="flex justify-between items-center p-4 bg-gray-700 text-white">
          <img
              src="/img/EKKO_LOGO.png"
              alt="Logo Ekko"
              className="h-10 w-10"
          />

          <img
              src="/img/municipalidad.png"
              alt="Logo Municipalidad"
              className="h-10 w-10"
          />

          {/* Botón para volver a la página de inicio */}
          <a
              href="/pages/homepage"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg ml-auto"
          >
              Volver a Inicio
          </a>

          {/* Botón para cerrar sesión */}
          <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ml-4"
          >
              Cerrar Sesión
          </button>
      </header>
  );
};

export default Header;
