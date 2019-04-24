import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";

import { I18n } from "react-polyglot";
const locale = "en";

import TextBox from "./index";
import messages from "langs/en";

const Wrapper = styled.div`
    width: 30vw;
    margin-left: 10vw;
    margin-top: 10vw;
    border: solid 0.3vw black;
`;

const SomeWrapper = ({ children }) => {
    return (
        <Wrapper>
            <I18n locale={locale} messages={messages}>
                { children }
            </I18n>
        </Wrapper>
    );
};

storiesOf("TextBox", module)
    .addWithJSX("basic text", () => {
        return (
            <Wrapper>
                <TextBox>
                    {text("Text", "Hello world!")}
                </TextBox>
            </Wrapper>
        );
    })
    .addWithJSX("automatic translations", () => {
        return (
            <SomeWrapper>
                <TextBox translate>
                    {text("Text", "welcome_message_3")}
                </TextBox>
            </SomeWrapper>
        );
    })
    .addWithJSX("with size", () => {
        return (
            <SomeWrapper>
                <TextBox translate size={text("Size", "XL")}>
                    {text("Text", "welcome_message_1")}
                </TextBox>
            </SomeWrapper>
        );
    })
    .addWithJSX("compact", () => {
        return (
            <SomeWrapper>
                <TextBox translate compact size={text("Size", "XL")}>
                    {text("Text", "welcome_message_1")}
                </TextBox>
            </SomeWrapper>
        );
    });