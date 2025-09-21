import React from 'react';
import Link from 'next/link';


interface FooterProps {
    // Se definen las propiedades que el componente puede recibir
    creatorName: string;
    code: number;
    link: string;
}

const Footer = ({ creatorName, code, link}: FooterProps) => {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-8">
            <div className="container mx-auto flex justify-between items-center">
                <span>Creado por {creatorName} - Código: {code}</span>
                <Link href={link} className="text-blue-400 hover:underline">Repositorio Fuente</Link>
            </div>
        </footer>
    );
};

export default Footer;
