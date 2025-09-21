// Decirle a nextjs que este es un componente reactivo
"use client";

// importar router
import { useRouter } from "next/navigation";
//importar usestate y useeffect
import { useEffect, useState } from "react";
import { useAuthors } from "@/modules/authors/hooks/useAuthors";
import List from '@/modules/authors/ui/AuthorList';
import { Author } from '@/modules/authors/types/types';
import Modal from "@/modules/authors/ui/Modal";
// ELIMINAR AUTOR AAA
import { deleteAuthor } from "@/modules/authors/services/authorService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";


export default function AuthorsPage(){
    // Usar el hook personalizado para obtener autores
    const { authors, loading, error } = useAuthors();
    
    // AUTORES LOCALES
    const [localAuthors, setLocalAuthors] = useState<Author[]>([]);

    // Usar el Modal para mostrar detalles del autor
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estado para almacenar el autor seleccionado
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

    // ELIMINAR AUTOR AAA
    const showNotification = useNotificationStore((s) => s.showNotification);

    // Obtener el router para navegación programática
    const router = useRouter();


    // sincronizar localAuthors con lo que venga del hook
    useEffect(() => {
      if (authors.length > 0) {
        setLocalAuthors(authors);
      }
    }, [authors]);
    
    // Función para abrir el modal y establecer el autor seleccionado
    const handleAuthorClick = (author: Author) => {
        setSelectedAuthor(author);
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {   
        setIsModalOpen(false);
        setSelectedAuthor(null);
    };

    // Manejador para eliminar un autor aaa
    const handleDeleteAuthor = async (authorId: number) => {
        // Preguntar al usuario si está seguro de eliminar
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este autor?");
        if (!confirmDelete) return; // Si el usuario cancela, salir de la función

        // Llamar al servicio para eliminar el autor
        try {
            await deleteAuthor(authorId);
            setLocalAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== authorId));
            showNotification("Autor eliminado correctamente ✅", "success");
        } catch {
            showNotification("Error al eliminar el autor ❌", "error");
        }
    };

    // Manejar estados de carga y error
    if(loading){
        return <div className="text-center p-4">Cargando autores</div>;
    }
    if(error){
        return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    }

    return(
        <>
            <List 
            title="Autores" 
            authors={localAuthors} 
            onAuthorClick={handleAuthorClick}
            onEdit= {(author) => router.push(`/authors/edit/${author.id}`)}
            onDelete= {handleDeleteAuthor}
            />
            {/* Modal para mostrar detalles del autor */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedAuthor?.name ?? "Detalles del Autor"}
            >
                {selectedAuthor && (
                    <div>
                        {/* la clase mb-2 se utiliza para agregar un margen inferior */}
                        <p className="mb-2"><strong>Nacimiento:</strong> {selectedAuthor.birthDate}</p>
                        <p className="mb-2"><strong>Descripción:</strong> {selectedAuthor.description}</p>
                        {/* Aquí se puede agregar más detalles del autor, pero por el momento no se incluyen */}
                    </div>
                )}
            </Modal>
            
        </>
    );
}

// Notas:
// 1. El componente AuthorsPage ahora usa el hook useAuthors para manejar la lógica de obtención de datos.
// 2. Se ha añadido un modal para mostrar detalles del autor cuando se hace clic en su nombre.
// 3. La lista de autores se ha movido a un componente separado List para mejorar la separación de responsabilidades.