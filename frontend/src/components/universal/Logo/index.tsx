import * as React from "react";
import styled from "styled-components";

const logo = require("img/omigost_logo.svg");
const sombrerro = require("img/omigost_sombrerro.svg");
const pepper = require("img/omigost_single.svg");

const ImgHolder = styled.img`
  width: 100%
`;

export enum LogoType {
    Default = "Default",
    Sombrerro = "Sombrerro",
    Pepper = "Pepper",
}

export interface LogoProps {
    type?: LogoType | string;
}

export default class Logo extends React.Component<LogoProps, undefined> {
    render() {

        let src = logo;
        switch (this.props.type) {
            case LogoType.Default:
                src = logo;
                break;
            case LogoType.Sombrerro:
                src = sombrerro;
                break;
            case LogoType.Pepper:
                src = pepper;
                break;
            default:
                src = this.props.type;
        }

        return (
            <ImgHolder src={src} />
        );
    }
}
