import React from "react";
import "./TablaVideojuegos.css";

export function TablaVideojuegos({ juegos }) {
    return (
        <div className="contenedor-tabla">
            <table className="tabla-videojuegos">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Género</th>
                        <th>Plataforma</th>
                        <th>Lanzamiento</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Descarga</th>
                    </tr>
                </thead>

                <tbody>
                    {juegos.map((juego) => (
                        <tr key={juego.id}>
                            <td data-label="Título">{juego.titulo}</td>
                            <td data-label="Género">{juego.genero}</td>
                            <td data-label="Plataforma">{juego.plataforma}</td>
                            <td data-label="Lanzamiento">{juego.lanzamiento}</td>
                            <td data-label="Precio">
                                ${juego.precio.toFixed(2)}
                            </td>

                            <td data-label="Estado">
                                <span
                                    className={`badge ${juego.disponible ? "disponible" : "agotado"
                                        }`}
                                >
                                    {juego.disponible ? "Disponible" : "Agotado"}
                                </span>
                            </td>

                            <td data-label="Descarga">
                                <div className="celda-progreso">
                                    <progress
                                        value={juego.progreso}
                                        max="100"
                                    ></progress>
                                    <span>{juego.progreso}%</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}