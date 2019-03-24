import * as React from "react";

import TinyButtons from "components/TinyButtons";
import ExportXLSX, {ExportFormat} from "components/ExportXLSX";

import {
    faDownload
} from "@fortawesome/free-solid-svg-icons";

export interface ExportXLSXButtonsProps {
}

export default class ExportXLSXButtons extends React.Component<ExportXLSXButtonsProps, undefined> {
    render() {
        return (
            <ExportXLSX>
                {
                    (doExport) => {
                        return (
                            <TinyButtons>
                                {
                                    [
                                        {
                                            icon: faDownload.iconName,
                                            text: "Export CSV",
                                            onClick: () => doExport({
                                                format: ExportFormat.CSV
                                            }),
                                        },
                                    ]
                                }
                            </TinyButtons>
                        );
                    }
                }
            </ExportXLSX>
        );
    }
}