"use client";
//importar usestate y useeffect
import { useState } from "react";
//importar useRouter para redireccionar despues de crear el autor
import { useRouter } from "next/navigation";
import AuthorForm from "@/modules/authors/ui/AuthorForm";
import { AuthorFormData } from "@/modules/authors/validation/authorSchema";
import { createAuthor } from "@/modules/authors/services/authorService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

export default function NewAuthorPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    // Obtener el método para mostrar notificaciones de zustand
    const showNotification = useNotificationStore((s) => s.showNotification);
    
    const handleCreateAuthor = async (data: AuthorFormData) => {
      setIsSubmitting(true);
        try {
            // Llamar al servicio para postear el nuevo autor
            await createAuthor(data);
            // Mostrar notificación de éxito
            showNotification("✅ Autor creado exitosamente", "success");
            // Redireccionar a la página de autores después de crear
            router.push("/authors");
        } catch (error) {
            const errorMessage =
            error instanceof Error ? error.message : "Error al crear el autor";
            showNotification(errorMessage, "error");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold">Crear Nuevo Autor</h1>
        <div className="my-4" /> {/* Espacio entre el header y el formulario */}
        <AuthorForm onSubmit={handleCreateAuthor} isSubmitting={isSubmitting} />
      </main>
    );
}
