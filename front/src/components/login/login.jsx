import { useState } from "react";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error en login");
        return;
      }

      // Guardar token en localStorage
      localStorage.setItem("token", data.token);

      // Guardar usuario en estado
      setUsuario(data.usuario);

    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {usuario && (
        <div>
          <h3>Bienvenido {usuario.nombre_usuario}</h3>
          <p>Rol: {usuario.rol}</p>
        </div>
      )}
    </div>
  );
}

export default Login;