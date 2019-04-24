import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";

import Logo, { LogoType } from "./index";

storiesOf("Logo", module)
    .addWithJSX("default", () => {
        const Wrapper = styled.div`
            width: 30vw;
            height: 30vw;
        `;

        return (
            <Wrapper>
                <Logo type={LogoType.Default}/>
            </Wrapper>
        );
    })
    .addWithJSX("with sombrerro type", () => {
        const Wrapper = styled.div`
            width: 15vw;
            height: 15vw;
        `;

        return (
            <Wrapper>
                <Logo type={LogoType.Sombrerro}/>
            </Wrapper>
        );
    })
    .addWithJSX("with pepper type", () => {
        const Wrapper = styled.div`
            width: 15vw;
            height: 15vw;
        `;

        return (
            <Wrapper>
                <Logo type={LogoType.Pepper}/>
            </Wrapper>
        );
    });