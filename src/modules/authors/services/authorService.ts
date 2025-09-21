import {Author} from "@/modules/authors/types/types";
import { AuthorFormData } from "../validation/authorSchema";
// importamos el formulario para que sea funcional con el backend

//Función para obtener los autores desde la API
export const fetchAuthors = async(): Promise<Author[]> => {
    try{
        const res = await fetch("http://127.0.0.1:8080/api/authors");
        if(!res.ok){ // si entra aquí es que hubo un error al momento de la petición
            throw new Error("Error al obtener los autores");
        }
        return res.json(); // Retornar la respuesta en formato JSON
    } catch (error) {
        console.error("Error en fetchAuthors:", error);
        return []; // Retornar un arreglo vacío en caso de error
    }
};

// Función para crear un nuevo autor -> POST
export const createAuthor = async (data: AuthorFormData): Promise<Author | null> => {
    try {
        // Realizar la petición POST a la API para crear un nuevo autor
        const res = await fetch("http://127.0.0.1:8080/api/authors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Convertir los datos del formulario a JSON
        });

        if (!res.ok) { // Si la respuesta no es OK, lanzar un error que se mostrará en consola
            throw new Error("Error al crear el autor");
        }
        return res.json();
    } catch (error) {
        console.error("Error en createAuthor:", error);
        return null;
    }
};


// Función para obtener un autor por su ID -> GET
export const getAuthorById = async (id: string): Promise<Author> => {
  const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`);
  if (!res.ok) throw new Error("Error al obtener el autor");
  return res.json();
};

// Función para actualizar un autor existente -> PUT
export const updateAuthor = async (id: string, author: AuthorFormData): Promise<void> => {
  const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(author),
  });
  if (!res.ok) throw new Error("Error al actualizar el autor");
};

// POR FIN: Función para eliminar un autor por su ID -> DELETE
export const deleteAuthor = async (id: number): Promise<void> => {
    try {
        const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Error al eliminar el autor");
    } catch (error) {
        console.error("Error en deleteAuthor:", error);
    }
};

// Notas:

// 1. Cada función maneja un aspecto diferente de la interacción con la API RESTful.
// 2. Se utilizan try/catch para manejar errores y asegurar que el programa no falle inesperadamente.
// 3. Las funciones retornan datos en formatos útiles para su uso en componentes React.