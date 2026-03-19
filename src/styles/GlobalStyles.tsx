import { createGlobalStyle } from "styled-components";
import * as colors from "../config/colors"

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=Oswald:wght@200..700&display=swap');

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    h1, h2, h3{
        font-family: "Oswald", sans-serif;
        font-optical-sizing: auto;
        font-weight: bold;
        font-style: normal;
    }

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    body{
        background-color: ${colors.SegundaCorClara};
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    body{    
        background-color: black;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    body{
        background-color: blue;
    }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    body{
        background-color: yellow;
    }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    body{
        background-color: red;
    }
}

`;