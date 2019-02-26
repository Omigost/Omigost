import * as React from 'react';
import styled, { withTheme } from 'styled-components';

import { ChartInstance, ChartOrientation } from './index';
import TinyButtons from 'components/TinyButtons';

import {
    faRulerHorizontal, faRulerVertical
} from '@fortawesome/free-solid-svg-icons';

import { IconLookup } from '@fortawesome/fontawesome-common-types';

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
        
        const generateButton = (spec: {
            icon: IconLookup;
            text: string;
            orientation: ChartOrientation;
        }) => {
            if(this.props.chart.getChartOrientation() === spec.orientation) {
                return null;
            }
            
            return {
                icon: spec.icon.iconName,
                text: spec.text,
                onClick: () => {this.props.chart.setChartOrientation(spec.orientation);}
            };
        };
        
        return (
            <Wrapper>
                <TinyButtons>
                    {
                        [
                            {
                                icon: faRulerHorizontal,
                                orientation: ChartOrientation.Horizontal,
                                text: 'Horizontal'
                            },
                            {
                                icon: faRulerVertical,
                                orientation: ChartOrientation.Vertical,
                                text: 'Vertical'
                            }
                        ].map(generateButton)
                    }
                </TinyButtons>
            </Wrapper>
               
        );
    }
}

export default ChartDataOptionsPanel;