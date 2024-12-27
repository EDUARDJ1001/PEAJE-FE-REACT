
const HeaderLogin = () => {
    return (
      <header className="flex justify-between items-center p-4 bg-gray-700 text-white">
        {/* Logo en la esquina izquierda */}
        <img
          src="/img/EKKO_LOGO.png"
          alt="Logo Ekko"
          className="h-10 w-10"
        />
  
        {/* <a
          href="/pages/homepage"
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Volver a Inicio
        </a> */}
  
        <img
          src="/img/municipalidad.png"
          alt="Logo Municipalidad"
          className="h-10 w-10"
        />
      </header>
    );
  };
  
  export default HeaderLogin;
  