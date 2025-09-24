"use client";

import { useState, useEffect } from "react";
import { Book } from "@/modules/authors/types/types";
import { fetchBooks } from "@/modules/authors/services/authorService";

// Hook personalizado para obtener libros
export function useBooks() {
    const [books, setBooks] = useState<Book[]>([]); // Estado para almacenar los libros
    const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchBooks();
                setBooks(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Error desconocido");
                } 
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, []); // El arreglo vacío significa que esto se ejecuta una sola vez al montar el componente

    return { books, loading, error };
}