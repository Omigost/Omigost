import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { text, boolean, object, number } from "@storybook/addon-knobs";

import Chart from "./index";
import ChartTypeSwitchPanel from "./ChartTypeSwitchPanel";
import ChartDataOptionsPanel from "./ChartDataOptionsPanel";

storiesOf("Chart", module)
    .addWithJSX("area chart", () => {
        return (
            <Chart
                graphType="area"
                input="x"
                output="y"
                data={object("Data", {
                    columns: [
                        {
                            name: "x",
                            type: "number",
                        },
                        {
                            name: "y",
                            type: "number",
                        },
                    ],
                    rows: [
                        {x:1, y:2},
                        {x:2, y:5},
                        {x:3, y:9},
                        {x:4, y:4},
                        {x:5, y:8},
                    ],
                })}
            />
        );
    })
    .addWithJSX("line chart with multiple plots", () => {
        return (
            <Chart
                graphType="line"
                input="x"
                output={["y", "z"]}
                data={object("Data", {
                    columns: [
                        {
                            name: "x",
                            type: "number",
                        },
                        {
                            name: "y",
                            type: "number",
                        },
                        {
                            name: "z",
                            type: "number",
                        },
                    ],
                    rows: [
                        {x:1, y:2, z:5},
                        {x:2, y:5, z:7},
                        {x:3, y:9, z:1},
                        {x:4, y:4, z:4},
                        {x:5, y:8, z:9},
                    ],
                })}
            />
        );
    })
    .addWithJSX("bar chart", () => {
        return (
            <Chart
                graphType="bar"
                input="x"
                output={["y", "z"]}
                data={object("Data", {
                    columns: [
                        {
                            name: "x",
                            type: "string",
                        },
                        {
                            name: "y",
                            type: "number",
                        },
                        {
                            name: "z",
                            type: "number",
                        },
                    ],
                    rows: [
                        {x:"Item 1", y:2, z:5},
                        {x:"Item 2", y:5, z:7},
                        {x:"Item 3", y:9, z:1},
                        {x:"Item 4", y:4, z:4},
                        {x:"Item 5", y:8, z:9},
                    ],
                })}
            />
        );
    })
    .addWithJSX("advanced rendering options", () => {
        return (
            <Chart
                graphType={text("GraphType", "line")}
                input="x"
                output={["y", "z"]}
                rotate90={boolean("Rotate90?", false)}
                showAxes={boolean("ShowAxes?", false)}
                showGrid={boolean("ShowGrid?", false)}
                showLegend={boolean("ShowLegend?", false)}
                showTooltip={boolean("ShowTooltip?", false)}
                showReferenceLines={boolean("showReferenceLines?", false)}
                data={object("Data", {
                    columns: [
                        {
                            name: "x",
                            type: "string",
                        },
                        {
                            name: "y",
                            type: "number",
                        },
                        {
                            name: "z",
                            type: "number",
                        },
                    ],
                    rows: [
                        {x:"Item 1", y:2, z:5},
                        {x:"Item 2", y:5, z:7},
                        {x:"Item 3", y:9, z:1},
                        {x:"Item 4", y:4, z:4},
                        {x:"Item 5", y:8, z:9},
                    ],
                })}
            />
        );
    })
    .addWithJSX("with chart type switch panel", () => {
        return (
            <Chart
                graphType={text("GraphType", "line")}
                input="x"
                output={["y", "z"]}
                data={object("Data", {
                    columns: [
                        {
                            name: "x",
                            type: "string",
                        },
                        {
                            name: "y",
                            type: "number",
                        },
                        {
                            name: "z",
                            type: "number",
                        },
                    ],
                    rows: [
                        {x:"Item 1", y:2, z:5},
                        {x:"Item 2", y:5, z:7},
                        {x:"Item 3", y:9, z:1},
                        {x:"Item 4", y:4, z:4},
                        {x:"Item 5", y:8, z:9},
                    ],
                })}
            >
                <ChartTypeSwitchPanel />
            </Chart>
        );
    })
    .addWithJSX("with data options panel", () => {
        return (
            <Chart
                graphType={text("GraphType", "line")}
                input="x"
                output={["y", "z"]}
                data={object("Data", {
                    columns: [
                        {
                            name: "x",
                            type: "string",
                        },
                        {
                            name: "y",
                            type: "number",
                        },
                        {
                            name: "z",
                            type: "number",
                        },
                    ],
                    rows: [
                        {x:"Item 1", y:2, z:5},
                        {x:"Item 2", y:5, z:7},
                        {x:"Item 3", y:9, z:1},
                        {x:"Item 4", y:4, z:4},
                        {x:"Item 5", y:8, z:9},
                    ],
                })}
            >
                <ChartTypeSwitchPanel />
                <ChartDataOptionsPanel />
            </Chart>
        );
    });