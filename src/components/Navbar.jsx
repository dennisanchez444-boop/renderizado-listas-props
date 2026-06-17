import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">🎮 GameStore DS</div>
            <ul className="navbar-links">
                <li><Link to="/">Inventario</Link></li>
                <li><Link to="/nuevo">Nuevo Juego</Link></li>
            </ul>
        </nav>
    );
}