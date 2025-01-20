"use client";

import HeaderAdmin from "@/app/components/headerAdmin";
import SidebarAdmin from "@/app/components/sideBar";
import React, { useEffect, useState } from "react";

const RegistrarEmpleado: React.FC = () => {
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const [cargos, setCargos] = useState<{ Id: number; Descripcion: string }[]>([]);
    const [generos, setGeneros] = useState<{ Id: number; Descripcion: string }[]>([]);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        identidad: "",
        cargoId: "",
        generoId: "",
        username: "",
        password: "",
    });

    useEffect(() => {
        fetch(`${apiHost}/api/empleados/opciones`)
            .then((res) => res.json())
            .then((data) => {
                setCargos(data.cargos);
                setGeneros(data.generos);
            })
            .catch((error) => {
                console.error("Error al cargar las opciones:", error);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nombre || !formData.apellido || !formData.identidad) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (!formData.cargoId || !formData.generoId) {
            alert("Selecciona un cargo y un género.");
            return;
        }

        if (!formData.username || !formData.password) {
            alert("El nombre de usuario y la contraseña son obligatorios.");
            return;
        }

        if (formData.password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        try {
            const response = await fetch(`${apiHost}/api/empleados`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Empleado registrado correctamente.");
                setFormData({
                    nombre: "",
                    apellido: "",
                    identidad: "",
                    cargoId: "",
                    generoId: "",
                    username: "",
                    password: "",
                });
            } else {
                alert(data.message || "Error al registrar empleado.");
            }
        } catch (error) {
            console.error("Error al registrar empleado:", error);
            alert("Error al registrar empleado.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <HeaderAdmin />
            <div className="flex flex-1">
                <SidebarAdmin />
                <div className="container mx-auto p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Registrar Nuevo Empleado</h1>

                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                        <div className="mb-4">
                            <input
                                name="nombre"
                                placeholder="Nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                name="apellido"
                                placeholder="Apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                name="identidad"
                                placeholder="Identidad"
                                value={formData.identidad}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <select
                                name="cargoId"
                                value={formData.cargoId}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                required
                            >
                                <option value="">Seleccionar Cargo</option>
                                {cargos.map((cargo) => (
                                    <option key={cargo.Id} value={cargo.Id}>
                                        {cargo.Descripcion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <select
                                name="generoId"
                                value={formData.generoId}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                required
                            >
                                <option value="">Seleccionar Género</option>
                                {generos.map((genero) => (
                                    <option key={genero.Id} value={genero.Id}>
                                        {genero.Descripcion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <input
                                name="username"
                                placeholder="Nombre de usuario"
                                value={formData.username}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                required
                            />
                        </div>
                        <button
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                            type="submit"
                        >
                            Registrar Empleado
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrarEmpleado;
