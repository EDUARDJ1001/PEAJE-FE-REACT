"use client";

import HeaderLogin from '@/app/components/headerLogin';
import React, { useState } from 'react';

interface User {
    username: string;
}

const Login: React.FC = () => {
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState<User | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${apiHost}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            setUser(data.user);
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({
                ...data.user,
                loginTime: new Date().toISOString(),
            }));

            // Redirigir al dashboard
            window.location.href = data.dashboardRoute;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error al iniciar sesión');
            }
        }
    };

    return (
        <div>
            <HeaderLogin />
            <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold mb-0 text-white">Peaje Puerto Cortes</h1>
                <div className="w-full max-w-md p-8">
                    <h2 className="text-2xl font-bold mb-6 text-white">Inicio de Sesión</h2>

                    {error && (
                        <div className="mb-4 text-red-600 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                className="block text-white text-sm font-medium mb-2"
                                htmlFor="username"
                            >
                                Usuario
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Ingrese su usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                required
                            />
                        </div>

                        <div>
                            <label
                                className="block text-white text-sm font-medium mb-2"
                                htmlFor="password"
                            >
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                required
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
