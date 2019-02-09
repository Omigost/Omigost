import * as React from 'react';
import styled, { withTheme } from 'styled-components';

import { ChartInstance } from './index';
import TinyButtons from 'components/TinyButtons';

import {
    faChartLine, faChartBar, faChartArea
} from '@fortawesome/free-solid-svg-icons';

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
                    {{
                            icon: faChartLine.iconName,
                            active: this.props.chart.getChartType() === 'line',
                            onClick: () => {this.props.chart.setChartType('line');}
                    }}
                    {{
                            icon: faChartBar.iconName,
                            active: this.props.chart.getChartType() === 'bar',
                            onClick: () => {this.props.chart.setChartType('bar');}
                    }}
                    {
                        ((this.props.chart.getChartOrientation() != 'horizontal')?(
                            {
                                icon: faChartArea.iconName,
                                active: this.props.chart.getChartType() === 'area',
                                onClick: () => {this.props.chart.setChartType('area');}
                            }
                        ):(null))
                    }
                </TinyButtons>
            </Wrapper>
               
        );
    }
}

export default ChartTypeSwitchPanel;