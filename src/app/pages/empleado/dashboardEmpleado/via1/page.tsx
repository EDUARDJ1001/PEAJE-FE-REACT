"use client";

import Header from "@/app/components/header";
import React, { useEffect, useState } from "react";

interface User {
    id: number;
    nombre: string;
    apellido: string;
    loginTime: string;
}

interface Boleto {
    Descripcion: string;
    Valor: number;
}

const TicketsEmpleadosV1: React.FC = () => {
    const [buttonData, setButtonData] = useState<Boleto[]>([]);
    const [userData, setUserData] = useState<User | null>(null);
    const [ticketCounter, setTicketCounter] = useState(1);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST || "";

    const imagePaths = [
        "/img/2_ejes.png",
        "/img/3_ejes.png",
        "/img/4_ejes.png",
        "/img/5_ejes.png",
        "/img/6_ejes.png",
        "/img/7_ejes.png",
    ];

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserData({
                ...parsedUser,
                loginTime: new Date(parsedUser.loginTime).toLocaleString(),
            });
            setTicketCounter(1);
        }

        const fetchButtonData = async () => {
            try {
                const response = await fetch(`${apiHost}/api/valor-boletos`);
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                const data = await response.json();
                setButtonData(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching data:", error);
                setButtonData([]);
            }
        };

        fetchButtonData();

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            const confirmationMessage = "¿Estás seguro de que quieres salir de esta página?";
            event.returnValue = confirmationMessage;
            return confirmationMessage;
        };

        const handlePopState = (event: PopStateEvent) => {
            const confirmation = window.confirm("¿Estás seguro de que quieres salir?");
            if (!confirmation) {
                window.history.pushState(null, "", window.location.href);
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);

        window.history.pushState(null, "", window.location.href);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [apiHost]);

    const obtenerUltimoId = async () => {
        try {
            const response = await fetch(`${apiHost}/api/contador/ultimo-id`);
            if (!response.ok) {
                throw new Error("Error al obtener el último ID");
            }
            const data = await response.json();
            return data.id;
        } catch (error) {
            console.error("Error al obtener el último ID:", error);
            return null;
        }
    };

    const actualizarConteoBoletos = async (boleto: Boleto) => {
        try {
            const insertarResponse = await fetch(`${apiHost}/api/contador/insert`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!insertarResponse.ok) {
                throw new Error("Error al insertar nuevo ID");
            }

            console.log("Nuevo ID insertado con éxito");

            const response = await fetch(`${apiHost}/api/conteo-boletos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    descripcion: boleto.Descripcion,
                    valor: boleto.Valor,
                }),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar conteo de boletos");
            }
            console.log("Conteo de boletos actualizado con éxito");
        } catch (error) {
            console.error("Error al actualizar conteo de boletos:", error);
        }
    };

    const imprimirTicket = async (boleto: Boleto) => {
        const ultimoId = await obtenerUltimoId();
        if (ultimoId === null) {
            console.error("No se pudo obtener el último ID");
            return;
        }
    
        const ticketNumber = ultimoId.toString().padStart(10, "0");
        
        const ticketContent = `
        <html>
        <head>
            <title>Ticket</title>
            <style>
                @page {
                    size: auto; 
                    margin: 5; 
                }
                @media print {
                    body { 
                        font-family: Arial, sans-serif; 
                        text-align: center; 
                        margin: 5; 
                        padding: 0; 
                        display: flex;
                        justify-content: center;
                        align-items: flex-start;
                        height: auto;
                        overflow: hidden;
                    }
                    .ticket {
                        width: 200mm;
                        padding: 1px;
                        margin: 0 auto;
                        display: block;
                    }
                    .ticket h1 {
                        font-size: 14mm;
                        margin: 2px 0;
                    }
                    .ticket h2 {
                        font-size: 16mm;
                        margin: 2px 0;
                    }
                    .ticket p {
                        font-size: 14mm;
                        margin: 2px 0;
                    }
                }
            </style>
        </head>
        <body>
            <div class="ticket">
                <h1>Municipalidad de Puerto Cortés</h1>
                <h2>RTN 03019000044953</h2>
                <p>Estación: PUERTO CORTÉS | Via #1</p>
                <p><strong>Ticket No.V1${ticketNumber}</strong></p>
                <p>Operador No.${userData?.id}</p>
                <p>Fecha: ${new Date().toLocaleString()}</p>
                <p>Vehículo: ${boleto.Descripcion}</p>
                <p><strong>Total: L. ${Number(boleto.Valor).toFixed(2)}</strong></p>
                <p>Contribución por mejoras</p>
            </div>
        </body>
        </html>
        `;

        const confirmacion = window.confirm("¿Está seguro de que desea imprimir este ticket?");
        if (!confirmacion) {
            console.log("El usuario canceló la impresión. No se guardará el ticket.");
            return; 
        }
    
        const printWindow = window.open("", "", "width=600,height=600");
        if (printWindow) {
            printWindow.document.write(ticketContent);
            printWindow.document.close();
            printWindow.print();
    
            await actualizarConteoBoletos(boleto);
    
            setTimeout(() => printWindow.close(), 4000);
        }
    };
    

    return (
        <div>
            <Header />
            <div className="p-4">
                {userData ? (
                    <div className="mb-4 text-gray-600">
                        <p>
                            Bienvenido, <strong>{userData.nombre} {userData.apellido}</strong>
                        </p>
                        <p>Sesión iniciada: {userData.loginTime}</p>
                        <p>Via #1</p>
                    </div>
                ) : (
                    <p className="text-gray-500">Cargando información del usuario...</p>
                )}
            </div>
            <div className="h-screen w-full overflow-y-auto bg-gray-50">
                <div className="grid grid-cols-2 gap-4 p-4">
                    {buttonData.length > 0 ? (
                        buttonData.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-2"
                            >
                                <img
                                    src={imagePaths[index % imagePaths.length]}
                                    alt={`Imagen ${item.Descripcion}`}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <p className="text-black mt-2">{item.Descripcion || "N/A"}</p>
                                <button
                                    onClick={() => imprimirTicket(item)}
                                    className="w-24 h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md"
                                >
                                    {item.Valor !== undefined && item.Valor !== null && !isNaN(Number(item.Valor))
                                        ? `L. ${Number(item.Valor).toFixed(2)}`
                                        : "N/A"}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No hay datos disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TicketsEmpleadosV1;