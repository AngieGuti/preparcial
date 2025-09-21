"use client";

import { useState, useEffect } from "react";
import { Author } from "@/modules/authors/types/types";
import { fetchAuthors } from "@/modules/authors/services/authorService";

// Hook personalizado para obtener autores
export function useAuthors() {
    const [authors, setAuthors]= useState<Author[]>([]); // Estado para almacenar los autores
    const [loading, setLoading]= useState<boolean>(true); // Estado para manejar la carga
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    useEffect(()=> {
        const loadAuthors= async() =>{
            try{
                setLoading(true);
                setError(null);
                const data= await fetchAuthors();
                setAuthors(data);
            } catch (error) {
                if (error instanceof Error){
                    setError(error.message);
                } else {
                    setError("Error desconocido");
                } 
            } finally {
                setLoading(false);
            }
        };
        loadAuthors();
    }, []); // El arreglo vacío significa que esto se ejecuta una sola vez al montar el componente

    return { authors, loading, error };
}