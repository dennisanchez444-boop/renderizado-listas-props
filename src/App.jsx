import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import videojuegosData from "./data/videojuegos";
import { TablaVideojuegos } from "./components/TablaVideojuegos";
import FormularioVideojuego from "./components/FormularioVideojuego";
import Navbar from "./components/Navbar";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";
import AlertaNotificacion from "./components/AlertaNotificacion";

function App() {
  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados =
      localStorage.getItem("lista_videojuegos");

    return datosGuardados
      ? JSON.parse(datosGuardados)
      : videojuegosData;
  });

  useEffect(() => {
    localStorage.setItem("lista_videojuegos", JSON.stringify(videojuegos));
  }, [videojuegos]);

  const [mensajeToast, setMensajeToast] = useState("");

  const agregarVideojuego = (nuevoJuego) => {
    setVideojuegos([...videojuegos, nuevoJuego]);

    setMensajeToast(
      "✅ Videojuego agregado correctamente"
    );

    setTimeout(() => {
      setMensajeToast("");
    }, 3000);
  };

  const eliminarVideojuego = (id) => {
    setVideojuegos(
      videojuegos.filter(
        (juego) => juego.id !== id
      )
    );

    setMensajeToast(
      "🗑️ Videojuego eliminado correctamente"
    );

    setTimeout(() => {
      setMensajeToast("");
    }, 3000);
  };

  const editarVideojuego = (juegoActualizado) => {
    setVideojuegos(
      videojuegos.map((juego) =>
        juego.id === juegoActualizado.id
          ? juegoActualizado
          : juego
      )
    );

    setMensajeToast(
      "✏️ Videojuego actualizado correctamente"
    );

    setTimeout(() => {
      setMensajeToast("");
    }, 3000);
  };

  return (
    <BrowserRouter>
      <Navbar />
      {mensajeToast && (
        <AlertaNotificacion
          mensaje={mensajeToast}
        />
      )}
      <div
        style={{
          padding: "30px",
          maxWidth: "1400px",
          margin: "0 auto",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start"
        }}
      >
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <header style={{ marginBottom: "30px", textAlign: "center" }}>
                    <h1
                      style={{
                        color: "#f8fafc",
                        fontSize: "2.8rem",
                        marginBottom: "10px"
                      }}
                    >
                      Tienda de Videojuegos
                    </h1>
                    <p
                      style={{
                        color: "#94a3b8",
                        margin: 0
                      }}
                    >
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