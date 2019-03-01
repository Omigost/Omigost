import * as React from "react";

import DATA_TYPE_PRESETS from "./DataTypePresets";


export interface DataProviderProps {
    data: any;
    children?: Array<React.ReactElement<any>> | React.ReactElement<any>;
}

export interface ColumnSpecs {
    name: string;
    field?: string;
}

export type RowSpecs = any;

export interface DataFormat {
    rows: Array<RowSpecs>;
    columns: Array<ColumnSpecs>;
}

interface DataProviderState {
    data: DataFormat;
}

const DataProviderContext = React.createContext(null);

export interface DataConsumerProps {
    children: Array<React.ReactElement<any>>;
    data?: DataFormat;
    onDataChanged?: (data: DataFormat) => void;
}

export interface FormatedDataPoint {
    value: any;
}

export interface DataPoint {
    value: any;
}

export interface DataFormatOptions {
    input?: any | string | Array<string>;
    output?: any | string | Array<string>;
    parseInputData?: (point: DataPoint, options: DataFormatOptions) => any;
    parseOutputData?: (point: DataPoint, options: DataFormatOptions) => any;
    formatInputAxis?:  (point: DataPoint, options: DataFormatOptions) => any;
    formatOutputAxis?: (point: DataPoint, options: DataFormatOptions) => any;
    formatInputCursor?: (point: DataPoint, options: DataFormatOptions) => any;
    formatOutputCursor?: (point: DataPoint, options: DataFormatOptions) => any;
}

export function getInputColumn(data: DataFormat, options: DataFormatOptions = {}) {
    let inputColumn = "x";
    if (typeof options.input === "string") {
        inputColumn = options.input;
    }

    return inputColumn;
}

export function getOutputColumns(data: DataFormat, options: DataFormatOptions = {}) {
    let outputColumns = null;
    if (typeof options.output === "string") {
       outputColumns = [ options.output ];
    }

    if (options.output && options.output.forEach) {
        outputColumns = options.output;
    }

    return outputColumns || [];
}


export const addPrePostfixFormatAxis = (typeOptions, point: DataPoint, options, infix: string) => {
    return `${typeOptions.axisPrefix || typeOptions.prefix || ""}${infix}${typeOptions.axisPostfix || typeOptions.postfix  || ""}`;
};

export const addPrePostfixFormatCursor = (typeOptions, data: DataFormat, options, infix) => {
    return (
        <span>
            {typeOptions.cursorPrefix || typeOptions.prefix || ""}
            {infix}
            {typeOptions.cursorPostfix || typeOptions.postfix || ""}
        </span>
    );
};

export function getFormatDefaults(type: string, point: DataPoint, data: DataFormat, options: DataFormatOptions = {}): DataFormatOptions {

    let presetOverrideOptions = {};
    options = {...options};

    if (typeof options.input === "string") {
        options.input = data.columns.filter((column) => column.field === options.input || column.name === options.input)[0];
    }

    if (typeof options.output === "string") {
        options.output = data.columns.filter((column) => column.field === options.output || column.name === options.output)[0];
    }

    if (options.output && options.output.forEach) {
        options.output = data.columns.filter((column) => options.output.indexOf(column.field) > -1 || options.output.indexOf(column.name) > -1)[0];
    }

    if (!options.input) {
        options.input = {
            type: "number",
        };
    }

    if (!options.output) {
        options.output = {
            type: "number",
        };
    }

    if (options.input && options.input.type && type.indexOf("input:") === 0) {
        const preset = DATA_TYPE_PRESETS[options.input.type];
        presetOverrideOptions = {...presetOverrideOptions, ...preset(options.input, type, point, options)};
    }

    if (options.output && options.output.type && type.indexOf("output:") === 0) {
        const preset = DATA_TYPE_PRESETS[options.output.type];
        presetOverrideOptions = {...presetOverrideOptions, ...preset(options.output, type, point, options)};
    }

    return {
           parseInputData: (point, options) => ("" + point.value),
           parseOutputData: (point, options) => ("" + point.value),
           formatInputAxis:  (point, options) => ("" + point.value),
           formatOutputAxis: (point, options) => ("" + point.value),
           formatInputCursor: (point, options) => ("" + point.value),
           formatOutputCursor: (point, options) => ("" + point.value),
        ...presetOverrideOptions,
        ...options,
     };
}

export function formatData(type: string, point: DataPoint, data: DataFormat, options: DataFormatOptions = {}): FormatedDataPoint {

    options = getFormatDefaults(type, point, data, options);

    switch (type) {
        case "input:parse":
            return {
                value: options.parseInputData(point, options),
            };
        case "output:parse":
            return {
                value: options.parseOutputData(point, options),
            };
        case "input:axis":
            return {
                value: options.formatInputAxis(point, options),
            };
        case "output:axis":
            return {
                value: options.formatOutputAxis(point, options),
            };
        case "input:cursor":
            return {
                value: options.formatInputCursor(point, options),
            };
        case "output:cursor":
            return {
                value: options.formatOutputCursor(point, options),
            };
    }

    return {
       value: null,
   };
}

export function applyDataFormaters(data: DataFormat, options: DataFormatOptions = {}, type: string = "parse"): DataFormat {
   let filteredColumns = null;
   if (typeof options.output === "string") {
       filteredColumns = [ options.output ];
    }

   if (options.output && options.output.forEach) {
        filteredColumns = options.output;
    }

   let inputColumn = "x";
   if (typeof options.input === "string") {
        inputColumn = options.input;
    }

   return {...data,
        rows: data.rows.map((row) => {
            const formattedRow = {};

            formattedRow[inputColumn] = formatData("input:" + type, {
                value: row[inputColumn],
            }, data, options).value;

            filteredColumns.forEach((column) => {
                formattedRow[column] = formatData("output:" + type, {
                    value: row[column],
                }, data, options).value;
            });

            return formattedRow;
        })};
}

export class DataConsumer extends React.Component<any & DataConsumerProps, undefined> {
  render() {
    return (
        <DataProviderContext.Consumer>
            {
                (context) => {
                    if (!context) {
                        return this.props.children;
                    }

                    const { data, onDataChanged } = context;
                    return React.Children.map(this.props.children, (child) =>
                        React.cloneElement(child as React.ReactElement<any>, {
                            data: this.props.data || data,
                            onDataChanged: (this.props.onDataChanged) ? ((data) => {
                                this.props.onDataChanged(data);
                                onDataChanged(data);
                            }) :(onDataChanged),
                        }),
                    );
                }
            }
        </DataProviderContext.Consumer>
    );
  }
}

export interface WithDataProps {
    data?: DataFormat;
}

export function withData<P>(Component: React.ComponentType<P & WithDataProps> | React.SFC<P & WithDataProps>): React.SFC<P> {
    return (props: P) => {
        return (
            <DataConsumer>
                <Component {...props} />
            </DataConsumer>
        );
    };
}

export default class DataProvider extends React.Component<DataProviderProps, DataProviderState> {

    state: DataProviderState;

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
        };

        this.handleDataChange = this.handleDataChange.bind(this);
    }

    handleDataChange(data: DataFormat) {
        this.setState({ data });
    }

    render() {
        return (
            <DataProviderContext.Provider
                value={{
                    data: this.state.data,
                    onDataChanged: this.handleDataChange,
                }}
            >
                {this.props.children}
            </DataProviderContext.Provider>
        );
    }
}