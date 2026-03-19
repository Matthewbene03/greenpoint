import styled from "styled-components";
import * as colors from "../../config/colors";

export const Menu = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: start;
    gap: 20px;

    background-color: ${colors.PrimeiraCorClara};
    margin-bottom: 10px;
    padding: 10px 0px 10px 10px;

    h1, #arrowToReturn{
        color: ${colors.SegundaCorClara};
        font-size: 30px;
        cursor: pointer;
    }
`;