import * as React from "react";
import styled from "styled-components";

import TinyButtons from "components/TinyButtons";
import { ChartInstance, ChartOrientation, ChartType } from "./index";

import {
    faChartArea, faChartBar, faChartLine,
} from "@fortawesome/free-solid-svg-icons";

import { IconLookup } from "@fortawesome/fontawesome-common-types";

const Wrapper = styled.div`
  padding: 0;
`;

export interface ChartTypeSwitchPanelProps {
    chart: ChartInstance;
}

class ChartTypeSwitchPanel extends React.Component<ChartTypeSwitchPanelProps, any> {

    render() {

        const generateButton = (spec: {
            icon: IconLookup;
            type: ChartType;
            shouldEnable?: () => boolean;
        }) => {
            if (spec.shouldEnable && !spec.shouldEnable()) {
                return null;
            }

            return {
                icon: spec.icon.iconName,
                active: this.props.chart.getChartType() === spec.type,
                onClick: () => {this.props.chart.setChartType(spec.type);},
            };
        };

        return (
            <Wrapper>
                <TinyButtons>
                    {
                        [
                            {
                                icon: faChartLine,
                                type: ChartType.Line,
                            },
                            {
                                icon: faChartBar,
                                type: ChartType.Bar,
                            },
                            {
                                icon: faChartArea,
                                type: ChartType.Area,
                                shouldEnable: () => (this.props.chart.getChartOrientation() !== ChartOrientation.Horizontal),
                            },
                        ].map(generateButton)
                    }
                </TinyButtons>
            </Wrapper>

        );
    }
}

export default ChartTypeSwitchPanel;