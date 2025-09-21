import React from 'react';
import Link from 'next/link';
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
                    <li key={author.id} className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
                        <Image 
                            src={author.image}
                            alt={author.name}
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <div>
                            <h2 className="text-lg font-semibold">{author.name}</h2>
                            <p className="text-gray-600">{author.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;
