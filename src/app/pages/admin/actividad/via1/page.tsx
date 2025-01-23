"use client";

import HeaderAdmin from "@/app/components/headerAdmin";
import SidebarAdmin from "@/app/components/sideBar";
import React, { useState, useEffect } from "react";

interface User {
    nombre: string;
    apellido: string;
    loginTime: string;
}

interface Empleado {
    id: number;
    Nombre: string;
    Apellido: string;
    LoginTime: string;
    isLoggedIn: boolean;
    SelectedVia: number;
}


interface ConteoBoleto {
    Descripcion: string;
    Valor: number;
    Cantidad: number;
    Total?: number;
}

const ActividadVia1: React.FC = () => {
    const [userData, setUserData] = useState<User | null>(null);
    const [conteoBoletos, setConteoBoletos] = useState<ConteoBoleto[]>([]);
    const totalConteoBoletos = conteoBoletos.reduce(
        (acc, boleto) => acc + boleto.Valor * boleto.Cantidad,
        0
    );
    const apiHost = process.env.NEXT_PUBLIC_API_HOST || "";

    useEffect(() => {
            fetch(`${apiHost}/api/conteo-boletos`)
                .then((res) => res.json())
                .then((data) => {
                    setConteoBoletos(data);
                })
                .catch((err) => console.error("Error al cargar conteo de boletos:", err));
    
            fetch(`${apiHost}/api/empleados`)
                .then((res) => res.json())
                .then((data: Empleado[]) => {
                    const loggedUser = data.find(
                        (empleado) => empleado.isLoggedIn && empleado.SelectedVia === 1
                    );
    
                    if (loggedUser) {
                        setUserData({
                            nombre: loggedUser.Nombre,
                            apellido: loggedUser.Apellido,
                            loginTime: new Date(loggedUser.LoginTime).toLocaleString(),
                        });
                    } else {
                        alert("No hay usuarios en la vía 1.");
                    }
                })
                .catch((err) => console.error("Error al cargar empleados:", err));
    
        }, [apiHost]);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <HeaderAdmin />
            <div className="flex flex-1">
                <SidebarAdmin/>
                <div className="container mx-auto p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Actividad de Via #2</h1>
                    <div className="p-6 space-y-8">
                        <div id="report-content">
                            <div className="flex justify-between items-center">
                                <img
                                    src="/img/municipalidad.png"
                                    alt="Logo Municipalidad"
                                    className="h-14 w-14"
                                />
                                <img
                                    src="/img/PEAJE.png"
                                    alt="Logo peaje"
                                    className="h-14 w-16"
                                />
                            </div>
                            <div className="mb-4 text-center">
                                <h2 className="text-xl font-bold">ACTIVIDAD VIA #2</h2>
                                <p className="text-lg">DEPARTAMENTO DE PEAJE</p>
                                <p className="text-lg">MUNICIPIO DE PUERTO CORTÉS</p>
                                <p className="text-lg">FECHA: {new Date().toLocaleDateString()}</p>
                                <div className="flex justify-between mt-2">
                                    <div>
                                        <p>VIA #2</p>
                                    </div>
                                    <div>
                                        <p>
                                            OPERADOR: {userData?.nombre} {userData?.apellido}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <div>
                                        <p>INICIO DE SESION: {userData?.loginTime}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold mb-4">Conteo de Boletos</h2>
                                <table className="table-auto w-full border-collapse border border-gray-300">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border border-gray-300 p-2">Tipo Boleto</th>
                                            <th className="border border-gray-300 p-2">Valor Boleto</th>
                                            <th className="border border-gray-300 p-2">Cantidad</th>
                                            <th className="border border-gray-300 p-2">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {conteoBoletos.length > 0 ? (
                                            conteoBoletos.map((boleto, index) => (
                                                <tr key={index} className="even:bg-gray-50">
                                                    <td className="border border-gray-300 p-2">{boleto.Descripcion}</td>
                                                    <td className="border border-gray-300 p-2">{boleto.Valor}</td>
                                                    <td className="border border-gray-300 p-2">{boleto.Cantidad}</td>
                                                    <td className="border border-gray-300 p-2">{boleto.Total || '0.00'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="border border-gray-300 p-2 text-center">
                                                    No hay datos disponibles
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-gray-100">
                                            <td colSpan={3} className="border border-gray-300 p-2 font-bold text-right">
                                                Total en Boletos
                                            </td>
                                            <td className="border border-gray-300 p-2 font-bold">
                                                {totalConteoBoletos.toFixed(2)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActividadVia1;