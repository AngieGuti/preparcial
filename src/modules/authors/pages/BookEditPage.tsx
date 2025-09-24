"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import BookForm from "@/modules/authors/ui/BookForm";
import { BookFormData } from "@/modules/authors/validation/bookSchema";
import { getBookById, updateBook } from "@/modules/authors/services/authorService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

// literal vamos a basarnos en AuthorEditPage.tsx pero para libros
export default function BookEditPage() {
  const router = useRouter();
  const params = useParams(); // obtiene el id de la ruta dinámica
  const { id } = params as { id: string };

  const [book, setBook] = useState<BookFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showNotification = useNotificationStore((s) => s.showNotification);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch {
        showNotification("Error cargando libro", "error");
      }
    };
    fetchData();
  }, [id, showNotification]);

  const handleUpdate = async (data: BookFormData) => {
    setIsSubmitting(true);
    try {
      await updateBook(id, data);
      showNotification("Libro actualizado correctamente ✅", "success");
      router.push("/books");
    } catch {
      showNotification("Error al actualizar el libro ❌", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!book) return <p className="p-8">Cargando...</p>;

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Editar Libro</h1>
      <div className="my-4" />
      <BookForm
        defaultValues={book}   //  pasamos los datos existentes
        onSubmit={handleUpdate}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}