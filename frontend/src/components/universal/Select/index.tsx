import * as React from "react";
import styled  from "styled-components";

import SelectComponent from "react-select";

const Wrapper = styled.div`
  padding: 1.2vw;
  width: 100%;
`;

export interface OptionSpecs {
    value: string;
    label: string;
}

export interface SelectProps {
    options: Array<OptionSpecs>;
    value?: OptionSpecs;
    onChange?: (option: any) => void;
}

export default class Select extends React.Component<SelectProps, undefined> {
    render() {
        return (
            <Wrapper>
                <SelectComponent
                    value={this.props.value}
                    options={this.props.options}
                    onChange={this.props.onChange}
                />
            </Wrapper>
        );
    }
}
