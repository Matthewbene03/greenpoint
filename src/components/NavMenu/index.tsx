import { useLocation, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";

import { Menu } from "./styled"


function NavMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || "/"; //Pega o caminho anterior que chegou nessa tela

    const handleClickArrow = (e: any) =>{
        e.preventDefault();
        navigate(from, {replace: true});
    }

    return (
        <Menu>
            {location.pathname === "/" &&
                <>
                    < IoMenuSharp id="arrowToReturn"/>
                    <h1>Home</h1>
                </>
            }
            {location.pathname === "/calendario" &&
                <>
                    < FaLongArrowAltLeft id="arrowToReturn" onClick={handleClickArrow}/>
                    <h1>Calendario</h1>
                </>
            }
            {location.pathname === "/mapa" &&
                <>
                    < FaLongArrowAltLeft id="arrowToReturn" onClick={handleClickArrow}/>
                    <h1>Mapa</h1>
                </>
            }
            {location.pathname === "/login" &&
                <>
                    < FaLongArrowAltLeft id="arrowToReturn" onClick={handleClickArrow}/>
                    <h1>Login</h1>
                </>
            }
            {location.pathname === "/cadastro" &&
                <>
                    < FaLongArrowAltLeft id="arrowToReturn" onClick={handleClickArrow}/>
                    <h1>Cadastro</h1>
                </>
            }
            {location.pathname === "/editar" &&
                <>
                    < FaLongArrowAltLeft id="arrowToReturn" onClick={handleClickArrow}/>
                    <h1>Editar</h1>
                </>
            }
        </Menu>
    )
}

export default NavMenu;