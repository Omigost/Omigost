import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { text, boolean, object, number } from "@storybook/addon-knobs";

import DataGrid from "./index";

storiesOf("DataGrid", module)
    .addWithJSX("basic data grid", () => {
        const Wrapper = styled.div`
            width: 100%;
            height: 50vw;
        `;

        return (
            <Wrapper>
                <DataGrid
                    data={{
                        columns: [
                            {
                                name: "x",
                                type: "string",
                            },
                            {
                                name: "y",
                                type: "number",
                            },
                            {
                                name: "z",
                                type: "number",
                            },
                        ],
                        rows: [
                            {x:"Item 1", y:2, z:5},
                            {x:"Item 2", y:5, z:7},
                            {x:"Item 3", y:9, z:1},
                            {x:"Item 4", y:4, z:4},
                            {x:"Item 5", y:8, z:9},
                        ],
                    }}
                />
            </Wrapper>
        );
    })
    .addWithJSX("advanced cell type", () => {
        const Wrapper = styled.div`
            min-width: 93vw;
            width: 93vw;
            height: 50vw;
        `;

        return (
            <Wrapper>
                <DataGrid
                    data={{
                        columns: [
                            {
                                name: "Field x",
                                field: "x",
                                type: "string",
                            },
                            {
                                name: "Field y",
                                field: "y",
                                type: "number",
                            },
                            {
                                name: "The other one",
                                field: "z",
                                type: "ui-line",
                            },
                        ],
                        rows: [
                            {x:"Item 1", y:2, z:10},
                            {x:"Item 2", y:5, z:33},
                            {x:"Item 3", y:9, z:80},
                            {x:"Item 4", y:4, z:15},
                            {x:"Item 5", y:8, z:69},
                        ],
                    }}
                />
            </Wrapper>
        );
    });