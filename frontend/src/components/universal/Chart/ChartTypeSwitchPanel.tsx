import * as React from 'react';
import styled, { withTheme } from 'styled-components';

import { ChartInstance } from './index';
import TinyButtons from 'components/TinyButtons';

const Wrapper = styled.div`
  padding: 0;
`;

export interface ChartTypeSwitchPanelProps {
    chart: ChartInstance;
};

class ChartTypeSwitchPanel extends React.Component<ChartTypeSwitchPanelProps, any> {

    render() {
        return (
            <Wrapper>
                <TinyButtons>
                    {[
                        {
                            icon: 'chart-line',
                            active: this.props.chart.getChartType() === 'line',
                            onClick: () => {this.props.chart.setChartType('line');}
                        },
                        {
                            icon: 'chart-bar',
                            active: this.props.chart.getChartType() === 'bar',
                            onClick: () => {this.props.chart.setChartType('bar');}
                        },
                        ((this.props.chart.getChartOrientation() != 'horizontal')?(
                            {
                                icon: 'chart-area',
                                active: this.props.chart.getChartType() === 'area',
                                onClick: () => {this.props.chart.setChartType('area');}
                            }
                        ):(null))
                    ]}
                </TinyButtons>
            </Wrapper>
               
        );
    }
}

export default ChartTypeSwitchPanel;