import React from "react";
import { Link } from "react-router-dom";

export default function PaginaNoEncontrada() {
    return (
        <div className="contenedor-error-404">
            <div className="tarjeta-error">
                <h1 className="numero-404">404</h1>
                <h2 className="titulo-error">Sección No Encontrada</h2>
                <p className="descripcion-error">
                    El recurso o módulo al que intentas acceder no existe en la base de la SPA.
                </p>
                <Link to="/" className="btn-regresar-404">
                    Regresar al Inventario
                </Link>
            </div>
        </div>
    );
}