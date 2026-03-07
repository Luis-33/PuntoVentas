import { Link } from "react-router-dom";


function Sidebar() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
 <div>

    <Link to="/dashboard">Dashboard</Link>

    <Link to="/ventas">Ventas</Link>

    {usuario?.rol === "admin" && (
      <Link to="/usuarios">Usuarios</Link>
    )}

  </div>
  );
}

export default Sidebar;
