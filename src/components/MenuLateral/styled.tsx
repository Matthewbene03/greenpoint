import styled from "styled-components";
import * as colors from "../../config/colors";
import { Link } from "react-router-dom";

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-items: start;
    gap: 20px;

    padding: 0px 10px;
    background-color: ${colors.CorCinzaClaro};
    height: 80vh;
    width: 70vw;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
`;

export const DadosUsuario = styled.div`
    flex: 20%;
    width: 100%;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: center;
    padding-left: 10px;
    gap: 5px;
    
    h1{
        font-size: 30px;
    }

    p{
        font-weight: 500;
    }
    
    border-bottom: 1px solid ${colors.PrimeiraCorEscura};
`;

export const AcoesUsuario = styled.div`
    flex: 80%;
    width: 100%;
    
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    padding-left: 10px;
    gap: 10px;
`;

export const LinkUsuario = styled(Link)`
    color: ${colors.PrimeiraCorEscura};
    font-size: 20px;
    cursor: pointer;
`;