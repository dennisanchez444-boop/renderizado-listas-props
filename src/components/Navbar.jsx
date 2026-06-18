import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                🎮 GameStore DS
            </div>

            <ul className="navbar-links">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        Inventario
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/nuevo"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        Nuevo Juego
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}