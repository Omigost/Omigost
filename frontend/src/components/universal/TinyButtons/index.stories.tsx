import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { object, text } from "@storybook/addon-knobs";

import TinyButtons from "./index";

import {
    faClock, faCommentAlt, faDollarSign
} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
    margin-left: 10vw;
    margin-top: 10vw;
`;

storiesOf("TinyButtons", module)
    .add("with simple icons", () => {
        return (
            <Wrapper>
                <TinyButtons>
                    {[
                        {
                            "icon": faDollarSign,
                        },
                        {
                            "icon": faCommentAlt,
                        },
                        {
                            "icon": faClock,
                        },
                    ]}
                </TinyButtons>
            </Wrapper>
        );
    })
    .add("with icon and text", () => {
        return (
            <Wrapper>
                <TinyButtons>
                    {[
                        {
                            "icon": faDollarSign,
                            text: text("Text for item 1", "Some text"),
                        },
                        {
                            "icon": faCommentAlt,
                            text: text("Text for item 2", "Some text"),
                        },
                        {
                            "icon": faClock,
                            text: text("Text for item 3", "Some text"),
                        },
                    ]}
                </TinyButtons>
            </Wrapper>
        );
    })
    .add("with tooltips", () => {
        return (
            <Wrapper>
                <TinyButtons>
                    {[
                        {
                            "icon": faDollarSign,
                            text: text("Text for item 1", "Some text"),
                            tooltip: <div>Hello 1!</div>,
                        },
                        {
                            "icon": faCommentAlt,
                            text: text("Text for item 2", "Some text"),
                            tooltip: <div>Hello 2!</div>,
                        },
                        {
                            "icon": faClock,
                            text: text("Text for item 3", "Some text"),
                        },
                    ]}
                </TinyButtons>
            </Wrapper>
        );
    })
    .add("with popovers", () => {
        return (
            <Wrapper>
                <TinyButtons>
                    {[
                        {
                            "icon": faDollarSign,
                            text: text("Text for item 1", "Some text"),
                            popover: <div style={{color: 'black'}}>Hello 1!</div>,
                        },
                        {
                            "icon": faCommentAlt,
                            text: text("Text for item 2", "Some text"),
                            popover: <div style={{color: 'black'}}>Hello 2!</div>,
                        },
                    ]}
                </TinyButtons>
            </Wrapper>
        );
    });