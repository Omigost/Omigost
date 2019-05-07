import * as React from "react";
import styled  from "styled-components";

import {
    faCopy,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Clipboard from "react-clipboard.js";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const ContentWrapper = styled.div`
    display: inline-block;
    width: 90%;
    height: 100%;
`;

const ButtonWrapper = styled.div`
    display: inline-block;

    & button {
        font-family: ${(props) => props.theme.primaryFont};
        color: gray;
        background: transparent;
        border: none;
        cursor: pointer;
    }
`;

export interface ClipboardCopyProps {
    text: string;
}

export default class ClipboardCopy extends React.Component<ClipboardCopyProps, undefined> {
    render() {
        return (
            <Wrapper>
                <ContentWrapper>
                    {this.props.children}
                </ContentWrapper>
                <ButtonWrapper>
                    <Clipboard
                        data-clipboard-text={this.props.text}
                    >
                        <FontAwesomeIcon icon={faCopy.iconName} />
                    </Clipboard>
                </ButtonWrapper>
            </Wrapper>
        );
    }
}
