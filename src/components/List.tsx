
import React from 'react';
import Image from 'next/image';
import { Author } from '@/types/types';


// Es necesario definir las props que el componente va a recibir
interface ListProps {
    title: string;
    authors: Author[];
}

const List = ({title, authors}: ListProps) => {
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <ul className="space-y-4">
                {authors.map((author) => (
                    <li key={author.id} 
                        className="bg-purple-400 shadow rounded-lg p-4 flex items-center space-x-4">
                        {/* Información del autor */}
                        <div>
                        <h2 className= "text-lg font-semibold">{author.name}</h2>
                        <p className="text-black text-sm">Nacimiento: {author.birthDate}</p>
                        <p className="text-black">{author.description}</p>
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