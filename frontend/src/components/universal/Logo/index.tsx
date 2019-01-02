import * as React from 'react';
import styled from 'styled-components';

const logo = require('img/omigost_logo.svg');

const ImgHolder = styled.img`
  width: 100%
`;

export interface LogoProps {
}

export default class Logo extends React.Component<LogoProps, undefined> {
    render() {
        return (
            <ImgHolder src={logo} />
        );
    }
}
