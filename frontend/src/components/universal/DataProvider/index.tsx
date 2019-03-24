import * as React from "react";
import deepCopy from 'deep-copy';

import DATA_TYPE_PRESETS from "./DataTypePresets";

export type Preset = (typeOptions: any | string | Array<string>, type: DataTarget, point: DataPoint, options: DataFormatOptions) => FormattersMapping;

export interface PresetsMap {
    [key: string]: Preset;
}

export interface DataProviderProps {
    data: any;
    children?: Array<React.ReactElement<any>> | React.ReactElement<any>;
}

export type RowGenerator = (column: ColumnSpecs, row: RowSpecs) => any;

export interface ColumnSpecs extends FormattersMappingWithPresets {
    name: string;
    field?: string;
    type?: string;
    generator?: RowGenerator;
}

export enum DataTargetInput {
    Parse = "input:parse",
    Axis = "input:axis",
    Cursor = "input:cursor",
    Cell = "input:cell",
}

export enum DataTargetOutput {
    Parse = "output:parse",
    Axis = "output:axis",
    Cursor = "output:cursor",
    Cell = "output:cell",
}

export function isDataTargetInput(target: DataTarget): boolean {
    switch (target) {
        case DataTargetInput.Parse:
        case DataTargetInput.Cursor:
        case DataTargetInput.Axis:
        case DataTargetInput.Cell:
            return true;
    }

    return false;
}

export type DataTarget = DataTargetInput | DataTargetOutput;

export type RowSpecs = any;

export type FilterSpecs = (data: DataFormat) => DataFormat;

export interface DataFiltersMap {
    [key: string]: FilterSpecs;
}

export interface DataFormat {
    rows: Array<RowSpecs>;
    columns: Array<ColumnSpecs>;
    filters?: DataFiltersMap;
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

export type Formatter = (point: DataPoint, options: DataFormatOptions) => any;

export type FormatterWithPreset = Formatter | string;

export type ChainableFormatter = (formattedValue: any, point: DataPoint, options: DataFormatOptions) => any;

export type ChainableFormatterWithPreset = ChainableFormatter | string;

export interface FormattersMapping {
    parseInputData?: Formatter;
    parseOutputData?: Formatter;
    formatInputAxis?:  Formatter;
    formatOutputAxis?: Formatter;
    formatInputCursor?: Formatter;
    formatOutputCursor?: Formatter;
    formatInputCell?: Formatter;
    formatOutputCell?: Formatter;
}

export interface FormattersMappingWithPresets {
    parseInputData?: FormatterWithPreset;
    parseOutputData?: FormatterWithPreset;
    formatInputAxis?:  FormatterWithPreset;
    formatOutputAxis?: FormatterWithPreset;
    formatInputCursor?: FormatterWithPreset;
    formatOutputCursor?: FormatterWithPreset;
    formatInputCell?: FormatterWithPreset;
    formatOutputCell?: FormatterWithPreset;
}

export interface DataFormatOptions extends FormattersMapping {
    input?: any | string | Array<string>;
    output?: any | string | Array<string>;
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

function typePresetCompositionHelper(columnSpecs: ColumnSpecs, preset: Preset, formatterName: string, chain: ChainableFormatterWithPreset): Preset {
    return (typeOptions, type, point, options) => {
        const fmts: FormattersMapping = preset(typeOptions, type, point, options);
        const formatter = fmts[formatterName];

        let chainFn: ChainableFormatter = (formattedValue, point, options) => formattedValue;

        if (chain && typeof chain === "string") {
            // Preset name was specified as a chain function
            const chainPreset: Preset = getTypePreset(chain as string, {
                ...columnSpecs,
                [formatterName]: undefined,
            });
            chainFn = (formattedValue, point, options) => chainPreset(typeOptions, type, point, options)[formatterName](point, options);
        } else if (chain) {
            chainFn = chain as ChainableFormatter;
        } else {
            return fail("The chain type check is not exhaustive!");
        }

        return {
            ...fmts,
            [formatterName]: (point: DataPoint, options: DataFormatOptions) => chainFn(formatter(point, options), point, options),
        };
    };
}

function typePresetOptionsCompositionHelper(preset: Preset, formatterName: string, options: ColumnSpecs): Preset {
    if (options[formatterName]) {
        return typePresetCompositionHelper(options, preset, formatterName, options[formatterName]);
    }
    return preset;
}

export function getTypePreset(typeName: string, options: ColumnSpecs): Preset {
    let preset = DATA_TYPE_PRESETS[typeName];
    if (!preset) {
        throw `DataProvider: Could not find preset for type "${typeName}"`;
    }

    [
        "parseInputData",
        "parseOutputData",
        "formatInputAxis",
        "formatOutputAxis",
        "formatInputCursor",
        "formatOutputCursor",
        "formatInputCell",
        "formatOutputCell",
    ].forEach(key => {
        preset = typePresetOptionsCompositionHelper(preset, key, options);
    });

    return preset;
}

export function getFormatDefaults(type: DataTarget, point: DataPoint, data: DataFormat, options: DataFormatOptions = {}): DataFormatOptions {

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

    if (options.input && options.input.type && isDataTargetInput(type)) {
        const preset = getTypePreset(options.input.type, options.input);
        presetOverrideOptions = {...presetOverrideOptions, ...preset(options.input, type, point, options)};
    }

    if (options.output && options.output.type && !isDataTargetInput(type)) {
        const preset = getTypePreset(options.output.type, options.output);
        presetOverrideOptions = {...presetOverrideOptions, ...preset(options.output, type, point, options)};
    }

    return {
           parseInputData: (point, options) => ("" + point.value),
           parseOutputData: (point, options) => ("" + point.value),
           formatInputAxis:  (point, options) => ("" + point.value),
           formatOutputAxis: (point, options) => ("" + point.value),
           formatInputCursor: (point, options) => ("" + point.value),
           formatOutputCursor: (point, options) => ("" + point.value),
           formatInputCell: (point, options) => ("" + point.value),
           formatOutputCell: (point, options) => ("" + point.value),
        ...presetOverrideOptions,
        ...options,
     };
}

export function formatData(type: DataTarget, point: DataPoint, data: DataFormat, options: DataFormatOptions = {}): FormatedDataPoint {

    options = getFormatDefaults(type, point, data, options);

    switch (type) {
        case DataTargetInput.Parse:
            return {
                value: options.parseInputData(point, options),
            };
        case DataTargetOutput.Parse:
            return {
                value: options.parseOutputData(point, options),
            };
        case DataTargetInput.Axis:
            return {
                value: options.formatInputAxis(point, options),
            };
        case DataTargetOutput.Axis:
            return {
                value: options.formatOutputAxis(point, options),
            };
        case DataTargetInput.Cursor:
            return {
                value: options.formatInputCursor(point, options),
            };
        case DataTargetOutput.Cursor:
            return {
                value: options.formatOutputCursor(point, options),
            };
        case DataTargetInput.Cell:
            return {
                value: options.formatInputCell(point, options),
            };
        case DataTargetOutput.Cell:
            return {
                value: options.formatOutputCell(point, options),
            };
    }

    return {
       value: null,
   };
}

export function resolveData(dataToResolve: DataFormat): DataFormat {
    let data = deepCopy(dataToResolve);

    data.columns.forEach(column => {
        if (column.generator) {
           data.rows = data.rows.map(row => ({
               ...row,
               [column.field || column.name]: column.generator(column, row),
           }));
        }
    });

    if (data.filters) {
        Object.keys(data.filters).forEach(key => {
            const filterFn = data.filters[key];
            if (filterFn) {
                data = filterFn(data);
            }
        });
    }

    return data;
}

export function applyDataFormaters(data: DataFormat, options: DataFormatOptions = {}): DataFormat {

   data = resolveData(data);

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

            formattedRow[inputColumn] = formatData(DataTargetInput.Parse, {
                value: row[inputColumn],
            }, data, options).value;

            filteredColumns.forEach((column) => {
                formattedRow[column] = formatData(DataTargetOutput.Parse, {
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
