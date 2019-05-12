import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";

import ButtonPanel from "./index";

storiesOf("ButtonPanel", module)
    .addWithJSX("with text", () => {
        const Wrapper = styled.div`
            width: 10vw;
        `;
        return (
            <Wrapper>
                <ButtonPanel>
                    {text("Content", "Hello!")}
                </ButtonPanel>
            </Wrapper>
        );
    });