import * as React from "react";

import styled, { ThemeProvider } from "styled-components";
import defaultTheme from "themes/default";

import { withRouter } from "react-router-dom";

import {
    faDownload, faPlus, faTimes,
} from "@fortawesome/free-solid-svg-icons";

import * as Fuse from "fuse-js-latest";

import { Box, Flex } from "@rebass/grid";

const GridWrapper = styled.div`
  height: 90vh;
  width: 100%;
`;

const TooltipContent = styled.div`
  width: 12vw;
`;

const PanelHeader = styled.div`
  font-family: ${(props) => props.theme.primaryFont};
  font-size: ${(props => props.theme.fontSize[props.fontSize || "XXL"]};
  color: #727277;
  margin-left: 1vw;
  margin-top: 2vw;
`;

let DATA = {};

class MainView extends React.Component<any, any> {

    state: any;
    refresh: any;

    constructor(props) {
        super(props);

        this.state = {
            showBudgetNewDialog: false,
        };

        this.refresh = null;
    }

    componentDidMount() {
        DATA = {
            columns: [
                {
                    name: "Budget Name",
                    field: "name",
                    type: "string",
                    formatOutputCell: (p) => (
                        <ThemeProvider theme={defaultTheme}>
                            <div>
                                <div style={{ display: "inline-block" }}>
                                    <this.props.app.UI.TinyButtons>
                                        {
                                            [
                                                {
                                                    icon: faTimes.iconName,
                                                    popover: (
                                                        <this.props.app.client.component mutation>
                                                            {({data, error, loading}, post) => {
                                                                return (
                                                                    <this.props.app.UI.Form
                                                                        submitButton="Remove"
                                                                        onSubmit={(data) => {
                                                                            post(client => client.deleteBudget({
                                                                                name: p,
                                                                            })).then(() => {
                                                                                if (this.refresh) this.refresh();
                                                                                this.forceUpdate();
                                                                            });
                                                                        }}
                                                                    >
                                                                        {{
                                                                            title: "A registration form",
                                                                            description: "The description",
                                                                            type: "object",
                                                                            properties: {
                                                                                "notice": {
                                                                                    type: "string",
                                                                                    ui: "notice",
                                                                                    value: `Remove budget ${p}?`,
                                                                                },
                                                                            },
                                                                        }}
                                                                    </this.props.app.UI.Form>
                                                                );
                                                            }}
                                                        </this.props.app.client.component>
                                                    ),
                                                },
                                            ]
                                        }
                                    </this.props.app.UI.TinyButtons>
                                </div>
                                <div style={{ display: "inline-block" }}>
                                    {p}
                                </div>
                            </div>
                        </ThemeProvider>
                    ),
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
                    generator: (column, row) => {
                        if (row.current === null || row.budgeted === null) return null;
                        return row.current / row.budgeted * 100;
                    },
                },
                {
                    name: "Current vs Forecasted",
                    type: "ui-line",
                    generator: (column, row) => row.current / row.forecasted * 100,
                },
            ],
            rows: [],
        };
    }

    render() {
        return (
            <this.props.app.client.component
                request={(client) => client.getBudgets()}
            >
                {({data, error, loading}, refresh) => {
                    if (loading || !data) return null;

                    this.refresh = refresh;

                    return (
                        <this.props.app.UI.DataProvider
                            data={{
                                ...DATA,
                                rows: data.map(budget => {
                                    return {
                                        name: budget.budgetName,
                                        budgeted: budget.budgetLimit.amount,
                                        current: (budget.calculatedSpend && budget.calculatedSpend.actualSpend) ? (budget.calculatedSpend.actualSpend.amount) : (null),
                                        forecasted: (budget.calculatedSpend && budget.calculatedSpend.forecastedSpend) ? (budget.calculatedSpend.forecastedSpend.amount) : (null),
                                    };
                                }),
                            }}
                        >

                            <PanelHeader>
                                Your budgets
                            </PanelHeader>

                            <Flex>
                                <Box p={2} width={1}>
                                    <Flex flexDirection="column">
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
                                                                          this.props.history.push(`${this.props.match.url}/budgets/add`);
                                                                        },
                                                                    },
                                                                    {
                                                                        icon: faDownload.iconName,
                                                                        text: "Export CSV",
                                                                        onClick: () => doExport({
                                                                            format: "csv",
                                                                        }),
                                                                    },
                                                                ]
                                                            }
                                                        </this.props.app.UI.TinyButtons>
                                                    );
                                                }
                                            }
                                        </this.props.app.UI.ExportXLSX>
                                        <GridWrapper>
                                            <Box p={2} width={1 / 5}>
                                                <Flex>
                                                    <this.props.app.UI.DataFilter>
                                                        {
                                                            (updateFilter) => {
                                                                return (
                                                                    <this.props.app.UI.TextInput
                                                                        label="Search budgets"
                                                                        onChange={(value) => {
                                                                            updateFilter((data) => {

                                                                                if (value.length === 0) return data;

                                                                                const options = {
                                                                                  shouldSort: true,
                                                                                  threshold: 0.6,
                                                                                  location: 0,
                                                                                  distance: 100,
                                                                                  maxPatternLength: 32,
                                                                                  minMatchCharLength: 1,
                                                                                  keys: [
                                                                                    "name",
                                                                                  ],
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
                                                                                rows: [props.data],
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

export default withRouter(MainView);