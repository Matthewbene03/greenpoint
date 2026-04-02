import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Calendario from "../pages/Calendario";
import Mapa from "../pages/MapaRotas";
import CadastroUsuario from "../pages/CadastroUsuario";
import LoginUsuario from "../pages/LoginUsuario";
import EditUsuario from "../pages/EditUsuario";
import Error404 from "../pages/Error404";

import * as rotas from "../config/rotas";

function AppRoutes() {
    return (
        <Routes>
            <Route path={rotas.Home} element={<Home />} />
            <Route path={rotas.Calendario} element={<Calendario />} />
            <Route path={rotas.Mapa} element={<Mapa />} />
            <Route path={rotas.Login} element={<LoginUsuario />} />
            <Route path={rotas.CadastrarUsuario} element={<CadastroUsuario />} />
            <Route path={rotas.EditarUsario} element={<EditUsuario />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default AppRoutes;