"use client";

import HeaderLogin from '@/app/components/headerLogin';
import React, { useEffect, useState } from 'react';

interface User {
    nombre: string;
    apellido: string;
    loginTime: string;
    selectedVia?: string;
}

const Select: React.FC = () => {
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserData({
                ...parsedUser,
                loginTime: new Date(parsedUser.loginTime).toLocaleString(),
            });
        }
    }, [apiHost]);

    const handleViaSelection = (via: string) => {
        if (userData) {
            const updatedUser = { ...userData, selectedVia: via };

            localStorage.setItem("user", JSON.stringify(updatedUser));

            window.location.href = `/pages/empleado/dashboardEmpleado/${via}`;
        }
    };

    return (
        <div>
            <HeaderLogin />
            <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex flex-col items-center justify-center text-center">
                <div className="p-4">
                    <div className="mb-4 text-gray-600">
                        <p>
                            Bienvenido, <strong>{userData?.nombre} {userData?.apellido}</strong>
                        </p>
                        <p>Sesión iniciada: {userData?.loginTime}</p>
                    </div>
                    <div>
                        <h2>Seleccione una vía</h2>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <a
                            onClick={() => handleViaSelection('via1')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                        >
                            Vía 1
                        </a>
                        <a
                            onClick={() => handleViaSelection('via2')}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                        >
                            Vía 2
                        </a>
                        <a
                            onClick={() => handleViaSelection('via3')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                        >
                            Vía 3
                        </a>
                        <a
                            onClick={() => handleViaSelection('via4')}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                        >
                            Vía 4
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Select;
