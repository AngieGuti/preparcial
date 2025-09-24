// verificar que el esquema del libro es correcto
import { z } from "zod";

export const bookSchema = z.object({
    id: z.number().optional(), // id es opcional porque se genera automáticamente
    name: z.string().min(1, "El nombre es obligatorio"),
    isbn: z.string().min(1, "El ISBN es obligatorio"),
    image: z.string().url("La imagen debe ser una URL válida").optional(),
    publishingDate: z.string().min(1, "La fecha de publicación es obligatoria"),
    description: z.string().min(1, "La descripción es obligatoria"),
    editorial: z.string().min(1, "El nombre de la editorial es obligatorio") // Cambiado a string según el tipo Book
});

export type BookFormData = z.infer<typeof bookSchema>;
// nos basamos en el mismo formato que authorSchema.ts
