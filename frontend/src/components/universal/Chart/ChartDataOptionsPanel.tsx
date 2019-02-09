import * as React from 'react';
import styled, { withTheme } from 'styled-components';

import { ChartInstance } from './index';
import TinyButtons from 'components/TinyButtons';

import {
    faRulerHorizontal, faRulerVertical
} from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  padding: 0;
  float: right;
  position: relative;
  top: -1.68vw;
`;

export interface ChartDataOptionsPanelProps {
    chart: ChartInstance;
};

class ChartDataOptionsPanel extends React.Component<ChartDataOptionsPanelProps, any> {

    render() {
        return (
            <Wrapper>
                <TinyButtons>
                    {(
                        (this.props.chart.getChartOrientation() == 'horizontal')?(
                            {
                                icon: faRulerHorizontal.iconName,
                                onClick: () => {this.props.chart.setChartOrientation('vertical');},
                                text: 'Horizontal'
                            }
                        ):(null)
                    )}
                    {(
                            (this.props.chart.getChartOrientation() == 'vertical')?(
                                {
                                    icon: faRulerVertical.iconName,
                                    onClick: () => {this.props.chart.setChartOrientation('horizontal');},
                                    text: 'Vertical'
                                }
                            ):(null)
                    )}
                </TinyButtons>
            </Wrapper>
               
        );
    }
}

export default ChartDataOptionsPanel;