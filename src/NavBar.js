import React, { useState } from "react"
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";
import Colors from "./Colors";

const spin = keyframes`
 to {
     transform: rotate(360deg);
 }
`;

const NavBar = () => {
    const [padding, setPadding] = useState(15);
    return (
        <header
            onClick={() => setPadding(padding + 15)}
            css={css`
            background:${Colors.primary};
            padding:${padding}px;
        `}
        >
            <Link to="/">Adopt Me!</Link>
            <span
                css={css`
                font-size:60px;
                &:hover{
                animation : ${spin} 2s linear 1s infinite reverse;
                }
                animation : ${spin} 2s linear 1s infinite normal;
            `}
                role="img" aria-label="logo">💎</span>
        </header>
    )
}

export default NavBar;