import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { ThemeProvider } from "styled-components";
import defaultTheme from "themes/default";

import {
    faWrench, faHistory,
} from "@fortawesome/free-solid-svg-icons";

import { Box, Flex } from "@rebass/grid";

const CursorIcon = styled.div`
    margin-right: 0.3vw;
    display: inline-block;
`;

const GridWrapper = styled.div`
    height: 92%;
    width: 100%;
    position: relative;
    top: -1vw;
`;

const TooltipContent = styled.div`
    width: 10vw;
`;

const HeaderOptions = styled.div`
    display: inline-block;
    font-size: 1vw;
`;

const DATA = {
    columns: [
        {
            name: "x",
            type: "date",
            parseFormat: "YYYY-MM-DD HH:mm",
            cursorFormat: "YYYY-MM-DD HH:mm",
            axisFormat: "HH:mm",
            cursorPrefix: (<CursorIcon><FontAwesomeIcon icon="clock" /></CursorIcon>),
        },
        {
            name: "y",
            type: "number",
            prefix: "$ ",
            cursorPrefix: (<CursorIcon><FontAwesomeIcon icon="dollar-sign" /></CursorIcon>),
        },
        {
            name: "z",
            type: "number",
            prefix: "z = ",
            generator: (column, row) => (5 - row.p) * (8 - row.p) * 0.3 + 0.8 * row.y,
        },
        {
            name: "p",
            type: "number",
            prefix: "p = ",
        },
    ],
    rows: [
        {x: "2018-12-10 12:30", p: 1, y: 10},
        {x: "2018-12-10 13:30", p: 2, y: 15},
        {x: "2018-12-10 14:30", p: 3, y: 20},
        {x: "2018-12-10 15:30", p: 4, y: 15},
        {x: "2018-12-10 16:30", p: 5, y: 15},
        {x: "2018-12-10 17:30", p: 6, y: 10},
        {x: "2018-12-10 18:30", p: 7, y: 11},
        {x: "2018-12-10 19:30", p: 8, y: 11},
        {x: "2018-12-10 20:30", p: 9, y: 4},
        {x: "2018-12-10 21:30", p: 10, y: 6},
        {x: "2018-12-10 22:30", p: 11, y: 8},
        {x: "2018-12-10 23:30", p: 12, y: 5},
    ],
};

const PanelHeader = styled.div`
  font-family: ${(props) => props.theme.primaryFont};
  font-size: ${(props => props.theme.fontSize[props.fontSize || "XXL"]};
  color: #727277;
  margin-left: 2vw;
  margin-top: 2vw;
`;

interface PanelState {
    draggableMode: boolean;
    layout: any;
}

export default class Panel extends React.Component<any, PanelState> {

    state: PanelState;

    constructor(props) {
        super(props);
        
        this.state = {
            draggableMode: false,
            layout: this.props.settings.layout,
        };
    }

    render() {
        return (
            <this.props.app.UI.FloatingActionConsumer>
                {({ showAction, cancelAction }) => {
                    return (
                        <this.props.app.UI.DataProvider
                            data={DATA}
                        >
                            <PanelHeader>
                                Budgets dashboard
                                <HeaderOptions>
                                    <this.props.app.UI.TinyButtons>
                                        {[
                                            {
                                                icon: faWrench.iconName,
                                                tooltip: "Customize layout",
                                                tooltipClickTrigger: false,
                                                onClick: () => {
                                                    this.setState({
                                                        draggableMode: !this.state.draggableMode,
                                                    });
                                                },
                                            },
                                            {
                                                icon: faHistory.iconName,
                                                tooltip: "Reset layout",
                                                tooltipClickTrigger: false,
                                                onClick: () => {
                                                    this.props.app.module.resetSettings();
                                                },
                                            },
                                        ]}
                                    </this.props.app.UI.TinyButtons>
                                </HeaderOptions>
                            </PanelHeader>

                            <this.props.app.UI.InteractiveGrid2
                                enableActionDrag={this.state.draggableMode}
                                enableActionRemove={this.state.draggableMode}
                                enableActionResize={this.state.draggableMode}
                                layout={this.state.layout}
                                onLayoutChange={(layout) => {
                                    showAction({
                                        title: "Save the layout",
                                        description: "Current layout was not saved click here to save it.",
                                        options: [
                                            {
                                                icon: faWrench.iconName,
                                                description: "Save the layout",
                                                onClick: () => {
                                                    this.props.app.module.setSettings({
                                                        layout: this.state.layout,
                                                    });
                                                    cancelAction();
                                                },
                                            },
                                        ],
                                    });
                                    this.setState({
                                        layout,
                                    });
                                }}
                                items={[
                                    {
                                        name: "chart",
                                        initialOptions: {},
                                        content: (options) => (
                                            <this.props.app.UI.Chart
                                                graphType={"line"}
                                                input={"x"}
                                                output={["z", "y"]}
                                            >
                                                <this.props.app.UI.ChartTypeSwitchPanel />
                                                <this.props.app.UI.ChartDataOptionsPanel />
                                            </this.props.app.UI.Chart>
                                        ),
                                        width: 7,
                                        height: 9,
                                    },
                                    {
                                        name: "grid",
                                        initialOptions: {},
                                        content: (options) => (
                                            <GridWrapper>
                                                <this.props.app.UI.DataGrid
                                                    renderCell={(props) => {
                                                        const columns = props.columnApi.getColumnState();
                                                        const rightmostColumn = columns[columns.length - 1];
                                                        if (props.column.colId !== rightmostColumn.colId) {
                                                            return props.value;
                                                        }
                                                        return (
                                                            <this.props.app.UI.Tooltip
                                                                show={props.node.data.hovered}
                                                                content={
                                                                    <ThemeProvider theme={defaultTheme}>
                                                                        <TooltipContent>
                                                                            Hello!
                                                                            <this.props.app.UI.Chart
                                                                                data={{...DATA,
                                                                                    rows: DATA.rows.filter(row => row.x === props.data.x)}}
                                                                                graphType={"bar"}
                                                                                input={"x"}
                                                                                output={["z", "y"]}
                                                                                tiny
                                                                                showLegend
                                                                                height={150}
                                                                            >
                                                                            </this.props.app.UI.Chart>
                                                                        </TooltipContent>
                                                                    </ThemeProvider>
                                                                }
                                                                theme={defaultTheme}
                                                            >
                                                                <div>
                                                                    {props.value}
                                                                </div>
                                                            </this.props.app.UI.Tooltip>
                                                        );
                                                    }}
                                                />
                                            </GridWrapper>
                                        ),
                                        width: 6,
                                        height: 7,
                                    },
                                    {
                                        name: "meter",
                                        initialOptions: {
                                            title: "Test!",
                                        },
                                        content: (options, setOptions) => (
                                            <div>
                                                <button onClick={() => setOptions({ title: "Woops" })}>
                                                    Set title to "Woops"
                                                </button>
                                                <this.props.app.UI.TinyButtons info="This meter shows something and here we have a little description of what exactly it shows."/>
                                                <this.props.app.UI.Meter
                                                    value={30}
                                                    label={options.title}
                                                    format={(value) => `\$ ${value}`}
                                                    tooltipContent={<div>{options.title}</div>}
                                                />
                                            </div>
                                        ),
                                        width: 2,
                                        height: 6,
                                    },
                                ]}
                            />

                        </this.props.app.UI.DataProvider>
                    );
                }}
            </this.props.app.UI.FloatingActionConsumer>
        );
    }
}