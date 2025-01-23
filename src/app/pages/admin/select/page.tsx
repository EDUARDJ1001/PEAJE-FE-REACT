"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeaderAdmin from "@/app/components/headerAdmin";

interface User {
    nombre: string;
    apellido: string;
    loginTime: string;
}

const Select: React.FC = () => {
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const router = useRouter();
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserData({
                ...parsedUser,
                loginTime: new Date(parsedUser.loginTime).toLocaleString(),
            });
        }
    }, []);

    const handleViaSelection = async (via: number) => {
        if (!apiHost) {
            setError("El host de la API no está configurado.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem("token");

            if (!token) {
                setError("Usuario no autenticado.");
                return;
            }

            const response = await fetch(`${apiHost}/api/auth/updateSelectedVia`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ selectedVia: via }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(`Error al actualizar la vía: ${errorData.message}`);
                return;
            }

            const data = await response.json();

            router.push(`/pages/admin/tickets/via${via}`);
        } catch (error) {
            console.error("Error al seleccionar la vía:", error);
            setError("Ocurrió un error al intentar seleccionar la vía.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <HeaderAdmin />
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
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {[1, 2, 3, 4].map((via) => (
                            <button
                                key={via}
                                onClick={() => handleViaSelection(via)}
                                disabled={loading}
                                className={`${via % 2 === 0 ? "bg-orange-600 hover:bg-orange-700" : "bg-blue-600 hover:bg-blue-700"
                                    } text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                                aria-label={`Seleccionar Vía ${via}`}
                            >
                                Vía {via}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Select;
