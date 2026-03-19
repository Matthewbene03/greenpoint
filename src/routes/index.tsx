import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Calendario from "../pages/Calendario";
import Mapa from "../pages/MapaRotas";
import CadastroUsuario from "../pages/CadastroUsuario";
import LoginUsuario from "../pages/LoginUsuario";
import Error404 from "../pages/Error404";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/login" element={<LoginUsuario />} />
            <Route path="/cadastro" element={<CadastroUsuario />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default AppRoutes;