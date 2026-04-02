import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
        margin: 0;
        background-color: white;
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
`