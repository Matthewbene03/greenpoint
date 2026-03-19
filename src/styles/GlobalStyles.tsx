import { createGlobalStyle } from "styled-components";
import * as colors from "../config/colors"

export default createGlobalStyle`

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    body{
        background-color: green;
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