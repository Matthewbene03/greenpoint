import styled from "styled-components";
import * as colors from "../../config/colors"
import { Link } from "react-router-dom";

export const Container = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 10px;
    
    padding: 10px 20px;
    background-color: ${colors.PrimeiraCorClara};
    width: 100%;
`;

interface Props {
  $pagAtiva: boolean;
}

export const LinkItem = styled(Link)<Props>`
    flex: 30%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 80%;
        /* border: 2px solid red; */

        text-decoration: none;
        font-size: 18px;
        font-weight: bold;
        font-family: "Roboto", sans-serif;
        color: ${colors.SegundaCorClara};

        border-radius: 15px;
        background-color: ${({ $pagAtiva }) => ($pagAtiva ? colors.PrimeiraCorClara: "none")};

        cursor: pointer;
        transition: all 300ms;
    
    &:hover{
        background-color: ${colors.PrimeiraCorClara};
    }
`;