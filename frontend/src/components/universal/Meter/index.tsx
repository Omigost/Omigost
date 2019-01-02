import * as React from 'react';
import styled, { withTheme }  from 'styled-components';

import Gauge from 'react-svg-gauge';
import Tooltip from 'components/Tooltip';

const Wrapper = styled.div`
  padding: 0;
`;

export interface MeterProps {
    theme: any;
    label: string;
    value: number;
    format?: (number) => string;
    tooltipContent?: React.ReactElement<any>;
};

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
                            width={200}
                            height={150}
                            label={this.props.label}
                            valueFormatter={this.props.format || ((value) => `${value}`)}
                            color={this.props.theme.colors.primary}
                            backgroundColor={this.props.theme.colors.background}
                            valueLabelStyle={{
                                fill: this.props.theme.colors.accent
                            }}
                        />
                    </div>
                </Tooltip>
            </Wrapper>
        );
    }
};

export default withTheme(Meter);