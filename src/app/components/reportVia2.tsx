"use client";

import HeaderAdmin from "@/app/components/headerAdmin";
import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";

interface User {
    nombre: string;
    apellido: string;
    loginTime: string;
}

interface ConteoBoleto {
    Descripcion: string;
    Valor: number;
    Cantidad: number;
    Total?: number;
}

interface Billete {
    denominacion: string;
    valor: number;
    cantidad: number;
}

const ReportVia1: React.FC = () => {
    const [userData, setUserData] = useState<User | null>(null);
    const [conteoBoletos, setConteoBoletos] = useState<ConteoBoleto[]>([]);
    const [billetes, setBilletes] = useState<Billete[]>([
        { denominacion: "1 lempira", valor: 1, cantidad: 0 },
        { denominacion: "2 lempiras", valor: 2, cantidad: 0 },
        { denominacion: "5 lempiras", valor: 5, cantidad: 0 },
        { denominacion: "10 lempiras", valor: 10, cantidad: 0 },
        { denominacion: "20 lempiras", valor: 20, cantidad: 0 },
        { denominacion: "50 lempiras", valor: 50, cantidad: 0 },
        { denominacion: "100 lempiras", valor: 100, cantidad: 0 },
        { denominacion: "200 lempiras", valor: 200, cantidad: 0 },
        { denominacion: "500 lempiras", valor: 500, cantidad: 0 },
    ]);
    const [formData, setFormData] = useState({
        via: "1",
        operador: "",
        turno: "A",
        apertura: "6:00 am",
        cierre: "6:00 pm",
    });

    const totalBilletes = billetes.reduce(
        (acc, billete) => acc + billete.valor * billete.cantidad,
        0
    );

    const totalConteoBoletos = conteoBoletos.reduce(
        (acc, boleto) => acc + boleto.Valor * boleto.Cantidad,
        0
    );

    const diferencia = totalBilletes - totalConteoBoletos;

    const handleBilleteChange = (index: number, cantidad: number) => {
        const updatedBilletes = [...billetes];
        updatedBilletes[index].cantidad = cantidad;
        setBilletes(updatedBilletes);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const apiHost = process.env.NEXT_PUBLIC_API_HOST || "";

    useEffect(() => {
        fetch(`${apiHost}/api/conteo-boletos-v2`)
            .then((res) => res.json())
            .then((data) => setConteoBoletos(data))
            .catch((err) => console.error("Error al cargar conteo de boletos:", err));

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserData({
                ...parsedUser,
                loginTime: new Date(parsedUser.loginTime).toLocaleString(),
            });
        }
    }, [apiHost]);

    const limpiarConteoBoletos = async () => {
        try {
            const response = await fetch(`${apiHost}/api/conteo-boletos-v2/limpiar-conteo-boletos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Error al limpiar la tabla Conteo_Boletos");
            }

            console.log("Tabla Conteo_Boletos limpiada exitosamente.");
        } catch (error) {
            console.error("Error al limpiar la tabla Conteo_Boletos:", error);
        }
    };

    const generatePDF = async () => {
        if (typeof window !== "undefined") {
            const content = document.getElementById("report-content");

            if (content) {
                const selectElements = content.querySelectorAll("select");
                selectElements.forEach((select) => {
                    const selectedOption = select.options[select.selectedIndex];
                    const span = document.createElement("span");
                    span.textContent = selectedOption ? selectedOption.text : "";
                    select.parentNode?.replaceChild(span, select);
                });
            }

            const fechaActual = new Date().toLocaleDateString("es-HN", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            });

            const nombreArchivo = `reporte cierre de boleteria ${fechaActual}.pdf`;

            const options = {
                filename: nombreArchivo,
                margin: [10, 10, 10, 10],
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };

            if (content) {
                await html2pdf().set(options).from(content).save();
                await limpiarConteoBoletos();
            }
        }
    };



    return (
        <div>
            <HeaderAdmin />
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Generación de Reporte Nuevo</h1>
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
                            <h2 className="text-xl font-bold">CIERRE DE BOLETERÍA</h2>
                            <p className="text-lg">DEPARTAMENTO DE PEAJE</p>
                            <p className="text-lg">MUNICIPIO DE PUERTO CORTÉS</p>
                            <p className="text-lg">Fecha: {new Date().toLocaleDateString()}</p>
                            <div className="flex justify-between mt-2">
                                <div>
                                    <p>Via #1</p>
                                </div>
                                <div>
                                    <p>
                                        Operador: {userData?.nombre} {userData?.apellido}
                                    </p>
                                </div>
                                <div>
                                    <label>Turno:</label>
                                    <select
                                        name="turno"
                                        value={formData.turno}
                                        onChange={handleFormChange}
                                        className="ml-2 p-2 border rounded-md"
                                    >
                                        {["A", "B", "C"].map((turno) => (
                                            <option key={turno} value={turno}>
                                                {turno}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div>
                                    <p>Apertura: {userData?.loginTime}</p>
                                </div>
                                <div>
                                    <label>Cierre:</label>
                                    <select
                                        name="cierre"
                                        value={formData.cierre}
                                        onChange={handleFormChange}
                                        className="ml-2 p-2 border rounded-md"
                                    >
                                        {["6:00 am", "2:00 pm", "10:00 pm"].map((hora) => (
                                            <option key={hora} value={hora}>
                                                {hora}
                                            </option>
                                        ))}
                                    </select>
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
                        <div>
                            <h2 className="text-lg font-bold mb-4">Conteo de Billetes</h2>
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 p-2">Denominación</th>
                                        <th className="border border-gray-300 p-2">Cantidad</th>
                                        <th className="border border-gray-300 p-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {billetes.map((billete, index) => (
                                        <tr key={index} className="even:bg-gray-50">
                                            <td className="border border-gray-300 p-2">{billete.denominacion}</td>
                                            <td className="border border-gray-300 p-2">
                                                <input
                                                    type="number"
                                                    value={billete.cantidad}
                                                    onChange={(e) =>
                                                        handleBilleteChange(index, Number(e.target.value))
                                                    }
                                                    className="w-full p-2 border rounded-md"
                                                />
                                            </td>
                                            <td className="border border-gray-300 p-2">
                                                {(billete.valor * billete.cantidad).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-gray-200">
                                        <td colSpan={2} className="border border-gray-300 p-2 font-bold text-right">
                                            Total en Billetes
                                        </td>
                                        <td className="border border-gray-300 p-2 font-bold">
                                            {totalBilletes.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td colSpan={2} className="border border-gray-300 p-2 font-bold text-right">
                                            Diferencia
                                        </td>
                                        <td
                                            className={`border border-gray-300 p-2 font-bold ${diferencia < 0
                                                ? 'text-red-500'
                                                : diferencia > 0
                                                    ? 'text-green-500'
                                                    : 'text-black'
                                                }`}
                                        >
                                            {diferencia.toFixed(2)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="mt-8">
                            <div className="mt-8">
                                <div className="flex justify-between mt-8">
                                    <div className="flex flex-col items-center">
                                        <hr className="border-t-4 border-gray-600 mt-2 w-48" />
                                        <p>Firma de Operador</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <hr className="border-t-4 border-gray-600 mt-2 w-48" />
                                        <p>Firma de Supervisor</p>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-8">
                                    <div className="flex flex-col items-center">
                                        <hr className="border-t-4 border-gray-600 mt-2 w-48" />
                                        <p>Firma de Tesorero</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <hr className="border-t-4 border-gray-600 mt-2 w-48" />
                                        <p>Firma de Validador</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={generatePDF}
                            className="bg-blue-600 text-white py-2 px-6 rounded shadow-md hover:bg-blue-700"
                        >
                            Descargar Reporte
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportVia1;
