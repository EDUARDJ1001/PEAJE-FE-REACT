"use client";

import React, { useEffect, useState } from "react";

const EditarEmpleado: React.FC = () => {
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const [empleado, setEmpleado] = useState({
        Id: 0,
        Nombre: "",
        Apellido: "",
        Identidad: "",
        Cargo_Id: "",
        Genero_Id: "",
        Password: "",
        Username: "",
    });
    const [cargos, setCargos] = useState<{ Id: string; Descripcion: string }[]>([]);
    const id = new URLSearchParams(window.location.search).get("id");

    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get("id");
        console.log("ID obtenido de la URL:", id);

        const fetchEmpleado = async () => {
            if (id) {
                try {
                    console.log("Cargando empleado...");
                    const response = await fetch(`${apiHost}/api/empleados/${id}`);
                    const data = await response.json();
                    console.log("Empleado cargado:", data);
                    setEmpleado(data);
                } catch (error) {
                    console.error("Error al cargar empleado:", error);
                }
            }
        };

        const fetchOpciones = async () => {
            try {
                console.log("Cargando opciones de cargos...");
                const response = await fetch(`${apiHost}/api/empleados/opciones`);
                const data = await response.json();
                console.log("Opciones de cargos cargadas:", data);
                setCargos(data.cargos);
            } catch (error) {
                console.error("Error al cargar opciones:", error);
            }
        };

        fetchEmpleado();
        fetchOpciones();
    }, [apiHost]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEmpleado({ ...empleado, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiHost}/api/empleados/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(empleado),
            });

            if (response.ok) {
                alert("Empleado actualizado correctamente.");
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error al actualizar empleado:", error);
            alert("Hubo un problema al actualizar el empleado.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">Editar Empleado</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Nombre:</label>
                        <input
                            type="text"
                            name="Nombre"
                            value={empleado.Nombre}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Apellido:</label>
                        <input
                            type="text"
                            name="Apellido"
                            value={empleado.Apellido}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Identidad:</label>
                        <input
                            type="text"
                            name="Identidad"
                            value={empleado.Identidad}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Username:</label>
                        <input
                            type="text"
                            name="Username"
                            value={empleado.Username}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Cargo:</label>
                        <select
                            name="Cargo_Id"
                            value={empleado.Cargo_Id}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Seleccione un cargo</option>
                            {cargos.map((cargo) => (
                                <option key={cargo.Id} value={cargo.Id}>
                                    {cargo.Descripcion}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Contraseña:</label>
                        <input
                            type="password"
                            name="Password"
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditarEmpleado;
