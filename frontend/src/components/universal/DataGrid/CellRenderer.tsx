import * as React from "react";
import styled from "styled-components";

import { formatData, DataTargetOutput, FormatedDataPoint } from "components/DataProvider";
import { CellRenderProps } from "./index";

interface CellWrapperProps {
  fontSize?: string;
  theme: any;
  hovered: boolean;
  onMouseOut?: () => void;
  onMouseOver?: () => void;
}

const CellWrapper = styled.div<CellWrapperProps>`
  background: transparent;
  width: 100%;
  height: 100%;
  padding-left: 1vw;
  font-weight: ${(props: CellWrapperProps) => ((props.hovered) ? ("bold") :("normal"))};
  color: ${(props: CellWrapperProps) => props.theme.colors.accent};
  font-family: ${(props: CellWrapperProps) => props.theme.primaryFont};
`;

export type CellRendererProps = CellRenderProps;

class CellRenderer extends React.Component<CellRendererProps, undefined> {

    constructor(props) {
        super(props);

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter() {
        if (this.props.context.enableHoverMode) {
            this.props.context.onRowHovered(this.props.api, this.props.rowIndex, this.props.node);
        }
    }

    handleMouseLeave() {
        if (this.props.context.enableHoverMode) {
            this.props.context.onRowUnhovered(this.props.api, this.props.rowIndex, this.props.node);
        }
    }

    render() {

        const dataCol = this.props.context.data.columns.filter(col => (col.field || col.name) === this.props.colDef.field)[0];

        const formatedData: FormatedDataPoint = formatData(DataTargetOutput.Cell, { value: this.props.value }, this.props.context.data, {
            output: dataCol.field || dataCol.name,
        });

        return (
            <CellWrapper
                hovered={this.props.node.data.hovered}
                theme={this.props.context.theme}
            >
                {
                    (this.props.context.renderCell) ? (this.props.context.renderCell(this.props, formatedData)) :(formatedData.value)
                }
            </CellWrapper>
        );
    }
}

export default CellRenderer;