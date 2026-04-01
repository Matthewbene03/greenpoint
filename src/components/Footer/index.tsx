import { useLocation } from "react-router-dom";
import { LuMapPin } from "react-icons/lu";
import { GoHome } from "react-icons/go";
import { MdOutlineCalendarMonth } from "react-icons/md";

import { Container, LinkItem } from "./styled"
import * as rotas from "../../config/rotas"

function Footer() {
    const location = useLocation();

    return (
        <Container>
            <LinkItem to={rotas.Home} $pagAtiva={location.pathname === rotas.Home}>
                <GoHome />
                Início
            </LinkItem>
            <LinkItem to={rotas.Calendario} $pagAtiva={location.pathname === rotas.Calendario}>
                <MdOutlineCalendarMonth />
                Calendario
            </LinkItem>
            <LinkItem to={rotas.Mapa} $pagAtiva={location.pathname === rotas.Mapa}>
                <LuMapPin />
                Mapa
            </LinkItem>
        </Container >
    )
}

export default Footer;