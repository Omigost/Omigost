import * as React from "react";
import styled, { withTheme } from "styled-components";

import { Column, ColumnApi, ColDef, GridApi, RowNode } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { resolveData, withData, DataFormat, FormatedDataPoint, RowSpecs } from "components/DataProvider";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./index.scss";

import CellRenderer from "./CellRenderer";
import FilterRenderer from "./FilterRenderer";

const Wrapper = styled.div`
  padding: 1.2vw;
  width: 100%;
  height: 100%;

  &.ag-theme-balham {
    background-color: transparent;
  }

  & div.ag-theme-balham.ag-row {
    background-color: transparent;
  }

  & div.ag-cell {
    padding: 0;
    border: none;
  }
`;

export interface CellRenderProps {
    value: any; // value to be rendered
    valueFormatted: any; // value to be rendered formatted
    getValue: () => any; // convenience function to get most recent up to date value
    setValue: (value: any) => void; // convenience to set the value
    formatValue: (value: any) => any; // convenience to format a value using the columns formatter
    data: any; // the rows data
    node: RowNode; // row rows row node
    colDef: ColDef; // the cells column definition
    column: Column; // the cells column
    rowIndex: number; // the current index of the row (this changes after filter and sort)
    api: GridApi; // the grid API
    eGridCell: HTMLElement; // the grid's cell; a DOM div element
    eParentOfValue: HTMLElement; // the parent DOM item for the cell renderer; same as eGridCell unless using checkbox selection
    columnApi: ColumnApi; // grid column API
    context: DataGridContext; // the grid's context
    refreshCell: () => void; // convenience function to refresh the cell
}

export interface DataGridProps {
    theme: any;
    data: DataFormat;
    onDataChanged?: (data: DataFormat) => void;
    renderCell?: (props: CellRenderProps) => React.ReactElement<any>;
}

export interface DataGridContext {
    theme: any;
    data: DataFormat;
    enableHoverMode: boolean;
    onRowHovered: (api: GridApi, rowIndex: number, row: RowNode) => void;
    onRowUnhovered: (api: GridApi, rowIndex: number, row: RowNode) => void;
    renderCell?: (props: CellRenderProps, formattedValue: FormatedDataPoint) => React.ReactElement<any>;
}

export interface AgGridDataFormat {
    columnDefs: any;
    rowData: any;
}

class DataGrid extends React.Component<DataGridProps, undefined> {

    constructor(props) {
        super(props);

        this.handleRowHovered = this.handleRowHovered.bind(this);
        this.handleRowUnhovered = this.handleRowUnhovered.bind(this);
        this.getDataWithRowsHoveredMarker = this.getDataWithRowsHoveredMarker.bind(this);
    }

    getDataWithRowsHoveredMarker(mapper: (row: RowSpecs, index: number, isHovered: boolean) => boolean) {
        return {
            ...this.props.data,
            rows: this.props.data.rows.map((row: RowSpecs, index: number) => {
                return {
                    ...row,
                    hovered: mapper(row, index, row.hovered),
                };
            }),
        };
    }

    handleRowUnhovered(api: GridApi, visualRowIndex: number, row: RowNode) {
        const rowIndex = parseInt(row.id);
        if (this.props.onDataChanged) {
            this.props.onDataChanged(
                this.getDataWithRowsHoveredMarker((row, index, isHovered) => {
                    if (index !== rowIndex) {
                        return isHovered;
                    }

                    return false;
                }),
            );
        }
    }

    handleRowHovered(api: GridApi, visualRowIndex: number, row: RowNode) {
        const rowIndex = parseInt(row.id);
        if (this.props.onDataChanged) {
            this.props.onDataChanged(
                this.getDataWithRowsHoveredMarker((row, index, isHovered) => (index === rowIndex)),
            );
        }
    }

    extractAgGridDataFormat(data: DataFormat): AgGridDataFormat {
        return {
            columnDefs: data.columns.map((column) => {
                return {
                    headerName: column.name,
                    field: column.field || column.name,
                    filterFramework: FilterRenderer,
                    cellRendererFramework: CellRenderer,
                };
            }),
            rowData: data.rows.map((row: RowSpecs, index: number): any => {
                // TODO: Remove or change this id-mapping
                return row;
            }),
        };
    }

    render() {
        const gridContext: DataGridContext = {
            theme: this.props.theme,
            enableHoverMode: true,
            onRowHovered: this.handleRowHovered,
            onRowUnhovered: this.handleRowUnhovered,
            renderCell: this.props.renderCell,
            data: this.props.data,
        };

        const { columnDefs, rowData } = this.extractAgGridDataFormat(resolveData(this.props.data));

        return (
            <Wrapper
                className="ag-theme-balham"
            >
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    enableFilter
                    enableSorting
                    context={gridContext}
                />
            </Wrapper>
        );
    }
}

export default withTheme(withData(DataGrid));