import * as React from "react";
import { withTheme } from "styled-components";

import { resolveData, withData, DataFormat } from "components/DataProvider";

interface CustomDataRendererProps {
    data: DataFormat;
    renderData(data: DataFormat): React.ReactNode;
}

class CustomDataRenderer extends React.Component<CustomDataRendererProps, undefined> {

    constructor(props) {
        super(props);
    }

    render() {
        const data = resolveData(this.props.data);
        return this.props.renderData(data);
    }
}

export default withTheme(withData(CustomDataRenderer));