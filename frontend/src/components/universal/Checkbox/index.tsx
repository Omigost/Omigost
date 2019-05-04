import * as React from "react";
import styled  from "styled-components";

import CheckboxComponent from "rc-checkbox";

const Wrapper = styled.div`
  padding: 1.2vw;
  width: 100%;
`;

export interface CheckboxProps {
    
}

export default class Checkbox extends React.Component<CheckboxProps, undefined> {
    render() {
        return (
            <Wrapper>
                <CheckboxComponent />
            </Wrapper>
        );
    }
}
