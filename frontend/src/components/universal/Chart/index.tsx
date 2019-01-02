import * as React from 'react';
import styled, { withTheme }  from 'styled-components';

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

interface WrapperProps {
};

const Wrapper = styled.div<WrapperProps>`
    padding: 0;
    width: 100%;
    height: 100%;
`;

const ChartWrapper = styled.div<WrapperProps>`
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
    setChartType(type: string);
    getChartType(): string;
    setChartOrientation(type: string);
    getChartOrientation(): string;
};

interface ReferenceLinePrototype {
    x?: any;
    y?: any;
    stroke: string;
};

class Chart extends React.Component<ChartProps, any> implements ChartInstance {
    
    state: any = null;
    
    constructor(props) {
        super(props);
        
        this.state = {
            hovered: {},
            lastGraphType: 'line',
            graphType: 'line',
            lastGraphOrientation: 'vertical',
            graphOrientation: 'vertical'
        };
    }
    
    setChartType(type: string) {
        this.setState({
            graphType: type
        });
    }
    
    getChartType() {
        return this.state.graphType;
    }
    
    setChartOrientation(type: string) {
        if(this.state.graphType == 'area') {
            this.setState({
                graphType: 'line',
                graphOrientation: type
            });
        } else {
            this.setState({
                graphOrientation: type
            });
        }
    }
    
    getChartOrientation() {
        return this.state.graphOrientation;
    }
    
    static getDerivedStateFromProps(props, state) {
        if(
            state.lastGraphType != props.graphType
            || state.lastGraphOrientation != props.graphOrientation
        ) {
            return {
                lastGraphType: props.graphType,
                graphType: props.graphType || 'line',
                lastGraphOrientation: props.graphOrientation,
                graphOrientation: props.graphOrientation || 'vertical'
            };
        }
        return null;
    }
    
    render() {
        
        const data = applyDataFormaters(this.props.data, this.props);
        
        let isTiny = this.props.tiny;
        
        let ChartComponent = LineChart;
        let SeriesComponent = Line;
        let AxesComponents = [];
        let referenceLines: Array<ReferenceLinePrototype> = [];
        let getSeriesStyle = (column, index) => {};
        let chartAdditionalProps = {};
        
        const dataFormatOptions = Object.assign({}, this.props, {
            graphType: this.state.graphType,
            rotate90: (this.state.graphOrientation == 'horizontal')
        });
        
        const inputColumn = getInputColumn(this.props.data, dataFormatOptions);
        const outputColumns = getOutputColumns(this.props.data, dataFormatOptions);
        
        const getGraphColor = (index: number): string => {
            return [this.props.theme.colors.primary, this.props.theme.colors.secondary][index % 2];
        };
        
        if(dataFormatOptions.graphType === 'area') {
            ChartComponent = AreaChart;
            SeriesComponent = Area;
            getSeriesStyle = (column, index) => ({
                stackId: '1',
                activeDot: {r: 8},
                stroke: getGraphColor(index),
                fill: getGraphColor(index)
            });
        } else if(dataFormatOptions.graphType === 'bar') {
            ChartComponent = BarChart;
            SeriesComponent = Bar;
            getSeriesStyle = (column, index) => ({
                fill: getGraphColor(index),
                barSize: 20
            });
        } else {
            getSeriesStyle = (column, index) => ({
                activeDot: {r: 8},
                stroke: getGraphColor(index)
            });
        }
        
        AxesComponents = [
            <XAxis
              dataKey={inputColumn}
              tickFormatter={(value) => formatData('input:axis', { value }, this.props.data, dataFormatOptions).value}
            />,
            <YAxis
                tickFormatter={(value) => formatData('output:axis', { value }, this.props.data, dataFormatOptions).value}
            />
        ];
        
        if(dataFormatOptions.rotate90) {
            AxesComponents = [
                <XAxis
                  type='number'
                  tickFormatter={(value) => formatData('output:axis', { value }, this.props.data, dataFormatOptions).value}
                />,
                <YAxis
                    type='category'
                    dataKey={inputColumn}
                    tickFormatter={(value) => formatData('input:axis', { value }, this.props.data, dataFormatOptions).value}
                />
            ];
            chartAdditionalProps = {
                layout: 'vertical'
            };
        }
        
        let cursorValue = null;
        let cursorRawValue = null;
        
        this.props.data.rows.forEach((row, index) => {
            if(row.hovered) {
                cursorValue = data.rows[index];
                cursorRawValue = row;
            }
        });
        
        if(cursorValue) {
            referenceLines = [
                {
                    x: cursorValue[inputColumn],
                    y: undefined,
                    stroke: '#000000'
                }
            ].concat(
                Object.keys(cursorValue).filter((key) => outputColumns.indexOf(key) > -1).map((key, index) => (
                    {
                       x: undefined,
                       y: cursorValue[key],
                       stroke: '#000000'
                    }
                ))
            );
        }
        
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
                        {...chartAdditionalProps}
                    >
                        {(isTiny && !this.props.showAxes)?(null):(AxesComponents)}
                        {(isTiny && !this.props.showGrid)?(null):(<CartesianGrid strokeDasharray="3 3"/>)}
                        {
                            (!isTiny || this.props.showTooltip)?(
                                <Tooltip
                                    formatter={(value, name, props) => formatData('output:cursor', { value }, this.props.data, dataFormatOptions).value}
                                    labelFormatter={(value) => formatData('input:cursor', { value }, this.props.data, dataFormatOptions).value}
                                />
                            ):(null)
                        }
                        {(isTiny && !this.props.showLegend)?(null):(<Legend />)}
                        {
                            (!isTiny || this.props.showReferenceLines)?(
                                referenceLines.map((refLine) => {
                                    return (
                                        <ReferenceLine {...refLine}/>
                                    );
                                })
                            ):(null)
                        }
                        {
                            outputColumns.map((column, index) => {
                                return (
                                    <SeriesComponent {...getSeriesStyle(column, index)} type="monotone" dataKey={column} />
                                );
                            })
                        }
                    </ChartComponent>
                </ResponsiveContainer>
            </Wrapper>
        );
    }
}

export default withTheme(withData(Chart));