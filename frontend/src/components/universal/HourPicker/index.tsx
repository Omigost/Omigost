import * as React from "react";
import styled  from "styled-components";

import TimeKeeper from "react-timekeeper";

const Wrapper = styled.div`
  width: 100%;

  & .react-timekeeper {
    box-shadow: none !important;
  }

  & .react-timekeeper__hour-select {
    color: ${(props) => props.theme.colors.primary} !important;
  }
`;

export interface HourTime {
    hours: number;
    minutes: number;
}

export interface HourPickerProps {
    onChange?: (hour: HourTime) => void;
    value: HourTime;
}

export default class HourPicker extends React.Component<HourPickerProps, undefined> {
    render() {
        return (
            <Wrapper>
                <TimeKeeper
                    value={this.props.value}
                    onChange={(value) => {
                        if (this.props.onChange) {
                            this.props.onChange({
                                hours: value.hours24,
                                minutes: value.minutes,
                            });
                        }
                    }}
                />
            </Wrapper>
        );
    }
}
