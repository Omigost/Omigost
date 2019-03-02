import * as moment from "moment";
import { addPrePostfixFormatAxis, addPrePostfixFormatCursor, PresetsMap } from "./index";

const PRESETS: PresetsMap = {
    "string": (typeOptions, type, point, options) => {
        const idFun = (point, options) => ("" + point.value);

        return {
            parseInputData: idFun,
            parseOutputData: idFun,
            formatInputAxis:  idFun,
            formatOutputAxis: idFun,
            formatInputCursor: idFun,
            formatOutputCursor: idFun,
            formatInputCell: idFun,
            formatOutputCell: idFun,
        };
    },
    "number": (typeOptions, type, point, options) => {
        const parseData = (point, options) => {
            return parseInt(point.value) || null;
        };

        const formatAxis = (point, options) => {
            return addPrePostfixFormatAxis(typeOptions, point, options, (point.value) ? ("" + point.value) :(""));
        };

        const formatCursor = (point, options) => {
            return addPrePostfixFormatCursor(typeOptions, point, options, (point.value) ? ("" + point.value) :(""));
        };

        return {
            parseInputData: parseData,
            parseOutputData: parseData,
            formatInputAxis:  formatAxis,
            formatOutputAxis: formatAxis,
            formatInputCursor: formatCursor,
            formatOutputCursor: formatCursor,
            formatInputCell: parseData,
            formatOutputCell: parseData,
        };
    },
    "currency": (typeOptions, type, point, options) => {
        const parseData = (point, options) => {
            return parseInt((point.value + "").replace(/\$/, "")) || null;
        };

        const formatData = (point, options) => {
            return `\$${point.value}`;
        };

        const formatAxis = (point, options) => {
            return addPrePostfixFormatAxis(typeOptions, point, options, (point.value) ? ("" + point.value) :(""));
        };

        const formatCursor = (point, options) => {
            return addPrePostfixFormatCursor(typeOptions, point, options, (point.value) ? ("" + point.value) :(""));
        };

        return {
            parseInputData: parseData,
            parseOutputData: formatData,
            formatInputAxis:  formatAxis,
            formatOutputAxis: formatAxis,
            formatInputCursor: formatCursor,
            formatOutputCursor: formatCursor,
            formatInputCell: parseData,
            formatOutputCell: formatData,
        };
    },
    "date": (typeOptions, type, point, options) => {

        const parseData = (point, options) => {
            const format = typeOptions.parseFormat || typeOptions.format;
            return (format) ? (moment(point.value, format).toString()) :(moment(point.value).toString());
        };

        const formatAxis = (point, options) => {
            const format = typeOptions.axisFormat || typeOptions.displayFormat || typeOptions.format;
            return addPrePostfixFormatAxis(typeOptions, point, options,
                (format) ? (moment(point.value).format(format)) :(moment(point.value).format()),
            );
        };

        const formatCursor = (point, options) => {
            const format = typeOptions.cursorFormat || typeOptions.displayFormat || typeOptions.format;
            return addPrePostfixFormatCursor(typeOptions, point, options,
                (format) ? (moment(point.value).format(format)) :(moment(point.value).format()),
            );
        };

        return {
            parseInputData: parseData,
            parseOutputData: parseData,
            formatInputAxis:  formatAxis,
            formatOutputAxis: formatAxis,
            formatInputCursor: formatCursor,
            formatOutputCursor: formatCursor,
            formatInputCell: parseData,
            formatOutputCell: parseData,
        };
    },
};

export default PRESETS;