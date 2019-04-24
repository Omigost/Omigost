import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";

import Loading from "./index";

storiesOf("Loading", module)
    .addWithJSX("default", () => {
        const Wrapper = styled.div`
            width: 10vw;
            height: 10vw;
            margin-left: 45vw;
            margin-top: 10vw;
        `;
        return (
            <Wrapper>
                <Loading />
            </Wrapper>
        );
    });