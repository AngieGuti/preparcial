"use client";
//importar usestate y useeffect
import { useState } from "react";
import AuthorForm from "@/modules/authors/ui/AuthorForm";
import { AuthorFormData } from "@/modules/authors/validation/authorSchema";

export default function NewAuthorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    console.log("Autor creado:", data); 
    // Aquí se podría agregar la lógica para enviar los datos a un servidor
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula una espera de 2 segundos
    setIsSubmitting(false);
    };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Crear Nuevo Autor</h1>
      <div className="my-4" /> {/* Espacio entre el header y el formulario */}
      <AuthorForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </main>
  );
}
