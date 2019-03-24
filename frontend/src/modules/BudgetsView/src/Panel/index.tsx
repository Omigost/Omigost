import * as React from "react";

import styled, { ThemeProvider } from "styled-components";
import defaultTheme from "themes/default";

import * as Fuse from "fuse-js-latest";

import { Box, Flex } from "@rebass/grid";

const GridWrapper = styled.div`
  height: 50vh;
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
  rows: [
    {
      name: "Project Nemo Cost Budget",
      current: 44,
      budgeted: 50,
      forecasted: 70,
    },
    {
      name: "Eastern US Regional Budget",
      current: 17050,
      budgeted: 19412,
      forecasted: 23110,
    },
    {
      name: "Total Monthly Managing Budget",
      current: 4210,
      budgeted: 5210,
      forecasted: 6810,
    },
    {
      name: "CEO lamborgini Weekly Budget",
      current: 29123,
      budgeted: 50123,
      forecasted: 32150,
    },
    {
      name: "S3 Usage Budget",
      current: 2102,
      budgeted: 8312,
      forecasted: 5012,
    },
    {
      name: "DevOps Team Budget",
      current: 6123,
      budgeted: 12302,
      forecasted: 7012,
    },
  ],
};

export default class Panel extends React.Component<any, any> {

  render() {
    return (
      <this.props.app.UI.DataProvider
          data={DATA}
      >
        <Flex>
          <Box p={2} width={1}>
            <Flex flexDirection="column">
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
                                if (value.length === 0) { return data; }

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
                                    rows: DATA.rows.filter(row => row.name === props.data.name),
                                }}
                                graphType={"bar"}
                                input={"name"}
                                output={["current", "budgeted", "forecasted"]}
                                tiny
                                showLegend
                                height={220}
                              />
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
  }
}
