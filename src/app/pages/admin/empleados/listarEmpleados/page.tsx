"use client";

import HeaderAdmin from "@/app/components/headerAdmin";
import Pagination from "@/app/components/pagination";
import SidebarAdmin from "@/app/components/sideBar";
import React, { useEffect, useState } from "react";

interface Empleado {
    Id: number;
    Nombre: string;
    Apellido: string;
    Identidad: string;
    Cargo_Id: string;
    Genero_Id: string;
    Username: string;
}

interface Opciones {
    cargos: { Id: string; Descripcion: string }[];
    generos: { Id: string; Descripcion: string }[];
}

const ListaEmpleados: React.FC = () => {
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [cargos, setCargos] = useState<{ [key: string]: string }>({});
    const [generos, setGeneros] = useState<{ [key: string]: string }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [empleadoData, setEmpleadoData] = useState<Empleado | null>(null);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        identidad: "",
        cargo_Id: "",
        genero_Id: "",
        username: "",
        password: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await fetch(`${apiHost}/api/empleados`);
                const data = await response.json();
                setEmpleados(data);
            } catch (error) {
                console.error("Error al cargar empleados:", error);
            }
        };

        const fetchOpciones = async () => {
            try {
                const response = await fetch(`${apiHost}/api/empleados/opciones`);
                const data: Opciones = await response.json();

                const cargosMap: { [key: string]: string } = {};
                data.cargos.forEach((cargo) => {
                    cargosMap[cargo.Id] = cargo.Descripcion;
                });

                const generosMap: { [key: string]: string } = {};
                data.generos.forEach((genero) => {
                    generosMap[genero.Id] = genero.Descripcion;
                });

                setCargos(cargosMap);
                setGeneros(generosMap);
            } catch (error) {
                console.error("Error al cargar opciones de empleados:", error);
            }
        };

        fetchEmpleados();
        fetchOpciones();
    }, []);

    useEffect(() => {
        if (empleadoData) {
            setFormData({
                nombre: empleadoData.Nombre,
                apellido: empleadoData.Apellido,
                identidad: empleadoData.Identidad,
                cargo_Id: empleadoData.Cargo_Id,
                genero_Id: empleadoData.Genero_Id,
                username: empleadoData.Username,
                password: "",
            });
        }
    }, [empleadoData]);

    const handleEditar = (id: number) => {
        const empleado = empleados.find((emp) => emp.Id === id);
        if (empleado) {
            setEmpleadoData(empleado);
            setIsModalOpen(true);
        }
    };

    const handleEliminar = async (id: number) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
            try {
                await fetch(`${apiHost}/api/empleados/${id}`, {
                    method: "DELETE",
                });
                setEmpleados(empleados.filter((empleado) => empleado.Id !== id));
                alert("Empleado eliminado con éxito");
            } catch (error) {
                console.error("Error al eliminar empleado:", error);
                alert("Hubo un problema al eliminar el empleado");
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (empleadoData) {
            try {
                const response = await fetch(`${apiHost}/api/empleados/${empleadoData.Id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    alert('Empleado actualizado con éxito');
                    setIsModalOpen(false);
                    setEmpleados((prev) =>
                        prev.map((emp) =>
                            emp.Id === empleadoData.Id ? { ...emp, ...formData } : emp
                        )
                    );
                } else {
                    alert('Error al actualizar el empleado');
                }
            } catch (error) {
                console.error("Error al actualizar el empleado:", error);
                alert("Hubo un problema al actualizar el empleado");
            }
        }
    };

    const indexOfLastEmployee = currentPage * itemsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
    const currentEmployees = empleados.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <HeaderAdmin />
            <div className="flex flex-1">
                <SidebarAdmin />
                <div className="container mx-auto p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista de Empleados</h1>
                    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
                        <table className="table-auto w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-4 py-2 text-white">Id</th>
                                    <th className="px-4 py-2 text-white">Nombre</th>
                                    <th className="px-4 py-2 text-white">Apellido</th>
                                    <th className="px-4 py-2 text-white">Identidad</th>
                                    <th className="px-4 py-2 text-white">Cargo</th>
                                    <th className="px-4 py-2 text-white">Género</th>
                                    <th className="px-4 py-2 text-white">Usuario</th>
                                    <th className="px-4 py-2 text-white">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentEmployees.map((empleado) => (
                                    <tr key={empleado.Id} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 text-black">{empleado.Id}</td>
                                        <td className="px-4 py-2 text-black">{empleado.Nombre}</td>
                                        <td className="px-4 py-2 text-black">{empleado.Apellido}</td>
                                        <td className="px-4 py-2 text-black">{empleado.Identidad}</td>
                                        <td className="px-4 py-2 text-black">{cargos[empleado.Cargo_Id] || "Desconocido"}</td>
                                        <td className="px-4 py-2 text-black">{generos[empleado.Genero_Id] || "Desconocido"}</td>
                                        <td className="px-4 py-2 text-black">{empleado.Username}</td>
                                        <td className="px-4 py-2">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEditar(empleado.Id)}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleEliminar(empleado.Id)}
                                                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Pagination
                            currentPage={currentPage}
                            totalItems={empleados.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>

            {isModalOpen && empleadoData && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Editar Empleado</h2>
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Apellido</label>
                                <input
                                    type="text"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Identidad</label>
                                <input
                                    type="text"
                                    name="identidad"
                                    value={formData.identidad}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Cargo</label>
                                <select
                                    name="cargo_Id"
                                    value={formData.cargo_Id}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Seleccione un cargo</option>
                                    {Object.entries(cargos).map(([id, descripcion]) => (
                                        <option key={id} value={id}>
                                            {descripcion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Género</label>
                                <select
                                    name="genero_Id"
                                    value={formData.genero_Id}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Seleccione un género</option>
                                    {Object.entries(generos).map(([id, descripcion]) => (
                                        <option key={id} value={id}>
                                            {descripcion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Usuario</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaEmpleados;
