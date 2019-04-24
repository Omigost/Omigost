import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";

import Page from "./index";

const Wrapper = styled.div`
    border: 0.3vw solid black;
`;

storiesOf("Page", module)
    .addWithJSX("basic layout", () => {
        return (
            <Page>
                <Wrapper>
                    {text("Content", "Some content!")}
                </Wrapper>
            </Page>
        );
    })
    .addWithJSX("fill layout", () => {
        return (
            <Page type="fill">
                <Wrapper>
                    {text("Content", "Some content!")}
                </Wrapper>
            </Page>
        );
    });