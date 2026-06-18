import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideojuego.css";

export default function FormularioVideojuego({ onAgregar, onEditar }) {
    const location = useLocation();
    const navigate = useNavigate();
    const juegoAEditar = location.state?.juego;

    const [errores, setErrores] = useState({});

    const [form, setForm] = useState({
        titulo: "",
        genero: "",
        plataforma: "PC",
        lanzamiento: "",
        precio: "",
        disponible: true,
        sinopsis: "",
        calificacion: ""
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
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "number"
                        ? Number(value)
                        : value
        });
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!form.titulo.trim()) {
            nuevosErrores.titulo =
                "El título no puede estar vacío";
        }

        if (!form.genero.trim()) {
            nuevosErrores.genero =
                "El género es obligatorio";
        }

        if (!form.precio || form.precio <= 0) {
            nuevosErrores.precio =
                "Ingrese un precio válido";
        }

        const hoy = new Date().toISOString().split("T")[0];

        if (!form.lanzamiento) {
            nuevosErrores.lanzamiento =
                "Seleccione una fecha";
        } else if (form.lanzamiento > hoy) {
            nuevosErrores.lanzamiento =
                "No se permiten fechas futuras";
        }

        if (!form.sinopsis.trim()) {
            nuevosErrores.sinopsis =
                "La sinopsis es obligatoria";
        } else if (form.sinopsis.trim().length < 10) {
            nuevosErrores.sinopsis =
                "Debe contener al menos 10 caracteres";
        } else if (form.sinopsis.trim().length > 250) {
            nuevosErrores.sinopsis =
                "Máximo 250 caracteres";
        }

        if (
            !form.calificacion ||
            form.calificacion < 1 ||
            form.calificacion > 100
        ) {
            nuevosErrores.calificacion =
                "La calificación debe estar entre 1 y 100";
        }

        return nuevosErrores;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const erroresActivos = validarFormulario();

        if (Object.keys(erroresActivos).length > 0) {
            setErrores(erroresActivos);
            return;
        }

        setErrores({});

        if (juegoAEditar) {
            onEditar(form);
        } else {
            onAgregar({
                ...form,
                id: Date.now().toString(),
                progreso:
                    form.progreso ||
                    Math.floor(Math.random() * 100)
            });
        }

        navigate("/");
    };

    return (
        <div className="contenedor-formulario-juego">
            <h2>
                {juegoAEditar
                    ? "Editar Videojuego"
                    : "Registrar Nuevo Videojuego"}
            </h2>

            <form onSubmit={handleSubmit} className="form-dinamico">

                <div className="grupo-input">
                    <label>Título:</label>
                    <input
                        type="text"
                        name="titulo"
                        value={form.titulo}
                        onChange={handleChange}
                    />
                    {errores.titulo && (
                        <span className="error-mensaje">
                            {errores.titulo}
                        </span>
                    )}
                </div>

                <div className="grupo-input">
                    <label>Género:</label>
                    <input
                        type="text"
                        name="genero"
                        value={form.genero}
                        onChange={handleChange}
                    />
                    {errores.genero && (
                        <span className="error-mensaje">
                            {errores.genero}
                        </span>
                    )}
                </div>

                <div className="grupo-input">
                    <label>Plataforma:</label>
                    <select
                        name="plataforma"
                        value={form.plataforma}
                        onChange={handleChange}
                    >
                        <option value="PC">PC</option>
                        <option value="PlayStation 5">
                            PlayStation 5
                        </option>
                        <option value="Xbox Series X">
                            Xbox Series X
                        </option>
                        <option value="Nintendo Switch">
                            Nintendo Switch
                        </option>
                    </select>
                </div>

                <div className="grupo-input">
                    <label>Fecha de lanzamiento:</label>
                    <input
                        type="date"
                        name="lanzamiento"
                        value={form.lanzamiento}
                        onChange={handleChange}
                    />

                    {errores.lanzamiento && (
                        <span className="error-mensaje">
                            {errores.lanzamiento}
                        </span>
                    )}
                </div>

                <div className="grupo-input">
                    <label>Precio ($):</label>
                    <input
                        type="number"
                        step="0.01"
                        name="precio"
                        value={form.precio}
                        onChange={handleChange}
                    />

                    {errores.precio && (
                        <span className="error-mensaje">
                            {errores.precio}
                        </span>
                    )}
                </div>

                <div className="grupo-input">
                    <label>Sinopsis:</label>

                    <textarea
                        name="sinopsis"
                        value={form.sinopsis}
                        onChange={handleChange}
                        placeholder="Escribe una breve descripción del videojuego"
                    />

                    {errores.sinopsis && (
                        <span className="error-mensaje">
                            {errores.sinopsis}
                        </span>
                    )}
                </div>

                <div className="grupo-input">
                    <label>Calificación:</label>

                    <input
                        type="number"
                        name="calificacion"
                        min="1"
                        max="100"
                        value={form.calificacion}
                        onChange={handleChange}
                    />

                    {errores.calificacion && (
                        <span className="error-mensaje">
                            {errores.calificacion}
                        </span>
                    )}
                </div>

                <div className="grupo-checkbox">
                    <input
                        type="checkbox"
                        name="disponible"
                        id="disponible"
                        checked={form.disponible}
                        onChange={handleChange}
                    />

                    <label htmlFor="disponible">
                        ¿El videojuego está disponible?
                    </label>
                </div>

                <button
                    type="submit"
                    className="btn-guardar-juego"
                >
                    {juegoAEditar
                        ? "Actualizar Videojuego"
                        : "Guardar Videojuego"}
                </button>

            </form>
        </div>
    );
}