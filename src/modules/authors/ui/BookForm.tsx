// necesito crear un formulario para crear libros teniendo en cuenta que un libro tiene los siguientes campos:
//    id: number;
//    name: string;
//    isbn: string;
//    image: string;
//    publishingDate: string; // Debería ser Date pero se usa string para simplificar
//    description: string;
//    editorial: Editorial;

// y tener en cuenta cómo se hizo author form
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema, BookFormData } from "../validation/bookSchema";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Definición de las props del formulario para la creación de libros
interface BookFormProps {
    onSubmit: SubmitHandler<BookFormData>;
    defaultValues?: BookFormData;
    isSubmitting?: boolean;
}

export default function BookForm({ onSubmit, defaultValues, isSubmitting = false }: BookFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BookFormData>({
        resolver: zodResolver(bookSchema),
        defaultValues,
    });

    // Resetear el formulario cuando cambien los valores por defecto
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre del Libro *
                </label>
                <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                    ISBN *
                </label>
                <input
                    type="text"
                    id="isbn"
                    {...register("isbn")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.isbn && (
                    <p className="mt-1 text-sm text-red-600">{errors.isbn.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="publishingDate" className="block text-sm font-medium text-gray-700">
                    Fecha de Publicación *
                </label>
                <input
                    type="date"
                    id="publishingDate"
                    {...register("publishingDate")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.publishingDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.publishingDate.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="editorial" className="block text-sm font-medium text-gray-700">
                    Editorial *
                </label>
                <input
                    type="text"
                    id="editorial"
                    {...register("editorial")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.editorial && (
                    <p className="mt-1 text-sm text-red-600">{errors.editorial.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descripción *
                </label>
                <textarea
                    id="description"
                    rows={4}
                    {...register("description")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    URL de la Imagen
                </label>
                <input
                    type="url"
                    id="image"
                    {...register("image")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="https://ejemplo.com/imagen.jpg"
                />
                {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                )}
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {isSubmitting ? "Guardando..." : "Guardar Libro"}
                </button>
                <button
                    type="button"
                    onClick={() => reset()}
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                    Limpiar
                </button>
            </div>
        </form>
    );
}
