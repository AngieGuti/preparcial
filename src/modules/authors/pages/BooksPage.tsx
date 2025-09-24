// Decirle a nextjs que este es un componente reactivo
"use client";

// importar router
import { useRouter } from "next/navigation";
//importar usestate y useeffect
import { useEffect, useState } from "react";
import { useBooks } from "@/modules/authors/hooks/useBooks";
import BookList from '@/modules/authors/ui/BookList';
import { Book } from '@/modules/authors/types/types';
import Modal from "@/modules/authors/ui/Modal";
// ELIMINAR LIBRO
import { deleteBook } from "@/modules/authors/services/authorService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

// exportar el componente principal
export default function BooksPage() {
    // Usar el hook personalizado para obtener libros
    const { books, loading, error } = useBooks();
    
    // LIBROS LOCALES
    const [localBooks, setLocalBooks] = useState<Book[]>([]);

    // Usar el Modal para mostrar detalles del libro
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estado para almacenar el libro seleccionado
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    // ELIMINAR LIBRO
    const showNotification = useNotificationStore((s) => s.showNotification);

    // Obtener el router para navegación programática
    const router = useRouter();

    // sincronizar localBooks con lo que venga del hook
    useEffect(() => {
        if (books.length > 0) {
            setLocalBooks(books);
        }
    }, [books]);
    
    // Función para abrir el modal y establecer el libro seleccionado
    const handleBookClick = (book: Book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {   
        setIsModalOpen(false);
        setSelectedBook(null);
    };

    // Manejador para eliminar un libro
    const handleDeleteBook = async (bookId: number) => {
        // Preguntar al usuario si está seguro de eliminar
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este libro?");
        if (!confirmDelete) return; // Si el usuario cancela, salir de la función

        // Llamar al servicio para eliminar el libro
        try {
            await deleteBook(bookId);
            setLocalBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
            showNotification("Libro eliminado correctamente ✅", "success");
        } catch {
            showNotification("Error al eliminar el libro ❌", "error");
        }
    };

    // Manejar estados de carga y error
    if (loading) {
        return <div className="text-center p-4">Cargando libros...</div>;
    }
    if (error) {
        return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Libros</h1>
                    <button
                        onClick={() => router.push("/books/crear")}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                    >
                        + Crear Libro
                    </button>
                </div>
            </div>
            <BookList 
                title="" 
                books={localBooks} 
                onBookClick={handleBookClick}
                onEdit={(book) => router.push(`/books/edit/${book.id}`)}
                onDelete={handleDeleteBook}
            />
            {/* Modal para mostrar detalles del libro */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedBook?.name ?? "Detalles del Libro"}
            >
                {selectedBook && (
                    <div>
                        <p className="mb-2"><strong>ISBN:</strong> {selectedBook.isbn}</p>
                        <p className="mb-2"><strong>Fecha de Publicación:</strong> {selectedBook.publishingDate}</p>
                        <p className="mb-2"><strong>Editorial:</strong> {selectedBook.editorial}</p>
                        <p className="mb-2"><strong>Descripción:</strong> {selectedBook.description}</p>
                        {selectedBook.image && (
                            <div className="mb-2">
                                <strong>Imagen:</strong>
                                <img src={selectedBook.image} alt={selectedBook.name} className="mt-2 max-w-xs rounded-md" />
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </>
    );
}

