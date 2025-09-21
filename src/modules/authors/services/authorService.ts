import {Author} from "@/modules/authors/types/types";

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