import React from 'react';
import Image from 'next/image';
import { Author } from '@/modules/authors/types/types';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// Es necesario definir las props que el componente va a recibir
interface ListProps {
    title: string;
    authors: Author[];
    // Función para manejar el clic en un autor
    onAuthorClick?: (author: Author) => void;
}

const List = ({title, authors, onAuthorClick}: ListProps) => {

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <ul className="space-y-4">
                {authors.map((author) => (
                    <li key={author.id} 
                        className="bg-purple-600 shadow rounded-lg p-4 flex items-center space-x-4"
                    >
                        <div>
                        <h2 className="text-lg font-semibold">{author.name}</h2>
                        <p className="text-lg text-sm">Nacimiento: {author.birthDate}</p>
                        </div>
                        <div className="flex gap-7 ml-auto">
                            <button
                              className="bg-purple-400 text-white px-3 py-1 rounded hover:bg-purple-700 flex items-center gap-2"
                              onClick={() => onAuthorClick?.(author)} // Llamar a la función pasada por props que maneja el clic y muestra el modal
                            >
                               <FaEye /> Ver Detalles
                            </button>
                            <button
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-800 flex items-center gap-2"
                              //onClick={() => onEdit?.(author)}
                            >
                              <FaEdit /> Editar
                            </button>
                            <button
                              className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-2"
                              //onClick={() => onDelete?.(author.id)}
                            >
                              <FaTrash /> Eliminar
                            </button>
                        </div>
                    </li>
               ))}
            </ul>
        </div>
    );
};

export default List;









// Más tarde le ponemos la imagen porque no la tenemos en la base de datos:
// {author.image ? (
//                            <Image 
//                                src={author.image}
//                                alt={author.name}
//                                width={50}
//                                height={50}
//                                className="rounded-full object-cover w-12 h-12"
//                            />
//                        ) : (
//                            <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center">
//                                <span className="text-gray-500">Sin imagen</span>
//                            </div>
//                        )}