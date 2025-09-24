import React from "react";
// importamos Image de next para optimizar las imagenes
import Image from "next/image";

export default function Home(){
  return (
    //en el retorno se encuentra el componente principal de la pagina en lenguaje jsx
    // vamos a ponerlo bonito con tailwindcss
    <main className="p-4">
      <div className="bg-purple-800 shadow rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Bienvenidx a Mi Biblioteca de Autores</h1>
        <p className="text-white"> Esta página representa el Parcial realizado por Angie Gutiérrez :D</p>
        <div className="mt-4">
          <Image 
            src="/mishiME.png"
            alt="Imagen de un gato"
            width={250}
            height={150}
            className="rounded-lg mx-auto"
          />
        </div>
      </div>
      <div className="mt-6 text-center text-bl">
        <h2 className="text-lg font-semibold mb-2">Instrucciones</h2>
        <ul className="list-disc list-inside ">
          <li>Para ver la lista de autores, navega a la sección de Autores en el menú.</li>
          <li>Para agregar un nuevo autor, dirígete a la sección Crear Autores.</li>
          <li>Para ver la lista de libros, navega a la sección de Libros en el menú.</li>
          <li>Para agregar un nuevo libro, dirígete a la sección Crear Libros.</li>

        </ul>
      </div>
    </main>
  );
}