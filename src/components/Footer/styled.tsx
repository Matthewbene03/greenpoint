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

export const LinkItem = styled(Link)`
    flex: 30%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 80%;

        text-decoration: none;
        font-size: 18px;
        font-weight: bold;
        font-family: "Roboto", sans-serif;
        color: ${colors.SegundaCorClara};
        border-radius: 15px;
        cursor: pointer;
        transition: all 300ms;

    &:hover{
        color: ${colors.SegundaCorClara} !important;
    }
`;