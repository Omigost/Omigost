import * as React from "react";

import { withTheme } from 'styled-components';

import { Route } from "react-router";
import { withRouter } from "react-router-dom";

import {
    faTools, faQuestion, faRedo,
} from "@fortawesome/free-solid-svg-icons";

class ThemesSettingsPanel extends React.Component<any, undefined> {
    render() {

        return (
            <div>
                <Route
                    exact
                    path={`${this.props.match.url}`}
                    component={() => {
                        return (
                            <div>
                                <this.props.app.UI.Breadcrumbs>
                                    {[
                                        {
                                            name: "Settings",
                                            onClick: () => this.props.onGoBack(),
                                        },
                                        {
                                            name: "Themes",
                                        },
                                    ]}
                                </this.props.app.UI.Breadcrumbs>
                                <div>
                                    <this.props.app.UI.ThemeSetter>
                                        {({ setTheme }) => {
                                            return (
                                                <this.props.app.UI.Form
                                                    submitButton="Save new budget"
                                                    onSubmit={(data) => {
                                                        data.colors.primaryGradient = `linear-gradient(to right, ${data.colors.primary}, ${data.colors.secondary})`;
                                                        
                                                        console.error("SET DATA");
                                                        console.log(data);
                                                        
                                                        setTheme(data);
                                                    }}
                                                    defaultValue={this.props.theme}
                                                >
                                                    {{
                                                        title: "Set theme properties",
                                                        description: "Set theming options",
                                                        type: "object",
                                                        properties: {
                                                            "primaryFont": {
                                                                type: "string",
                                                                title: "Primary font",
                                                                minLength: 1,
                                                            },
                                                            "colors": {
                                                                title: "Theme colors",
                                                                description: "Specify colors of the interface",
                                                                type: "object",
                                                                properties: {
                                                                    "background": {
                                                                        type: "string",
                                                                        ui: "colorPicker",
                                                                        description: "Background colors",
                                                                        minLength: 1,
                                                                        layout: "inlineLabel",
                                                                    },
                                                                    "primary": {
                                                                        type: "string",
                                                                        ui: "colorPicker",
                                                                        description: "Primary color",
                                                                        minLength: 1,
                                                                        layout: "inlineLabel",
                                                                    },
                                                                    "secondary": {
                                                                        type: "string",
                                                                        ui: "colorPicker",
                                                                        description: "Secondary color",
                                                                        minLength: 1,
                                                                        layout: "inlineLabel",
                                                                    },
                                                                    "primaryText": {
                                                                        type: "string",
                                                                        ui: "colorPicker",
                                                                        description: "Primary text color",
                                                                        minLength: 1,
                                                                        layout: "inlineLabel",
                                                                    },
                                                                    "accent": {
                                                                        type: "string",
                                                                        ui: "colorPicker",
                                                                        description: "Accent color",
                                                                        minLength: 1,
                                                                        layout: "inlineLabel",
                                                                    },
                                                                    "lightAccent": {
                                                                        type: "string",
                                                                        ui: "colorPicker",
                                                                        description: "Light accent color",
                                                                        minLength: 1,
                                                                        layout: "inlineLabel",
                                                                    },
                                                                    "palette": {
                                                                        type: "array",
                                                                        title: "Palette colors",
                                                                        items: {
                                                                            type: "string",
                                                                            ui: "colorPicker",
                                                                            description: "Palette color",
                                                                            minLength: 0,
                                                                            layout: "inlineLabel",
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                            "fontSize": {
                                                                title: "Font sizes",
                                                                description: "Specify sizes of theme fonts",
                                                                type: "object",
                                                                properties: {
                                                                    "S": {
                                                                        type: "number",
                                                                        ui: "slider",
                                                                        description: "S-size font",
                                                                        minimum: 0,
                                                                        maximum: 10,
                                                                        formatInput: value => parseFloat(value.replace('vw', '')),
                                                                        formatOutput: value => `${value}vw`,
                                                                    },
                                                                    "default": {
                                                                        type: "number",
                                                                        ui: "slider",
                                                                        description: "Default font size",
                                                                        minimum: 0,
                                                                        maximum: 10,
                                                                        formatInput: value => parseFloat(value.replace('vw', '')),
                                                                        formatOutput: value => `${value}vw`,
                                                                    },
                                                                    "M": {
                                                                        type: "number",
                                                                        ui: "slider",
                                                                        description: "M-size font",
                                                                        minimum: 0,
                                                                        maximum: 10,
                                                                        formatInput: value => parseFloat(value.replace('vw', '')),
                                                                        formatOutput: value => `${value}vw`,
                                                                    },
                                                                    "L": {
                                                                        type: "number",
                                                                        ui: "slider",
                                                                        description: "L-size font",
                                                                        minimum: 0,
                                                                        maximum: 10,
                                                                        formatInput: value => parseFloat(value.replace('vw', '')),
                                                                        formatOutput: value => `${value}vw`,
                                                                    },
                                                                    "XL": {
                                                                        type: "number",
                                                                        ui: "slider",
                                                                        description: "XL-size font",
                                                                        minimum: 0,
                                                                        maximum: 10,
                                                                        formatInput: value => parseFloat(value.replace('vw', '')),
                                                                        formatOutput: value => `${value}vw`,
                                                                    },
                                                                    "XXL": {
                                                                        type: "number",
                                                                        ui: "slider",
                                                                        description: "XXL-size font",
                                                                        minimum: 0,
                                                                        maximum: 10,
                                                                        formatInput: value => parseFloat(value.replace('vw', '')),
                                                                        formatOutput: value => `${value}vw`,
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    }}
                                                </this.props.app.UI.Form>
                                            );
                                        }}
                                    </this.props.app.UI.ThemeSetter>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}

export default withTheme(withRouter(ThemesSettingsPanel));