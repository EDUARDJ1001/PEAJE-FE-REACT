"use client";

import HeaderAdmin from "@/app/components/headerAdmin";
import React, { useState, useEffect } from "react";

const Reportes: React.FC = () => {
    return (
        <div>
            <HeaderAdmin />
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Reportes Existentes</h1>
            </div>
        </div>
    );
};

export default Reportes;
