import * as moment from 'moment';
import { addPrePostfixFormatAxis, addPrePostfixFormatCursor } from './index';

export default {
    'number': (typeOptions, type, point, options) => {
        const parseData = (point, options) => {
            return parseInt(point.value) || null;
        };
        
        const formatAxis = (point, options) => {
            return addPrePostfixFormatAxis(typeOptions, point, options, (point.value)?('' + point.value):(''));
        };
        
        const formatCursor = (point, options) => {
            return addPrePostfixFormatCursor(typeOptions, point, options, (point.value)?('' + point.value):(''));
        };
        
        return {
            parseInputData: parseData,
            parseOutputData: parseData,
            formatInputAxis:  formatAxis,
            formatOutputAxis: formatAxis,
            formatInputCursor: formatCursor,
            formatOutputCursor: formatCursor
        };
    },
    'date': (typeOptions, type, point, options) => {
        
        const parseData = (point, options) => {
            const format = typeOptions.parseFormat || typeOptions.format;
            return (format)?(moment(point.value, format).toString()):(moment(point.value).toString());
        };
        
        const formatAxis = (point, options) => {
            const format = typeOptions.axisFormat || typeOptions.displayFormat || typeOptions.format;
            return addPrePostfixFormatAxis(typeOptions, point, options,
                (format)?(moment(point.value).format(format)):(moment(point.value).format())
            );
        };
        
        const formatCursor = (point, options) => {
            const format = typeOptions.cursorFormat || typeOptions.displayFormat || typeOptions.format;
            return addPrePostfixFormatCursor(typeOptions, point, options,
                (format)?(moment(point.value).format(format)):(moment(point.value).format())
            );
        };
        
        return {
            parseInputData: parseData,
            parseOutputData: parseData,
            formatInputAxis:  formatAxis,
            formatOutputAxis: formatAxis,
            formatInputCursor: formatCursor,
            formatOutputCursor: formatCursor
        };  
    }
};
