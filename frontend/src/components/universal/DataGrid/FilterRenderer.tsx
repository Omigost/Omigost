import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface FilterRendererState {
     text: string;
};

export interface FilterRendererProps {
     valueGetter: (data: any) => any;
     filterChangedCallback: () => void;
};

export default class FilterRenderer extends React.Component<FilterRendererProps, FilterRendererState> {
    state: FilterRendererState;
    valueGetter: (data: any) => any;
    filterChangedCallback: () => void;
    
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.valueGetter = this.props.valueGetter;

        this.onChange = this.onChange.bind(this);
    }

    isFilterActive() {
        return this.state.text !== '';
    }

    doesFilterPass(params) {
        return this.state.text.toLowerCase()
            .split(" ")
            .every((filterWord) => {
                return this.valueGetter(params.node).toString().toLowerCase().indexOf(filterWord) >= 0;
            });
    }

    getModel() {
        return {value: this.state.text};
    }

    setModel(model) {
        this.state.text = model ? model.value : '';
    }

    onChange(event) {
        let newValue = event.target.value;
        if (this.state.text !== newValue) {
            this.setState({
                text: newValue
            }, () => {
                this.props.filterChangedCallback();
            });

        }
    }

    render() {
        let style = {
            border: "2px solid #22ff22",
            borderRadius: "5px",
            backgroundColor: "#bbffbb",
            width: "200px",
            height: "50px"
        };

        return (
            <div style={style}>
                Filter:
                <input
                    style={{height: "20px"}}
                    ref="input"
                    value={this.state.text}
                    onChange={this.onChange}
                    className="form-control"
                />
            </div>
        );
    }
};