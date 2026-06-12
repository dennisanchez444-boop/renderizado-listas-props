import { useState } from "react";
import videojuegosData from "./data/videojuegos";
import { TablaVideojuegos } from "./components/TablaVideojuegos";

function App() {
  const [videojuegos, setVideojuegos] = useState(videojuegosData);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1 style={{ color: "#4f46e5", fontSize: "2.5rem" }}>
          Tienda de Videojuegos
        </h1>
        <p style={{ color: "#6b7280" }}>
          Panel de administración y estado de descargas
        </p>
      </header>

      <main>
        <TablaVideojuegos juegos={videojuegos} />
      </main>
    </div>
  );
}

export default App;