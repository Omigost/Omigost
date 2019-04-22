import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 1vw;
`;

export default (app) => ({
    name: "bar",
    description: "Widget to meter things",
    initialOptions: {},
    content: (options) => (
        <Wrapper>
            <app.UI.BarLine
                value={20}
            />
        </Wrapper>
    ),
    width: 3,
    height: 2,
});