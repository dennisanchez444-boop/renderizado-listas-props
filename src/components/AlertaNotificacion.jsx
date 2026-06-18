import "./AlertaNotificacion.css";

export default function AlertaNotificacion({
    mensaje,
}) {
    return (
        <div className="toast">
            {mensaje}
        </div>
    );
}