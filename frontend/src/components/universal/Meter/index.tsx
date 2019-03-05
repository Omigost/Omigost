import * as React from "react";
import styled, { withTheme }  from "styled-components";

import Tooltip from "components/Tooltip";
import Gauge from "react-svg-gauge";

const Wrapper = styled.div``;

const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 150;

export interface MeterProps {
    theme: any;
    label: string;
    value: number;
    format?: (value: number) => string;
    tooltipContent?: React.ReactElement<any>;
    width?: number;
    height?: number;
}

class Meter extends React.Component<MeterProps, undefined> {
    render() {

        const GaugeComponent = Gauge as any;

        return (
            <Wrapper>
                <Tooltip
                    content={this.props.tooltipContent}
                >
                    <div>
                        <GaugeComponent
                            value={this.props.value}
                            width={this.props.width || DEFAULT_WIDTH}
                            height={this.props.height || DEFAULT_HEIGHT}
                            label={this.props.label}
                            valueFormatter={this.props.format || ((value) => `${value}`)}
                            color={this.props.theme.colors.primary}
                            backgroundColor={this.props.theme.colors.background}
                            valueLabelStyle={{
                                fill: this.props.theme.colors.accent,
                            }}
                        />
                    </div>
                </Tooltip>
            </Wrapper>
        );
    }
}

export default withTheme(Meter);