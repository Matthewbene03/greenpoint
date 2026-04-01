import { createGlobalStyle } from "styled-components";
import * as colors from "../config/colors"

export default createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
        margin: 0;
    }

    h1, h2, h3{
        font-family: "Oswald", sans-serif;
        font-optical-sizing: auto;
        font-weight: bold;
        font-style: normal;
    }

    a, p{
        font-family: "Funnel Sans", sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
        text-decoration: none;
    }

    

/* @media only screen and (max-width: 600px) {
    body{
        background-color: ${colors.SegundaCorClara};
    }
}

@media only screen and (min-width: 600px) {
    body{    
        background-color: black;
    }
}

@media only screen and (min-width: 768px) {
    body{
        background-color: blue;
    }
}

@media only screen and (min-width: 992px) {
    body{
        background-color: yellow;
    }
}

@media only screen and (min-width: 1200px) {
    body{
        background-color: red;
    }
} */

`