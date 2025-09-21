// El export default es necesario para que nextjs pueda identificar 
// cuál es el componente que debe renderizarse como página dentro del enrutado automático.
// El sufijo Page es una convención de Next.js para el nombramiento de páginas.

export default function AuthorsPage(){
  return (
    <main className="p-4">
        <div className="bg-green-700 shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Autores</h1>
            <p className="text-white"> Aquí se listan los autores </p>
        </div>
    </main>
  );
};