import * as React from "react";
import styled  from "styled-components";

import "rc-slider/assets/index.css";

import SliderComponent, { Handle } from "rc-slider";
import Tooltip from "../Tooltip";

const Wrapper = styled.div`
  padding: 1.2vw;
  width: 100%;
  
  & .rc-slider {
      height: 0.5vw;
  }
  
  & .rc-slider-rail {
      height: 0.5vw;
  }
  
  & .rc-slider-track {
      background-color: ${(props) => props.theme.colors.primary};
      height: 0.5vw;
  }
  
  & .rc-slider-handle {
      border: solid 2px ${(props) => props.theme.colors.primary};
      width: 1.2vw;
      height: 1.2vw;
  }
  
  & .rc-slider-handle:focus, & .rc-slider-handle:hover {
      border: solid 2px ${(props) => props.theme.colors.secondary};
  }
`;

export interface SliderProps {
    min: number;
    max: number;
    defaultValue?: number;
    value?: number;
    onChange?: (value: any) => void;
}

const SliderHandle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            content={
                <div>
                    {value}
                </div>
            }
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

export default class Slider extends React.Component<SliderProps, undefined> {
    render() {
        return (
            <Wrapper>
                <SliderComponent
                    min={this.props.min}
                    max={this.props.max}
                    defaultValue={this.props.defaultValue}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    handle={SliderHandle}
                />
            </Wrapper>
        );
    }
}