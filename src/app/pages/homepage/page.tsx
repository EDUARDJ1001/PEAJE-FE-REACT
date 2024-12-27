import HeaderHomepage from "@/app/components/headerHomepage";

const Homepage = () => {
  return (
    <div>
      <HeaderHomepage/>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-white mb-6">PEAJE PUERTO CORTÉS</h1>
      <p className="text-2xl font-bold mb-6 text-white">Bienvenido</p>
      <div className="flex flex-col space-y-4">
        <a 
          href="/pages/login" 
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Iniciar Sesion
        </a>
      </div>
    </div>
    </div>
  );
};

export default Homepage;
