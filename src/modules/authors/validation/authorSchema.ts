import { z } from "zod";

// Restricciones sobre la creación de un nuevo autor
export const authorSchema= z.object({
    birthDate: z
    .string()
    .nonempty("La fecha de nacimiento es obligatoria")
    .refine(
      (date) => new Date(date) <= new Date(),
      { message: "La fecha no puede ser mayor a la actual" }
    ),
    name: z.string().min(2, {message: "El nombre debe tener al menos 2 caracteres"}),
    description: z.string().min(10, {message: "La descripción debe tener al menos 10 caracteres"}),
    image: z.string().url({message: "La URL de la imagen debe ser válida"})
});

export type AuthorFormData = z.infer<typeof authorSchema>;
