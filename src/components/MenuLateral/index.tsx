import {useLocation, useNavigate } from "react-router-dom";

import { Menu, DadosUsuario, AcoesUsuario, LinkUsuario} from "./styled"
import { useReducer } from "react";

function MenuLateral() {
    const location = useLocation();
    const path = location.pathname.toLowerCase();
    const navigate = useNavigate();
    const from = location.state?.from || "/"; //Pega o caminho anterior que chegou nessa tela

    const handleClickSair = (e: any) => {
        e.preventDefault();
        console.log("Sair");
    }

    const limparPath = (textPath:String) => {
        if (textPath.length < 2) return "";
        return textPath[1].toUpperCase() + textPath.slice(2);
    }

    return (
        <Menu>
            <DadosUsuario>
                <h1>Usuario69</h1>
                <p>usuario69@gmail.com</p>
            </DadosUsuario>
            <AcoesUsuario>
                <LinkUsuario to={"/editUsuario"}>Perfil</LinkUsuario>
                <LinkUsuario to={"/"} onClick={handleClickSair}>Sair</LinkUsuario>
            </AcoesUsuario>
        </Menu>
    )
}

export default MenuLateral;