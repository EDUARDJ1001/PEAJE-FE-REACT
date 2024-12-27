const HeaderHomepage = () => {
    return (
      <header className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white">
        {/* Logo en la esquina izquierda */}
        <img
          src="/img/EKKO_LOGO.png"
          alt="Logo Ekko"
          className="h-16 w-16"
        />
    
        {/* Logo de la municipalidad */}
        <img
          src="/img/municipalidad.png"
          alt="Logo Municipalidad"
          className="h-16 w-16"
        />
      </header>
    );
  };
  
  export default HeaderHomepage;
  