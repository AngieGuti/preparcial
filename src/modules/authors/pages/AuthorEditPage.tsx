"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AuthorForm from "@/modules/authors/ui/AuthorForm";
import { AuthorFormData } from "@/modules/authors/validation/authorSchema";
import { getAuthorById, updateAuthor } from "@/modules/authors/services/authorService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

export default function AuthorEditPage() {
  const router = useRouter();
  const params = useParams(); // obtiene el id de la ruta dinámica
  const { id } = params as { id: string };

  const [author, setAuthor] = useState<AuthorFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showNotification = useNotificationStore((s) => s.showNotification);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAuthorById(id);
        setAuthor(data);
      } catch {
        showNotification("Error cargando autor", "error");
      }
    };
    fetchData();
  }, [id, showNotification]);

  const handleUpdate = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    try {
      await updateAuthor(id, data);
      showNotification("Autor actualizado correctamente ✅", "success");
      router.push("/authors");
    } catch {
      showNotification("Error al actualizar el autor ❌", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!author) return <p className="p-8">Cargando...</p>;

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Editar Autor</h1>
      <div className="my-4" />
      <AuthorForm
        defaultValues={author}   //  pasamos los datos existentes
        onSubmit={handleUpdate}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}
