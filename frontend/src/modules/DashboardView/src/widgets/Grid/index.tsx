import * as React from "react";
import styled from "styled-components";

const GridWrapper = styled.div`
    height: 92%;
    width: 100%;
    position: relative;
    top: -1vw;
`;

const TooltipContent = styled.div`
    width: 10vw;
`;

export default (app) => ({
    name: "grid",
    description: "Budgeting data grid",
    initialOptions: {},
    content: (options) => (
        <GridWrapper>
            <app.UI.DataGrid />
        </GridWrapper>
    ),
    width: 6,
    height: 7,
});