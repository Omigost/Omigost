import * as React from "react";
import styled, { withTheme } from "styled-components";

import {
    applyDataFormaters,
    formatData,
    getInputColumn,
    getOutputColumns,
    withData,
    DataFormat,
    DataTarget,
    DataTargetInput,
    DataTargetOutput,
} from "components/DataProvider";

import {
    Area,
    AreaChart, Bar, BarChart,
    CartesianGrid, Legend, Line,
    LineChart,
    ReferenceLine, ResponsiveContainer,
    Tooltip, XAxis,
    YAxis,
} from "recharts";

import ChartTypeSwitchPanelComponent from "./ChartTypeSwitchPanel";
export const ChartTypeSwitchPanel = ChartTypeSwitchPanelComponent;

import ChartDataOptionsPanelComponent from "./ChartDataOptionsPanel";
export const ChartDataOptionsPanel = ChartDataOptionsPanelComponent;

const Wrapper = styled.div`
    padding: 0;
    width: 100%;
    height: 100%;
`;

export interface ChartModuleProps {
    chart: ChartInstance;
}

type DataFormatOptions = ChartProps & {
    graphType: string;
    rotate90: boolean;
};

type SeriesStylizer = (column: number, index: number) => {};

type ChartComponentType = AreaChart | LineChart | BarChart;

type ChartSeriesComponentType = Area | Bar | Line;

export enum ChartType {
    Line = "line",
    Bar = "bar",
    Area = "area",
}

export enum ChartOrientation {
    Vertical = "vertical",
    Horizontal = "horizontal",
}

export interface ChartProps {
    theme?: any;
    graphType: string;
    rotate90?: boolean;
    input?: any;
    output?: any;
    data: DataFormat;
    children?: Array<React.ReactElement<ChartModuleProps>> | React.ReactElement<ChartModuleProps>;
    tiny?: boolean;
    showAxes?: boolean;
    showGrid?: boolean;
    showLegend?: boolean;
    showTooltip?: boolean;
    showReferenceLines?: boolean;
    height?: any;
    width?: any;
}

export interface ChartInstance {
    setChartType(type: ChartType);
    getChartType(): ChartType;
    setChartOrientation(type: ChartOrientation);
    getChartOrientation(): ChartOrientation;
}

interface ChartState {
    lastGraphType: ChartType;
    graphType: ChartType;
    lastGraphOrientation: ChartOrientation;
    graphOrientation: ChartOrientation;
}

class Chart extends React.Component<ChartProps, ChartState> implements ChartInstance {

    state: ChartState = null;

    constructor(props) {
        super(props);

        this.state = {
            lastGraphType: ChartType.Line,
            graphType: ChartType.Line,
            lastGraphOrientation: ChartOrientation.Vertical,
            graphOrientation: ChartOrientation.Vertical,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (
            state.lastGraphType !== props.graphType
            || state.lastGraphOrientation !== props.graphOrientation
        ) {
            return {
                lastGraphType: props.graphType,
                graphType: props.graphType || ChartType.Line,
                lastGraphOrientation: props.graphOrientation,
                graphOrientation: props.graphOrientation || ChartOrientation.Vertical,
            };
        }
        return null;
    }

    setChartType(type: ChartType) {
        this.setState({
            graphType: type,
        });
    }

    getChartType(): ChartType {
        return this.state.graphType;
    }

    setChartOrientation(type: ChartOrientation) {
        if (this.state.graphType === "area") {
            this.setState({
                graphType: ChartType.Line,
                graphOrientation: type,
            });
        } else {
            this.setState({
                graphOrientation: type,
            });
        }
    }

    getChartOrientation(): ChartOrientation {
        return this.state.graphOrientation;
    }

    renderAxesComponents(dataFormatOptions: DataFormatOptions) {

        if ((this.props.tiny && !this.props.showAxes) || (this.props.showAxes === false)) {
            return null;
        }

        const inputColumn = getInputColumn(this.props.data, dataFormatOptions);

        const createFormatter = (dataTarget: DataTarget) => {
            return (value) => (formatData(dataTarget, { value }, this.props.data, dataFormatOptions).value);
        };

        if (dataFormatOptions.rotate90) {
            return [
                <XAxis
                  type="number"
                  key="chart-x-axis"
                  tickFormatter={createFormatter(DataTargetOutput.Axis)}
                />,
                <YAxis
                    type="category"
                    key="chart-y-axis"
                    dataKey={inputColumn}
                    tickFormatter={createFormatter(DataTargetInput.Axis)}
                />,
            ];
        }

        return [
            <XAxis
                key="chart-x-axis"
                dataKey={inputColumn}
                tickFormatter={createFormatter(DataTargetInput.Axis)}
            />,
            <YAxis
                key="chart-y-axis"
                tickFormatter={createFormatter(DataTargetOutput.Axis)}
            />,
        ];
    }

    renderReferenceLines(dataFormatOptions: DataFormatOptions) {
        if ((this.props.tiny && !this.props.showReferenceLines) || (this.props.showReferenceLines === false)) {
            return null;
        }

        const cursorValue = this.getCursorValue();

        const inputColumn = getInputColumn(this.props.data, dataFormatOptions);
        const outputColumns = getOutputColumns(this.props.data, dataFormatOptions);

        if (!cursorValue) {
            return [];
        }

        return [
            <ReferenceLine
                key="chart-main-reference-line"
                x={cursorValue[inputColumn]}
                stroke={"#000000"}
            />,
        ].concat(
            Object.keys(cursorValue).filter((key) => outputColumns.indexOf(key) > -1).map((key, index) => (
                <ReferenceLine
                   key={`chart-reference-line-${index}`}
                   y={cursorValue[key]}
                   stroke={"#000000"}
                />
            )),
        );
    }

    getCursorValue() {
        let cursorValue = null;
        const data = applyDataFormaters(this.props.data, this.props);

        this.props.data.rows.forEach((row, index) => {
            if (row.hovered) {
                cursorValue = data.rows[index];
            }
        });

        return cursorValue;
    }

    renderLegend() {
        return ((this.props.tiny && !this.props.showLegend) || (this.props.showLegend === false)) ? (null) :(<Legend />);
    }

    renderTooltip(dataFormatOptions: DataFormatOptions) {
        if ((this.props.tiny && !this.props.showTooltip) || (this.props.showTooltip === false)) {
            return null;
        }

        return (
            <Tooltip
                key="chart-tooltip"
                formatter={(value, name, props) => formatData(DataTargetOutput.Cursor, { value }, this.props.data, dataFormatOptions).value}
                labelFormatter={(value) => formatData(DataTargetInput.Cursor, { value }, this.props.data, dataFormatOptions).value}
            />
        );
    }

    renderGrid() {
        return ((this.props.tiny && !this.props.showGrid) || (this.props.showGrid === false)) ? (null) :(<CartesianGrid strokeDasharray="3 3"/>);
    }

    renderOutputColumns(getSeriesStyle: SeriesStylizer, dataFormatOptions: DataFormatOptions, SeriesComponent) {
        return getOutputColumns(this.props.data, dataFormatOptions).map((column, index) => {
            return (
                <SeriesComponent
                  {...getSeriesStyle(column, index)}
                  type="monotone"
                  dataKey={column}
                  key={`chart-series-${index}`}
                />
            );
        });
    }

    getChartComponent(dataFormatOptions: DataFormatOptions): ChartComponentType {
        switch (dataFormatOptions.graphType) {
            case ChartType.Area:
                return AreaChart;
            case ChartType.Bar:
                return BarChart;
            case ChartType.Line:
                return LineChart;
        }

        return LineChart;
    }

    getSeriesComponent(dataFormatOptions: DataFormatOptions): ChartSeriesComponentType {
        switch (dataFormatOptions.graphType) {
            case ChartType.Area:
                return Area;
            case ChartType.Bar:
                return Bar;
            case ChartType.Line:
                return Line;
        }

        return Line;
    }

    getSeriesStylizer(dataFormatOptions: DataFormatOptions): SeriesStylizer {
        const defaultStylizer: SeriesStylizer = (column, index) => ({
            activeDot: {r: 8},
            stroke: getGraphColor(index),
        });

        const getGraphColor = (index: number): string => {
            return [this.props.theme.colors.primary, this.props.theme.colors.secondary, ...this.props.theme.colors.palette][index % (2 + this.props.theme.colors.palette.length)];
        };

        switch (dataFormatOptions.graphType) {
            case ChartType.Area:
                return (column, index) => ({
                    stackId: "1",
                    activeDot: {r: 8},
                    stroke: getGraphColor(index),
                    fill: getGraphColor(index),
                });
            case ChartType.Bar:
                return (column, index) => ({
                    fill: getGraphColor(index),
                    barSize: 20,
                });
            case ChartType.Line:
                return (column, index) => ({
                    activeDot: {r: 8},
                    stroke: getGraphColor(index),
                });
        }

        return defaultStylizer;
    }

    render() {

        const data = applyDataFormaters(this.props.data, this.props);

        const dataFormatOptions: DataFormatOptions = {...this.props,
            graphType: this.state.graphType,
            rotate90: (this.state.graphOrientation === ChartOrientation.Horizontal)};

        if (this.props.rotate90 !== null && typeof this.props.rotate90 !== "undefined") {
            dataFormatOptions.rotate90 = this.props.rotate90;
        }

        const ChartComponent: ChartComponentType = this.getChartComponent(dataFormatOptions);
        const SeriesComponent: ChartSeriesComponentType = this.getSeriesComponent(dataFormatOptions);

        return (
            <Wrapper>
                {
                    React.Children.map(this.props.children || [], (child) =>
                        React.cloneElement(child as React.ReactElement<ChartModuleProps>, {
                            chart: this,
                        }),
                    )
                }
                <ResponsiveContainer height={this.props.height || 300} width={this.props.width || "90%"}>
                    <ChartComponent
                        data={data.rows}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        {
                            ...(dataFormatOptions.rotate90 ? {
                                layout: "vertical",
                            } :{})
                        }
                    >
                        {this.renderAxesComponents(dataFormatOptions)}
                        {this.renderGrid()}
                        {this.renderTooltip(dataFormatOptions)}
                        {this.renderLegend()}
                        {this.renderReferenceLines(dataFormatOptions)}
                        {this.renderOutputColumns(this.getSeriesStylizer(dataFormatOptions), dataFormatOptions, SeriesComponent)}
                    </ChartComponent>
                </ResponsiveContainer>
            </Wrapper>
        );
    }
}

export default withTheme(withData(Chart));