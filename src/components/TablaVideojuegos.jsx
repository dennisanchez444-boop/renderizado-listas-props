import React from "react";
import { useNavigate } from "react-router-dom";
import "./TablaVideojuegos.css";

export function TablaVideojuegos({ juegos, onEliminar }) {
    const navigate = useNavigate();
    console.log(juegos);
    return (
        <div className="contenedor-tabla">
            <table className="tabla-videojuegos">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Género</th>
                        <th>Plataforma</th>
                        <th>Lanzamiento</th>
                        <th>Calificación</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Descarga</th>
                        <th>Sinopsis</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {juegos.map((juego) => (
                        <tr key={juego.id}>
                            <td data-label="Título">
                                {juego.titulo}
                            </td>

                            <td data-label="Género">
                                {juego.genero}
                            </td>

                            <td data-label="Plataforma">
                                {juego.plataforma}
                            </td>

                            <td data-label="Lanzamiento">
                                {juego.lanzamiento}
                            </td>

                            <td data-label="Calificación">
                                {juego.calificacion || 0}/100
                            </td>

                            <td data-label="Precio">
                                ${Number(juego.precio).toFixed(2)}
                            </td>

                            <td data-label="Estado">
                                <span
                                    className={`badge ${juego.disponible
                                        ? "disponible"
                                        : "agotado"
                                        }`}
                                >
                                    {juego.disponible
                                        ? "Disponible"
                                        : "Agotado"}
                                </span>
                            </td>

                            <td data-label="Descarga">
                                <div className="celda-progreso">
                                    <progress
                                        value={juego.progreso || 0}
                                        max="100"
                                    ></progress>

                                    <span>
                                        {juego.progreso || 0}%
                                    </span>
                                </div>
                            </td>

                            <td
                                data-label="Sinopsis"
                                className="sinopsis-col"
                            >
                                {juego.sinopsis ||
                                    "Sin descripción disponible"}
                            </td>

                            <td data-label="Acciones">
                                <div className="celda-acciones">
                                    <button
                                        className="btn-edit"
                                        onClick={() =>
                                            navigate("/editar", {
                                                state: { juego }
                                            })
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn-delete"
                                        onClick={() =>
                                            onEliminar(juego.id)
                                        }
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}