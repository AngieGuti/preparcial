import React from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
    // Se definen las propiedades que el componente puede recibir
    title: string;
    imageUrl: string;
}

const Header = ({ title, imageUrl}: HeaderProps) => {
    return (
        <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
            <Image 
                src={imageUrl}
                alt="Logo"
                width={40}
                height={40}
            />
            <span className="text-lg font-semibold">{title}</span>
        </Link>
        <nav>
          <Link href="/" className="px-3 hover:text-gray-300">Inicio</Link>
          <Link href="/authors" className="px-3 hover:text-gray-300">Listar autores</Link>
          <Link href="/crear" className="px-3 hover:text-gray-300">Crear autores</Link>
        </nav>
      </div>
        </header>
    );
};

export default Header;