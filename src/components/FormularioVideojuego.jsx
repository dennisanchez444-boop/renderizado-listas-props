import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideojuego.css";

export default function FormularioVideojuego({ onAgregar, onEditar }) {
    const location = useLocation();
    const navigate = useNavigate();
    const juegoAEditar = location.state?.juego;

    const [form, setForm] = useState({
        titulo: "",
        genero: "",
        plataforma: "PC",
        lanzamiento: "",
        precio: "",
        disponible: true,
        progreso: 0
    });

    useEffect(() => {
        if (juegoAEditar) {
            setForm(juegoAEditar);
        }
    }, [juegoAEditar]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : type === "number" ? parseFloat(value) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (juegoAEditar) {
            onEditar(form);
        } else {
            onAgregar({
                ...form,
                id: Date.now().toString(),
                progreso: form.progreso || Math.floor(Math.random() * 100)
            });
        }
        navigate("/");
    };

    return (
        <div className="contenedor-formulario-juego">
            <h2>{juegoAEditar ? "Editar Videojuego" : "Registrar Nuevo Videojuego"}</h2>
            <form onSubmit={handleSubmit} className="form-dinamico">
                <div className="grupo-input">
                    <label>Título:</label>
                    <input type="text" name="titulo" value={form.titulo} onChange={handleChange} required />
                </div>
                <div className="grupo-input">
                    <label>Género:</label>
                    <input type="text" name="genero" value={form.genero} onChange={handleChange} required />
                </div>
                <div className="grupo-input">
                    <label>Plataforma:</label>
                    <select name="plataforma" value={form.plataforma} onChange={handleChange}>
                        <option value="PC">PC</option>
                        <option value="PlayStation 5">PlayStation 5</option>
                        <option value="Xbox Series X">Xbox Series X</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                    </select>
                </div>
                <div className="grupo-input">
                    <label>Año de Lanzamiento:</label>
                    <input type="number" name="lanzamiento" value={form.lanzamiento} onChange={handleChange} required />
                </div>
                <div className="grupo-input">
                    <label>Precio ($):</label>
                    <input type="number" step="0.01" name="precio" value={form.precio} onChange={handleChange} required />
                </div>
                <div className="grupo-checkbox">
                    <input type="checkbox" name="disponible" id="disponible" checked={form.disponible} onChange={handleChange} />
                    <label htmlFor="disponible">¿El producto se encuentra disponible?</label>
                </div>
                <button type="submit" className="btn-guardar-juego">
                    {juegoAEditar ? "Actualizar Videojuego" : "Guardar Videojuego"}
                </button>
            </form>
        </div>
    );
}