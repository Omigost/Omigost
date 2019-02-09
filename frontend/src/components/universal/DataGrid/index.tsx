import * as React from 'react';
import styled, { withTheme } from 'styled-components';

import { AgGridReact } from 'ag-grid-react';
import { RowNode, ColDef, ColumnApi, Column, GridApi } from 'ag-grid-community';

import { RowSpecs, DataFormat, withData } from 'components/DataProvider';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import FilterRenderer from './FilterRenderer';
import CellRenderer from './CellRenderer';

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
};

export interface DataGridProps {
    theme: any;
    data: DataFormat;
    onDataChanged?: (data: DataFormat) => void;
    renderCell?: (props: CellRenderProps) => React.ReactElement<any>;
};

export interface DataGridContext {
    theme: any;
    enableHoverMode: boolean;
    onRowHovered: (api: GridApi, rowIndex: number, row: RowNode) => void;
    onRowUnhovered: (api: GridApi, rowIndex: number, row: RowNode) => void;
    renderCell?: (props: CellRenderProps) => React.ReactElement<any>;
};

export interface AgGridDataFormat {
    columnDefs: any;
    rowData: any;
};

class DataGrid extends React.Component<DataGridProps, undefined> {
    
    constructor(props) {
        super(props);
        
        this.handleRowHovered = this.handleRowHovered.bind(this);
        this.handleRowUnhovered = this.handleRowUnhovered.bind(this);
    }
    
    handleRowUnhovered(api: GridApi, rowIndex: number, row: RowNode) {
        if (this.props.onDataChanged) {
            this.props.onDataChanged(
                Object.assign({}, this.props.data, {
                    rows: this.props.data.rows.map((row: RowSpecs, index: number) => {
                        if (index != rowIndex) return row;
                        return Object.assign({}, row, {
                            hovered: false
                        });
                    })
                })
            );
        }
    }
    
    handleRowHovered(api: GridApi, rowIndex: number, row: RowNode) {
        console.log("@handleRowHovered "+rowIndex);
        if (this.props.onDataChanged) {
            this.props.onDataChanged(
                Object.assign({}, this.props.data, {
                    rows: this.props.data.rows.map((row: RowSpecs, index: number) => {
                        return Object.assign({}, row, {
                            hovered: (index == rowIndex)
                        });
                    })
                })
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
                    cellRendererFramework: CellRenderer
                };
            }),
            rowData: data.rows.map((row: RowSpecs, index: number): any => {
                // TODO: Remove or change this id-mapping
                return row;
            })
        };
    }
    
    render() {
        const gridContext: DataGridContext = {
            theme: this.props.theme,
            enableHoverMode: true,
            onRowHovered: this.handleRowHovered,
            onRowUnhovered: this.handleRowUnhovered,
            renderCell: this.props.renderCell
        };
        
        const { columnDefs, rowData } = this.extractAgGridDataFormat(this.props.data);
        
        return (
            <Wrapper
                className='ag-theme-balham'
            >
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    enableFilter
                    context={gridContext}
                />
            </Wrapper>
        );
    }
}

export default withTheme(withData(DataGrid));