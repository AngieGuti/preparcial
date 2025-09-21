export default function Home(){
  return (
    //en el retorno se encuentra el componente principal de la pagina en lenguaje jsx
    // vamos a ponerlo bonito con tailwindcss
    <main className="p-4">
      <div className="bg-purple-700 shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Bienvenido a Mi Biblioteca de Autores</h1>
        <p className="text-white"> Esta página representa el preparcial realizado por Angie Gutiérrez :D</p>
      </div>
    </main>
  );
}