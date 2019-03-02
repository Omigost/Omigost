import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { ThemeProvider } from "styled-components";
import defaultTheme from "themes/default";

const CursorIcon = styled.div`
  margin-right: 0.3vw;
  display: inline-block;
`;

const Wrapper = styled.div`
  padding-left: 5vw;
`;

const TitleWrapper = styled.div`
  margin-top: 1vw;
`;

const ChartWrapper = styled.div`
  margin-top: 3vw;
  width: 80vw;
  height: 25vw;
`;

const Table = styled.table`
  width: 90%;
`;

const GridWrapper = styled.td`
  padding-top: 2vw;
  height: 70vw;
`;

const MeterWrapper = styled.div`
  display: inline-block;
`;

const TooltipContent = styled.div`
  width: 10vw;
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
            generator: (column, row) => (5-row.p)*(8-row.p)*0.3 + 0.8*row.y,
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

export default class Panel extends React.Component<any, any> {

    render() {
        return (
            <this.props.app.UI.DataProvider
                data={DATA}
            >
                <Wrapper>
                    <TitleWrapper>
                        Hello!
                    </TitleWrapper>
                    <Table>
                        <tbody>
                            <tr>
                                <td>
                                    <MeterWrapper>
                                        <this.props.app.UI.TinyButtons info="This meter shows something and here we have a little description of what exactly it shows."/>
                                        <this.props.app.UI.Meter
                                            value={30}
                                            label="test"
                                            format={(value) => `\$ ${value}`}
                                            tooltipContent={<div>hello!</div>}
                                        />
                                    </MeterWrapper>
                                    <MeterWrapper>
                                        <this.props.app.UI.TinyButtons info="This meter shows something and here we have a little description of what exactly it shows."/>
                                        <this.props.app.UI.Meter
                                            value={30}
                                            label="test"
                                            format={(value) => `\$ ${value}`}
                                            tooltipContent={<div>hello!</div>}
                                        />
                                    </MeterWrapper>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <ChartWrapper>
                                       <this.props.app.UI.Chart
                                            graphType={"line"}
                                            input={"x"}
                                            output={["z", "y"]}
                                       >
                                           <this.props.app.UI.ChartTypeSwitchPanel />
                                           <this.props.app.UI.ChartDataOptionsPanel />
                                       </this.props.app.UI.Chart>
                                    </ChartWrapper>
                                </td>
                            </tr>
                            <tr>
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
                            </tr>
                        </tbody>
                    </Table>
                </Wrapper>
            </this.props.app.UI.DataProvider>
        );
    }
}