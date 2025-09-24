"use client";
//importar usestate y useeffect
import { useState } from "react";
//importar useRouter para redireccionar despues de crear el libro
import { useRouter } from "next/navigation";
import BookForm from "@/modules/authors/ui/BookForm";
import { BookFormData } from "@/modules/authors/validation/bookSchema";
import { createBook } from "@/modules/authors/services/authorService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

export default function NewBooksPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    // Obtener el método para mostrar notificaciones de zustand
    const showNotification = useNotificationStore((s) => s.showNotification);
    
    const handleCreateBook = async (data: BookFormData) => {
        setIsSubmitting(true);
        try {
            // Llamar al servicio para postear el nuevo libro
            await createBook(data);
            // Mostrar notificación de éxito
            showNotification("✅ Libro creado exitosamente", "success");
            // Redireccionar a la página de libros después de crear
            router.push("/books");
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Error al crear el libro";
            showNotification(errorMessage, "error");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <main className="container mx-auto p-8">
            <h1 className="text-3xl font-bold">Crear Nuevo Libro</h1>
            <div className="my-4" /> {/* Espacio entre el header y el formulario */}
            <BookForm onSubmit={handleCreateBook} isSubmitting={isSubmitting} />
        </main>
    );
}
