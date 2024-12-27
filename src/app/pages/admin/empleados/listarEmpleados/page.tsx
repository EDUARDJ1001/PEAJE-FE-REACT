"use client";

import HeaderAdmin from "@/app/components/headerAdmin";
import Pagination from "@/app/components/pagination";
import { redirect } from "next/navigation";
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
    },[]);

    const handleEditar = (id: number) => {
        console.log("Editar empleado con ID:", id);
        redirect(`/pages/admin/empleados/editarEmpleados/?id=${id}`);
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

    const indexOfLastEmployee = currentPage * itemsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
    const currentEmployees = empleados.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <HeaderAdmin />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista de Empleados</h1>
                <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-800">
                            <tr>
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
                                    <td className="px-4 py-2 text-black">{empleado.Nombre}</td>
                                    <td className="px-4 py-2 text-black">{empleado.Apellido}</td>
                                    <td className="px-4 py-2 text-black">{empleado.Identidad}</td>
                                    <td className="px-4 py-2 text-black">{cargos[empleado.Cargo_Id] || "Desconocido"}</td>
                                    <td className="px-4 py-2 text-black">{generos[empleado.Genero_Id] || "Desconocido"}</td>
                                    <td className="px-4 py-2 text-black">{empleado.Username}</td>
                                    <td className="px-4 py-2">
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
    );
};

export default ListaEmpleados;
