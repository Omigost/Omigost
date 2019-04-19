import * as React from "react";
import styled, { withTheme } from "styled-components";

import { resolveData, withData, DataFormat, FormatedDataPoint, RowSpecs } from "components/DataProvider";

interface CustomDataRendererProps {
    renderData(data: DataFormat): React.Node;
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