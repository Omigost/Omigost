import * as React from 'react';
import styled, { withTheme } from 'styled-components';

import * as moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    RowSpecs,
    DataFormat,
    withData,
    applyDataFormaters,
    getInputColumn,
    getOutputColumns,
    formatData
} from 'components/DataProvider';

import {
    LineChart,
    Line, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend,
    ResponsiveContainer,
    AreaChart, Area,
    BarChart, Bar,
    ReferenceLine
} from 'recharts';

import ChartTypeSwitchPanelComponent from './ChartTypeSwitchPanel';
export const ChartTypeSwitchPanel = ChartTypeSwitchPanelComponent;

import ChartDataOptionsPanelComponent from './ChartDataOptionsPanel';
export const ChartDataOptionsPanel = ChartDataOptionsPanelComponent;

const Wrapper = styled.div`
    padding: 0;
    width: 100%;
    height: 100%;
`;

const ChartWrapper = styled.div`
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
    & > div {
      position: absolute !important;
      top: 0;  
    }
`;

export interface ChartModuleProps {
    chart: ChartInstance;
};

type DataFormatOptions = ChartProps & {
    graphType: string;
    rotate90: boolean;
};

type SeriesStylizer = (column: number, index: number) => {};

type ChartComponentType = AreaChart | LineChart | BarChart;

type ChartSeriesComponentType = Area | Bar | Line;

export enum ChartType {
    Line = 'line',
    Bar = 'bar',
    Area = 'area'
};

export enum ChartOrientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal'
};

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
};

export interface ChartInstance {
    setChartType(type: ChartType);
    getChartType(): ChartType;
    setChartOrientation(type: ChartOrientation);
    getChartOrientation(): ChartOrientation;
};

interface ReferenceLinePrototype {
    x?: any;
    y?: any;
    stroke: string;
};

interface ChartState {
    lastGraphType: ChartType;
    graphType: ChartType;
    lastGraphOrientation: ChartOrientation;
    graphOrientation: ChartOrientation;
};

class Chart extends React.Component<ChartProps, ChartState> implements ChartInstance {
    
    state: ChartState = null;
    
    constructor(props) {
        super(props);
        
        this.state = {
            lastGraphType: ChartType.Line,
            graphType: ChartType.Line,
            lastGraphOrientation: ChartOrientation.Vertical,
            graphOrientation: ChartOrientation.Vertical
        };
    }
    
    setChartType(type: ChartType) {
        this.setState({
            graphType: type
        });
    }
    
    getChartType(): ChartType {
        return this.state.graphType;
    }
    
    setChartOrientation(type: ChartOrientation) {
        if (this.state.graphType == 'area') {
            this.setState({
                graphType: ChartType.Line,
                graphOrientation: type
            });
        } else {
            this.setState({
                graphOrientation: type
            });
        }
    }
    
    getChartOrientation(): ChartOrientation {
        return this.state.graphOrientation;
    }
    
    static getDerivedStateFromProps(props, state) {
        if (
            state.lastGraphType != props.graphType
            || state.lastGraphOrientation != props.graphOrientation
        ) {
            return {
                lastGraphType: props.graphType,
                graphType: props.graphType || ChartType.Line,
                lastGraphOrientation: props.graphOrientation,
                graphOrientation: props.graphOrientation || ChartOrientation.Vertical
            };
        }
        return null;
    }
    
    renderAxesComponents(dataFormatOptions: DataFormatOptions) {
        
        if (this.props.tiny && !this.props.showAxes) {
            return null;
        }
        
        const inputColumn = getInputColumn(this.props.data, dataFormatOptions);
        const outputColumns = getOutputColumns(this.props.data, dataFormatOptions);
        
        const createFormatter = (type: string) => {
            return (value) => (formatData(type, { value }, this.props.data, dataFormatOptions).value);
        };
        
        if (dataFormatOptions.rotate90) {
            return [
                <XAxis
                  key='chart-x-axis'
                  type='number'
                  tickFormatter={createFormatter('output:axis')}
                />,
                <YAxis
                    key='chart-y-axis'
                    type='category'
                    dataKey={inputColumn}
                    tickFormatter={createFormatter('input:axis')}
                />
            ];
        }
        
        return [
            <XAxis
              key='chart-x-axis'
              dataKey={inputColumn}
              tickFormatter={createFormatter('input:axis')}
            />,
            <YAxis
              key='chart-y-axis'
              tickFormatter={createFormatter('output:axis')}
            />
        ];
    }
    
    renderReferenceLines(dataFormatOptions: DataFormatOptions) {
        if(this.props.tiny && !this.props.showReferenceLines) {
            return null;
        }
        
        let referenceLines: Array<ReferenceLinePrototype> = [];
        let cursorValue = this.getCursorValue();
        
        const inputColumn = getInputColumn(this.props.data, dataFormatOptions);
        const outputColumns = getOutputColumns(this.props.data, dataFormatOptions);
        
        if (!cursorValue) {
            return [];
        }
        
        return [
            <ReferenceLine
                key='chart-main-reference-line'
                x={cursorValue[inputColumn]}
                stroke={'#000000'}
            />
        ].concat(
            Object.keys(cursorValue).filter((key) => outputColumns.indexOf(key) > -1).map((key, index) => (
                <ReferenceLine
                   key={`chart-reference-line-${index}`}
                   y={cursorValue[key]}
                   stroke={'#000000'}
                />
            ))
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
        return (this.props.tiny && !this.props.showLegend)?(null):(<Legend />);
    }
    
    renderTooltip(dataFormatOptions: DataFormatOptions) {
        if (this.props.tiny && !this.props.showTooltip) {
            return null;
        }
        
        return (
            <Tooltip
                key='chart-tooltip'
                formatter={(value, name, props) => formatData('output:cursor', { value }, this.props.data, dataFormatOptions).value}
                labelFormatter={(value) => formatData('input:cursor', { value }, this.props.data, dataFormatOptions).value}
            />
        );
    }
    
    renderGrid() {
        return (this.props.tiny && !this.props.showGrid)?(null):(<CartesianGrid strokeDasharray="3 3"/>);
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
        switch(dataFormatOptions.graphType) {
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
        switch(dataFormatOptions.graphType) {
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
            stroke: getGraphColor(index)
        });
        
        const getGraphColor = (index: number): string => {
            return [this.props.theme.colors.primary, this.props.theme.colors.secondary][index % 2];
        };
        
        switch(dataFormatOptions.graphType) {
            case ChartType.Area:
                return (column, index) => ({
                    stackId: '1',
                    activeDot: {r: 8},
                    stroke: getGraphColor(index),
                    fill: getGraphColor(index)
                });
            case ChartType.Bar:
                return (column, index) => ({
                    fill: getGraphColor(index),
                    barSize: 20
                });
            case ChartType.Line:
                return (column, index) => ({
                    activeDot: {r: 8},
                    stroke: getGraphColor(index)
                });
        }
        
        return defaultStylizer;
    }
    
    render() {
        
        const data = applyDataFormaters(this.props.data, this.props);
        
        const dataFormatOptions: DataFormatOptions = Object.assign({}, this.props, {
            graphType: this.state.graphType,
            rotate90: (this.state.graphOrientation == ChartOrientation.Horizontal)
        });
        
        const ChartComponent: ChartComponentType = this.getChartComponent(dataFormatOptions);
        const SeriesComponent: ChartSeriesComponentType = this.getSeriesComponent(dataFormatOptions);
        
        return (
            <Wrapper>
                {
                    React.Children.map(this.props.children || [], (child) =>
                        React.cloneElement(child as React.ReactElement<ChartModuleProps>, {
                            chart: this
                        })
                    )
                }
                <ResponsiveContainer height={this.props.height || 300} width={this.props.width || '90%'}>
                    <ChartComponent
                        data={data.rows}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        {
                            ...(dataFormatOptions.rotate90?{
                                layout: 'vertical'
                            }:{})
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