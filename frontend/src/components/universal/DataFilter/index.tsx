import * as React from "react";
import styled  from "styled-components";

import { DataFormat, FilterSpecs, withData } from 'components/DataProvider';

export type FilterChangeCallback = (filter?: FilterSpecs) => void;

export interface DataFilterProps {
    filter: FilterSpecs;
    data: DataFormat;
    children?: (changeFilter: FilterChangeCallback, data: DataFormat) => React.ReactNode;
    onDataChanged?: (data: DataFormat) => void;
}

class DataFilter extends React.Component<DataFilterProps, undefined> {
    
    updateFilter(filter?: FilterSpecs) {
        if (filter || this.props.filter) {
            if (this.props.onDataChanged) {
                this.props.onDataChanged({
                    ...this.props.data,
                    filters: {
                        ...this.props.data.filters,
                        'my-filter': filter || this.props.filter,
                    },
                });
            }
        }
    }
    
    componentDidMount() {
        this.updateFilter();
    }
    
    render() {
        if (this.props.children) {
            return this.props.children((filter) => this.updateFilter(filter), this.props.data);
        }
        
        return null;
    }
}

export default withData(DataFilter);