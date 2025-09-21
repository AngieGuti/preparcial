// Decirle a nextjs que este es un componente reactivo
"use client";

//importar usestate y useeffect
import { useState, useEffect } from "react";
import List from '@/components/List';
import { Author } from '@/types/types';
import { fetchAuthors } from "@/services/authorService";

// El export default es necesario para que nextjs pueda identificar 
// cuál es el componente que debe renderizarse como página dentro del enrutado automático.
// El sufijo Page es una convención de Next.js para el nombramiento de páginas.

export default function AuthorsPage(){
    const [authors, setAuthors]= useState<Author[]>([]); // Estado para almacenar los autores
    const [loading, setLoading]= useState<boolean>(true); // Estado para manejar la carga

    useEffect(()=> {
        // Llamamos a la función fetchAuthors para obtener los autores
        const loadAuthors = async() => {
            const data = fetchAuthors();
            setAuthors(await data);
            setLoading(false);
        };
        loadAuthors();
        
    }, []); // El arreglo vacío significa que esto se ejecuta una sola vez al montar el componente
    
    if(loading){
        return <p className="p-a"> Cargando los autores...</p>
    }

    return (
        <List title="Autores" authors={authors} />
  );
};