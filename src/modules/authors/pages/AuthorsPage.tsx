// Decirle a nextjs que este es un componente reactivo
"use client";

//importar usestate y useeffect
import { useState } from "react";
import { useAuthors } from "@/modules/authors/hooks/useAuthors";
import List from '@/modules/authors/ui/List';
import { Author } from '@/modules/authors/types/types';
import Modal from "@/modules/authors/ui/Modal";

// El export default es necesario para que nextjs pueda identificar 
// cuál es el componente que debe renderizarse como página dentro del enrutado automático.
// El sufijo Page es una convención de Next.js para el nombramiento de páginas.

export default function AuthorsPage(){
    // Usar el hook personalizado para obtener autores
    const { authors, loading, error } = useAuthors();
    
    // Usar el Modal para mostrar detalles del autor
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estado para almacenar el autor seleccionado
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

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

    if(loading){
        return <div className="text-center p-4">Cargando autores</div>;
    }
    if(error){
        return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    }

    return(
        <>
            <List title="Autores" authors={authors} onAuthorClick={handleAuthorClick} />
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