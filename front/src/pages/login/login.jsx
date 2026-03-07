import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";

function Login() {

  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post("/auth/login", {
        correo,
        password
      });
      

      // guardar token
      localStorage.setItem("token", res.data.token);

      // guardar usuario
    localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
      
      
      alert("Login correcto");

      navigate("/dashboard");

    } catch (error) {

      alert("Credenciales incorrectas");

    }
  };

  return (
    <form onSubmit={handleLogin}>

      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e)=>setCorreo(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button type="submit">
        Iniciar sesión
      </button>

    </form>
  );
}

export default Login;