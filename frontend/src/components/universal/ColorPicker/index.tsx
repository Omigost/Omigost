import * as React from "react";
import styled  from "styled-components";

import { TwitterPicker } from "react-color";
import Popover from "../Popover";

const Wrapper = styled.div`
  max-width: 3vw;
  width: 3vw;
  height: 3vw;
`;

const ColorBox = styled.div`
  display: inline-block;
  max-width: 3vw;
  width: 3vw;
  height: 3vw;
  border-radius: 1vw;
  margin: 0.3vw;
`;

export interface Color {
    hex: string;
}

export interface ColorPickerProps {
    value: string;
    onChangeComplete?: (color: Color) => void;
}

export default class ColorPicker extends React.Component<ColorPickerProps, undefined> {
    render() {
        return (
            <Wrapper>
                <Popover
                    content={
                        <TwitterPicker
                            triangle={"hide"}
                            color={this.props.value}
                            onChangeComplete={this.props.onChangeComplete}
                        />
                    }
                >
                    <ColorBox
                        style={{
                            backgroundColor: ((this.props.value) ? (this.props.value) : ("black")),
                        }}
                    />
                </Popover>
            </Wrapper>
        );
    }
}
