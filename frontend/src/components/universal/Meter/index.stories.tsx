import { number, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";

import Meter from "./index";

storiesOf("Meter", module)
    .addWithJSX("with value and label", () => {
        const Wrapper = styled.div`
            width: 10vw;
        `;
        return (
            <Wrapper>
                <Meter value={number("Value", 30)} label={text("Label", "$")} />
            </Wrapper>
        );
    })
    .addWithJSX("with custom format", () => {
        const Wrapper = styled.div`
            width: 10vw;
        `;
        return (
            <Wrapper>
                <Meter
                    value={number("Value", 30)}
                    label={text("Label", "$")}
                    format={(value) => `${value}%`}
                    width={number("Width", 150)}
                    height={number("Height", 150)}
                />
            </Wrapper>
        );
    })
    .addWithJSX("with custom tooltip", () => {
        const Wrapper = styled.div`
            width: 10vw;
        `;
        return (
            <Wrapper>
                <Meter
                    value={number("Value", 30)}
                    label={text("Label", "$")}
                    tooltipContent={text("TooltipContent", "This is my tooltip")}
                />
            </Wrapper>
        );
    });