import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
${reset}
html{
    font-size:62.5%;
}
body{
    background-color: #19191A;
    color: #ffffff;
    font-family: 'Source Sans Pro', sans-serif;
    font-size:1.4rem;
    margin: 0 3rem
}

a{
    text-decoration:none;
    color:inherit;
}

h1{
    margin:0
}


`;
