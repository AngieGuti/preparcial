import React from 'react';
//import Image from 'next/image';
import { Book } from '@/modules/authors/types/types';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// Es necesario definir las props que el componente va a recibir
interface BookListProps {
    title: string;
    books: Book[];
    // Función para manejar el clic en un libro
    onBookClick?: (book: Book) => void; 
    // Función para manejar la edición de un libro
    onEdit?: (book: Book) => void;
    // Función para manejar la eliminación de un libro
    onDelete?: (bookId: number) => void;
}

// Componente BookList que recibe un título y una lista de libros como props
// Muestra cada libro con su nombre, fecha de publicación, editorial y botones para ver detalles, editar y eliminar
// Los botones llaman a las funciones pasadas por props cuando se hace clic en ellos
const BookList = ({title, books, onBookClick, onEdit, onDelete}: BookListProps) => {

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <ul className="space-y-4">
                {books.map((book) => (
                    <li key={book.id} 
                        className="bg-purple-800 shadow rounded-lg p-4 flex items-center space-x-4"
                    >
                        <div>
                            <h2 className="text-lg font-semibold text-white">{book.name}</h2>
                            <p className="text-sm text-gray-300">ISBN: {book.isbn}</p>
                            <p className="text-sm text-gray-300">Publicación: {book.publishingDate}</p>
                            <p className="text-sm text-gray-300">Editorial: {book.editorial}</p>
                        </div>
                        <div className="flex gap-7 ml-auto">
                            <button
                              className="bg-purple-400 text-white px-3 py-1 rounded hover:bg-purple-700 flex items-center gap-2 cursor-pointer"
                              onClick={() => onBookClick?.(book)} // Llamar a la función pasada por props que maneja el clic y muestra el modal
                            >
                               <FaEye /> Ver Detalles
                            </button>
                            <button
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-800 flex items-center gap-2 cursor-pointer"
                              onClick={() => onEdit?.(book)}
                            >
                              <FaEdit /> Editar
                            </button>
                            <button
                              className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-2 cursor-pointer"
                              onClick={() => onDelete?.(book.id)} // Llamar a la función pasada por props que maneja la eliminación
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

export default BookList;

// Nos basamos en la lista de autores, porque es muy similar