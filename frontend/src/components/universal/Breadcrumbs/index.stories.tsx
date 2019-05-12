import { object } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";

import Breadcrumbs from "./index";

storiesOf("Breadcrumbs", module)
    .add("basic items", () => {
        const Wrapper = styled.div`
            padding: 5vw;
        `;
        return (
            <Wrapper>
                <Breadcrumbs>
                    {object("Items", [
                        {
                            name: "Item1",
                        },
                        {
                            name: "Item2",
                        },
                        {
                            name: "Item3",
                        },
                    ])}
                </Breadcrumbs>
            </Wrapper>
        );
    })
    .add("clickable items", () => {
        const Wrapper = styled.div`
            padding: 5vw;
        `;
        return (
            <Wrapper>
                <Breadcrumbs>
                    {object("Items", [
                        {
                            name: "Item1",
                            onClick: () => alert("Item1 was clicked!"),
                        },
                        {
                            name: "Item2",
                            onClick: () => alert("Item2 was clicked!"),
                        },
                        {
                            name: "Item3",
                            onClick: () => alert("Item3 was clicked!"),
                        },
                    ])}
                </Breadcrumbs>
            </Wrapper>
        );
    });