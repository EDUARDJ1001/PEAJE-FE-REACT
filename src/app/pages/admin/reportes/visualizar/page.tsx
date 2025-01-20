"use client";

import HeaderAdmin from "@/app/components/headerAdmin";
import SidebarAdmin from "@/app/components/sideBar";
import React, { useState, useEffect } from "react";

const Reportes: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <HeaderAdmin />
            <div className="flex flex-1">
                <SidebarAdmin />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Reportes Existentes</h1>
                </div>
            </div>
        </div>
    );
};

export default Reportes;
