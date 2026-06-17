import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import videojuegosData from "./data/videojuegos";
import { TablaVideojuegos } from "./components/TablaVideojuegos";
import FormularioVideojuego from "./components/FormularioVideojuego";
import Navbar from "./components/Navbar";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";

function App() {
  const [videojuegos, setVideojuegos] = useState(videojuegosData);

  const agregarVideojuego = (nuevoJuego) => {
    setVideojuegos([...videojuegos, nuevoJuego]);
  };

  const eliminarVideojuego = (id) => {
    setVideojuegos(videojuegos.filter((juego) => juego.id !== id));
  };

  const editarVideojuego = (juegoActualizado) => {
    setVideojuegos(
      videojuegos.map((juego) =>
        juego.id === juegoActualizado.id ? juegoActualizado : juego
      )
    );
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <header style={{ marginBottom: "30px", textAlign: "center" }}>
                    <h1 style={{ color: "#4f46e5", fontSize: "2.5rem", margin: "0 0 10px 0" }}>
                      Tienda de Videojuegos
                    </h1>
                    <p style={{ color: "#6b7280", margin: 0 }}>
                      Panel de administración y estado de descargas
                    </p>
                  </header>
                  <TablaVideojuegos
                    juegos={videojuegos}
                    onEliminar={eliminarVideojuego}
                  />
                </>
              }
            />
            <Route
              path="/nuevo"
              element={<FormularioVideojuego onAgregar={agregarVideojuego} />}
            />
            <Route
              path="/editar"
              element={<FormularioVideojuego onEditar={editarVideojuego} />}
            />
            <Route path="*" element={<PaginaNoEncontrada />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;