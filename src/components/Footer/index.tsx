import { LuMapPin } from "react-icons/lu";
import { GoHome } from "react-icons/go";
import { MdOutlineCalendarMonth } from "react-icons/md";

import { Container, LinkItem } from "./styled"
import * as rotas from "../../config/rotas"

function Footer() {
    return (
        <Container>
            <LinkItem to={rotas.Home}>
                <GoHome />
                Início
            </LinkItem>
            <LinkItem to={rotas.Calendario}>
                <MdOutlineCalendarMonth />
                Calendario
            </LinkItem>
            <LinkItem to={rotas.Mapa}>
                <LuMapPin />
                Mapa
            </LinkItem>
        </Container >
    )
}

export default Footer;