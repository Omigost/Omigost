import * as React from "react";

import { withData, resolveData, DataFormat } from "components/DataProvider";

export type ExportCallback = (options?: ExportXLSXProps) => void;

export type WorkbookCreator = (xlsx: any, workBook: any, data: any, rawData: any) => void; 

export enum ExportFormat {
    EXCEL_XLSX = 'xlsx',
    CSV = 'csv',
    TXT = 'txt',
}

export interface ExportXLSXProps {
    children?: (ExportCallback) => React.ReactNode;
    data?: DataFormat;
    sheetName?: string;
    workbookName?: string;
    workbookCreator?: WorkbookCreator;
    format?: ExportFormat;
}

const SHEET_DEFAULT_NAME = 'Data';
const WORKBOOK_DEFAULT_NAME = 'data';
const DEFAULT_EXPORT_FORMAT = ExportFormat.EXCEL_XLSX;

class ExportXLSX extends React.Component<ExportXLSXProps, undefined> {

    handleExportAction(options?: ExportXLSXProps) {
        import(/* webpackChunkName: "xlsx" */ "xlsx").then(module => {
            const effOptions = {
                ...this.props,
                ...options,
            };
            
            const xlsx = module;
            const data = resolveData(effOptions.data);
            const exportFormat = effOptions.format || DEFAULT_EXPORT_FORMAT;
            
            const workBook = xlsx.utils.book_new();
            const sheetData = xlsx.utils.json_to_sheet(data.rows.map(item => {
                let filteredObject = {};
                data.columns.forEach(column => {
                    if (column.name) {
                        filteredObject[column.name] = item[column.field || column.name];
                    } else if (column.field) {
                        filteredObject[column.field] = item[column.field];
                    }
                });
                return filteredObject;
            }), {
                header: data.columns.map(item => item.name).filter(name => name !== 'hovered'),
            });
            
            xlsx.utils.book_append_sheet(workBook, sheetData, effOptions.sheetName || SHEET_DEFAULT_NAME);
            
            if(effOptions.workbookCreator) {
                effOptions.workbookCreator(xlsx, workBook, data, effOptions.data);
            } else {
                xlsx.writeFile(workBook, `${effOptions.workbookName || WORKBOOK_DEFAULT_NAME}.${exportFormat}`);
            }
        });
    }

    render() {
        if(!this.props.children) {
            return null;
        }
        
        return this.props.children((options) => {
            this.handleExportAction(options);
        });
    }
}

export default withData(ExportXLSX);