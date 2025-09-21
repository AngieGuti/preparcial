// Decirle a nextjs que este es un componente reactivo
"use client";

//importar usestate y useeffect
import { useState, useEffect } from "react";
import List from '@/components/List';
import { Author } from '@/types/types';

// El export default es necesario para que nextjs pueda identificar 
// cuál es el componente que debe renderizarse como página dentro del enrutado automático.
// El sufijo Page es una convención de Next.js para el nombramiento de páginas.

export default function AuthorsPage(){
    const [authors, setAuthors]= useState<Author[]>([]); // Estado para almacenar los autores
    const [loading, setLoading]= useState<boolean>(true); // Estado para manejar la carga

    useEffect(()=> {
        async function fetchAuthors() {
            // Función para obtener los autores desde la API
            try {
                const res = await fetch("http://127.0.0.1:8080/api/authors");
                if(!res.ok){ // si entra aquí es que hubo un error al momento de la petición
                    throw new Error("Error al obtener los autores");
                }
                const data: Author[]= await res.json();
                setAuthors(data);
                // Actualizar el estado con los autores obtenidos
            } catch (error) {
                console.error("Error al intentar obtener los autores", error);
            } finally {
                setLoading(false); // Finalizar el estado de carga
            }
        }
        fetchAuthors();
    }, []); // El arreglo vacío asegura que el efecto se ejecute solo una vez al montar el componente
    
    if(loading){
        return <p className="p-a"> Cargando los autores...</p>
    }

    return (
        <List title="Autores" authors={authors} />
  );
};