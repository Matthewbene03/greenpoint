import { useLocation, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";

import { Menu } from "./styled"

function NavMenu() {
    const location = useLocation();
    const path = location.pathname.toLowerCase();
    const navigate = useNavigate();
    const from = location.state?.from || "/"; //Pega o caminho anterior que chegou nessa tela

    const handleClickArrow = (e: any) => {
        e.preventDefault();
        navigate(from, { replace: true });
    }

    const handleClickMenuSharp = (e: any) => {
        e.preventDefault();
        
    }

    const limparPath = (textPath:String) => {
        if (textPath.length < 2) return "";
        return textPath[1].toUpperCase() + textPath.slice(2);
    }

    return (
        <Menu>
            {path === "/" ? (
                <>
                    < IoMenuSharp id="arrowToReturn" onClick={handleClickMenuSharp}/>
                    <h1>Home</h1>
                </>
            ) : (
                <>
                    < FaLongArrowAltLeft id="arrowToReturn" onClick={handleClickArrow} />
                    <h1>{limparPath(path)}</h1>
                </>
            )}
        </Menu>
    )
}

export default NavMenu;