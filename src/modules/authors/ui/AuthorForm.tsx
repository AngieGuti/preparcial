"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorSchema, AuthorFormData } from "@/modules/authors/validation/authorSchema";
import { useState } from "react";

// Definición de las props del formulario para la creación de autores
interface AuthorFormProps {
  onSubmit: SubmitHandler<AuthorFormData>; // Función que se ejecuta al enviar el formulario
  isSubmitting: boolean;
  defaultValues?: AuthorFormData; // Valores por defecto para el formulario (útil para edición)
}

export default function AuthorForm({ onSubmit, isSubmitting, defaultValues }: AuthorFormProps) {
    // Se logró exitosamente la actualización mediante un useEffect en la página de edición
    const [successMessage, setSuccessMessage] = useState<string | null>(null);  

    const {
    register,
    handleSubmit,
    reset, // Función para resetear el formulario cuando se envía con éxito
    formState: { errors },
    } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues,
  });

    // Manejar el envío exitoso del formulario
    const handleFormSubmit: SubmitHandler<AuthorFormData> = async (data) => {
    await onSubmit(data);
    setSuccessMessage("✅ Autor creado correctamente");
    reset(); // Limpia todos los campos :)
    setTimeout(() => setSuccessMessage(null), 2000); // mensaje se oculta en 3s
  };

  // El botón de submit debe estar en el centro mediante flexbox
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 bg-purple-800 p-8 rounded-lg shadow-md">
      {successMessage && (
        <p className="text-blue-500 font-bold text-center">{successMessage}</p>
      )}
      <div>
        <label htmlFor="name" className="block font-bold mb-1">Nombre</label>
        <input id="name" {...register("name")} className="w-full p-2 border rounded text-bl" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="birthDate" className="block font-bold mb-1">Fecha de nacimiento</label>
        <input type="date" id="birthDate" {...register("birthDate")} className="w-full p-2 border rounded text-bl" />
        {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block font-bold mb-1">Descripción</label>
        <textarea id="description" {...register("description")} className="w-full p-2 border rounded text-bl" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="image" className="block font-bold mb-1">Imagen (URL)</label>
        <input id="image" {...register("image")} className="w-full p-2 border rounded text-bl" />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-700 text-white font-bold py-3 px-10 rounded hover:bg-blue-700 disabled:bg-blue-400 cursor-pointer flex justify-center mx-auto block"
      >
        {isSubmitting ? "Guardando..." : "Guardar Autor"}
      </button>
    </form>
  );
}
