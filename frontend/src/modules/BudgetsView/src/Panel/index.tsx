import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { ThemeProvider } from "styled-components";
import defaultTheme from "themes/default";

import {
    faPlus, faDownload,
} from "@fortawesome/free-solid-svg-icons";

import * as Fuse from 'fuse-js-latest';

import { Flex, Box } from '@rebass/grid';

const CursorIcon = styled.div`
  margin-right: 0.3vw;
  display: inline-block;
`;

const GridWrapper = styled.div`
  height: 90vh;
  width: 100%;
`;

const TooltipContent = styled.div`
  width: 12vw;
`;

const DATA = {
    columns: [
        {
            name: "Budget Name",
            field: "name",
            type: "string",
        },
        {
            name: "Current",
            field: "current",
            type: "number",
            formatOutputCell: "currency",
        },
        {
            name: "Budgeted",
            field: "budgeted",
            type: "number",
            formatOutputCell: "currency",
        },
        {
            name: "Forecasted",
            field: "forecasted",
            type: "number",
            formatOutputCell: "currency",
        },
        {
            name: "Current vs Budgeted",
            type: "ui-line",
            generator: (column, row) => row.current / row.budgeted * 100,
        },
        {
            name: "Current vs Forecasted",
            type: "ui-line",
            generator: (column, row) => row.current / row.forecasted * 100,
        },
    ],
    rows: [],
};

export default class Panel extends React.Component<any, any> {

    state: any;

    constructor(props) {
        super(props);
        
        this.state = {
            showBudgetNewDialog: false,
        };
    }

    render() {
        return (
            <this.props.app.client.component
                request={(client) => client.getBudgets()}
            >
                {({data, error, loading}, refresh) => {
                    if (loading || !data) return null;
                    
                    return (
                        <this.props.app.UI.DataProvider
                            data={{
                                ...DATA,
                                rows: data.map(budget => {
                                    return {
                                        name: budget.budgetName,
                                        budgeted: budget.budgetLimit.amount,
                                        current: budget.calculatedSpend.actualSpend.amount,
                                        forecasted: budget.calculatedSpend.forecastedSpend.amount,
                                    };
                                })
                            }}
                        >
                            <Flex>
                                <Box p={2} width={1}>
                                    <Flex flexDirection='column'>
                                        <this.props.app.UI.ExportXLSX>
                                            {
                                                (doExport) => {
                                                    return (
                                                         <this.props.app.UI.TinyButtons>
                                                            {
                                                                [
                                                                    {
                                                                        icon: faPlus.iconName,
                                                                        text: "Add budget",
                                                                        onClick: () => {
                                                                            this.setState({ showBudgetNewDialog: true });
                                                                        },
                                                                    },
                                                                    {
                                                                        icon: faDownload.iconName,
                                                                        text: "Export CSV",
                                                                        onClick: () => doExport({
                                                                            format: 'csv'
                                                                        }),
                                                                    },
                                                                ]
                                                            }
                                                        </this.props.app.UI.TinyButtons>
                                                    );
                                                }
                                            }
                                        </this.props.app.UI.ExportXLSX>
                                        <this.props.app.UI.FloatingWindow open={this.state.showBudgetNewDialog}>
                                            <div style={{ padding: '2vw' }}>
                                                <this.props.app.UI.Form
                                                    onSubmit={(data) => {
                                                        console.log(data);
                                                    }}
                                                >
                                                    {{
                                                        title: "A registration form",
                                                        description: "The description",
                                                        type: "object",
                                                        properties: {
                                                            "limit": {
                                                                type: "string",
                                                                title: "The budget limit",
                                                                minLength: 1,
                                                            },
                                                        },
                                                    }}
                                                </this.props.app.UI.Form>
                                            </div>
                                        </this.props.app.UI.FloatingWindow>
                                        <GridWrapper>
                                            <Box p={2} width={1/5}>
                                                <Flex>
                                                    <this.props.app.UI.DataFilter>
                                                        {
                                                            (updateFilter) => {
                                                                return (
                                                                    <this.props.app.UI.TextInput
                                                                        label='Search budgets'
                                                                        onChange={(value) => {
                                                                            updateFilter((data) => {
                                                                                
                                                                                if (value.length == 0) return data;
                                                                                
                                                                                const options = {
                                                                                  shouldSort: true,
                                                                                  threshold: 0.6,
                                                                                  location: 0,
                                                                                  distance: 100,
                                                                                  maxPatternLength: 32,
                                                                                  minMatchCharLength: 1,
                                                                                  keys: [
                                                                                    "name",
                                                                                  ]
                                                                                };
                                                                                const fuse = new Fuse(data.rows, options); // "list" is the item array
                                                                                const result = fuse.search(value);
                                                                                
                                                                                return {
                                                                                    ...data,
                                                                                    rows: result,
                                                                                };
                                                                            });
                                                                        }}
                                                                    />
                                                                );
                                                            }
                                                        }
                                                    </this.props.app.UI.DataFilter>
                                                </Flex>
                                            </Box>
                                            <this.props.app.UI.DataGrid
                                                renderCell={(props, formattedData) => {
                                                    const columns = props.columnApi.getColumnState();
                                                    const rightmostColumn = columns[columns.length - 1];
                                                    if (props.column.colId !== rightmostColumn.colId) {
                                                        return formattedData.value;
                                                    }
                                                    
                                                    return (
                                                        <this.props.app.UI.Tooltip
                                                            show={props.node.data.hovered}
                                                            content={
                                                                <ThemeProvider theme={defaultTheme}>
                                                                    <TooltipContent>
                                                                        <this.props.app.UI.Chart
                                                                            data={{
                                                                                ...DATA,
                                                                                rows: [props.data]
                                                                            }}
                                                                            graphType={"bar"}
                                                                            input={"name"}
                                                                            output={["current", "budgeted", "forecasted"]}
                                                                            tiny
                                                                            showLegend
                                                                            height={220}
                                                                        >
                                                                        </this.props.app.UI.Chart>
                                                                    </TooltipContent>
                                                                </ThemeProvider>
                                                            }
                                                            theme={defaultTheme}
                                                        >
                                                            <div>
                                                                {formattedData.value}
                                                            </div>
                                                        </this.props.app.UI.Tooltip>
                                                    );
                                                }}
                                            />
                                        </GridWrapper>
                                    </Flex>
                                </Box>
                            </Flex>
                        </this.props.app.UI.DataProvider>
                    );
                }}
            </this.props.app.client.component>
        );
    }
}