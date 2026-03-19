import { useLocation } from "react-router-dom";
import { LuMapPin } from "react-icons/lu";
import { GoHome } from "react-icons/go";
import { MdOutlineCalendarMonth } from "react-icons/md";

import { Container, LinkItem } from "./styled"

function Footer() {
    const location = useLocation();

    return (
        <Container>
            <LinkItem to={"/"} $pagAtiva={location.pathname === "/"}>
                <GoHome />
                Início
            </LinkItem>
            <LinkItem to={"/calendario"} $pagAtiva={location.pathname === "/calendario"}>
                <MdOutlineCalendarMonth />
                Calendario
            </LinkItem>
            <LinkItem to={"/mapa"} $pagAtiva={location.pathname === "/mapa"}>
                <LuMapPin />
                Mapa
            </LinkItem>
        </Container >
    )
}

export default Footer;