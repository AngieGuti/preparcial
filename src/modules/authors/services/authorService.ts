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
