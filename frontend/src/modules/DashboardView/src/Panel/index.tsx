import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { ThemeProvider } from "styled-components";
import defaultTheme from "themes/default";

import { Box, Flex } from "@rebass/grid";

const CursorIcon = styled.div`
  margin-right: 0.3vw;
  display: inline-block;
`;

const GridWrapper = styled.div`
  height: 50vh;
  width: 100%;
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

export default class Panel extends React.Component<any, any> {

    render() {
        return (
            <this.props.app.UI.DataProvider
                data={DATA}
            >
                <Flex>
                    <Box p={2} width={4 / 5}>
                        <Flex flexDirection="column">
                            <Box px={2} width={1}>
                               <this.props.app.UI.Chart
                                    graphType={"line"}
                                    input={"x"}
                                    output={["z", "y"]}
                               >
                                   <this.props.app.UI.ChartTypeSwitchPanel />
                                   <this.props.app.UI.ChartDataOptionsPanel />
                               </this.props.app.UI.Chart>
                            </Box>
                            <Box px={2} width={1}>
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
                            </Box>
                        </Flex>
                    </Box>
                    <Box p={2} width={1 / 5}>
                         <Flex flexDirection="column">
                             <Box px={2} width={1}>
                                 <this.props.app.UI.TinyButtons info="This meter shows something and here we have a little description of what exactly it shows."/>
                                 <this.props.app.UI.Meter
                                     value={30}
                                     label="test"
                                     format={(value) => `\$ ${value}`}
                                     tooltipContent={<div>hello!</div>}
                                 />
                             </Box>
                             <Box px={2} width={1}>
                                 <this.props.app.UI.TinyButtons info="This meter shows something and here we have a little description of what exactly it shows."/>
                                 <this.props.app.UI.Meter
                                     value={30}
                                     label="test"
                                     format={(value) => `\$ ${value}`}
                                     tooltipContent={<div>hello!</div>}
                                 />
                             </Box>
                         </Flex>
                    </Box>
                </Flex>
            </this.props.app.UI.DataProvider>
        );
    }
}