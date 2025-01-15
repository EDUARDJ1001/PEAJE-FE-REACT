const SidebarAdmin = () => {
    return (
        <div className="card w-72 bg-white p-5 shadow-md shadow-purple-200/50 rounded-md">
            <ul className="w-full flex flex-col gap-2">
                <li
                    className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
                >
                    <a
                        href="/pages/admin/empleados/gestion"
                        className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-cyan-100 hover:shadow-inner focus:bg-gradient-to-r from-cyan-400 to-cyan-600 focus:text-white text-gray-700 transition-all ease-linear"
                    >
                        <svg
                            stroke="#000000"
                            className="icon glyph size-6 group-focus:fill-white group-focus:stroke-white"
                            id="dashboard-alt"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#000000"
                        >
                            <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                id="SVGRepo_tracerCarrier"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M14,10V22H4a2,2,0,0,1-2-2V10Z"></path>
                                <path d="M22,10V20a2,2,0,0,1-2,2H16V10Z"></path>
                                <path d="M22,4V8H2V4A2,2,0,0,1,4,2H20A2,2,0,0,1,22,4Z"></path>
                            </g>
                        </svg>
                        Gestion de Empleados
                    </a>
                </li>
                <li
                    className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
                >
                    <a
                        href="/pages/admin/reportes"
                        className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-cyan-100 hover:shadow-inner focus:bg-gradient-to-r from-cyan-400 to-cyan-600 focus:text-white text-gray-700 transition-all ease-linear"
                    >
                        <svg
                            stroke="#000000"
                            className="icon glyph size-6 group-focus:fill-white group-focus:stroke-white"
                            id="dashboard-alt"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#000000"
                        >
                            <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                id="SVGRepo_tracerCarrier"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M14,10V22H4a2,2,0,0,1-2-2V10Z"></path>
                                <path d="M22,10V20a2,2,0,0,1-2,2H16V10Z"></path>
                                <path d="M22,4V8H2V4A2,2,0,0,1,4,2H20A2,2,0,0,1,22,4Z"></path>
                            </g>
                        </svg>
                        Reportes
                    </a>
                </li>
                <li
                    className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
                >
                    <a
                        href="/pages/admin/actividad"
                        className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-cyan-100 hover:shadow-inner focus:bg-gradient-to-r from-cyan-400 to-cyan-600 focus:text-white text-gray-700 transition-all ease-linear"
                    >
                        <svg
                            stroke="#000000"
                            className="icon glyph size-6 group-focus:fill-white group-focus:stroke-white"
                            id="dashboard-alt"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#000000"
                        >
                            <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                id="SVGRepo_tracerCarrier"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M14,10V22H4a2,2,0,0,1-2-2V10Z"></path>
                                <path d="M22,10V20a2,2,0,0,1-2,2H16V10Z"></path>
                                <path d="M22,4V8H2V4A2,2,0,0,1,4,2H20A2,2,0,0,1,22,4Z"></path>
                            </g>
                        </svg>
                        Actividad de Vias
                    </a>
                </li>
                <li
                    className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
                >
                    <a
                        href="/pages/admin/logs"
                        className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-cyan-100 hover:shadow-inner focus:bg-gradient-to-r from-cyan-400 to-cyan-600 focus:text-white text-gray-700 transition-all ease-linear"
                    >
                        <svg
                            stroke="#000000"
                            className="icon glyph size-6 group-focus:fill-white group-focus:stroke-white"
                            id="dashboard-alt"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#000000"
                        >
                            <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                id="SVGRepo_tracerCarrier"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M14,10V22H4a2,2,0,0,1-2-2V10Z"></path>
                                <path d="M22,10V20a2,2,0,0,1-2,2H16V10Z"></path>
                                <path d="M22,4V8H2V4A2,2,0,0,1,4,2H20A2,2,0,0,1,22,4Z"></path>
                            </g>
                        </svg>
                        Logs de Usuarios
                    </a>
                </li>
                <li
                    className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
                >
                    <a
                        href="/pages/admin/select"
                        className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-cyan-100 hover:shadow-inner focus:bg-gradient-to-r from-cyan-400 to-cyan-600 focus:text-white text-gray-700 transition-all ease-linear"
                    >
                        <svg
                            stroke="#000000"
                            className="icon glyph size-6 group-focus:fill-white group-focus:stroke-white"
                            id="dashboard-alt"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#000000"
                        >
                            <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                id="SVGRepo_tracerCarrier"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M14,10V22H4a2,2,0,0,1-2-2V10Z"></path>
                                <path d="M22,10V20a2,2,0,0,1-2,2H16V10Z"></path>
                                <path d="M22,4V8H2V4A2,2,0,0,1,4,2H20A2,2,0,0,1,22,4Z"></path>
                            </g>
                        </svg>
                        Impresion de Tickets
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default SidebarAdmin;