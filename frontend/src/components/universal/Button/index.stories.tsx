import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";

import Button from "./index";

storiesOf("Button", module)
    .addWithJSX("with text", () => {
        const Wrapper = styled.div`
            width: 10vw;
        `;
        return (
            <Wrapper>
                <Button>
                    {text("Content", "Hello!")}
                </Button>
            </Wrapper>
        );
    })
    .addWithJSX("with onClick handler", () => {
        const Wrapper = styled.div`
            width: 10vw;
        `;
        return (
            <Wrapper>
                <Button onClick={() => alert("This is text in alert popup! Button was clicked!")}>
                    {text("Content", "Hello!")}
                </Button>
            </Wrapper>
        );
    })
    .addWithJSX("without wrapper and with size setting", () => {
        return (
            <Button size={text("Size", "XL")}>
                {text("Content", "Hello!")}
            </Button>
        );
    });
