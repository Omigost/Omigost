import * as React from "react";

import { Route } from "react-router";
import { withRouter } from "react-router-dom";

import ExtensionsSettingsPanel from "../ExtensionsSettingsPanel";
import ThemesSettingsPanel from "../ThemesSettingsPanel";

const PANELS = {
    "Integrations and Extensions": {
        route: "integrations-and-extensions",
        component: ExtensionsSettingsPanel,
    },
    "Themes": {
        route: "themes",
        component: ThemesSettingsPanel,
    },
};

const SETTINGS_OPTIONS = [
    {
        name: "Dump configs",
        options: [
            {
                name: "Export settings",
                icon: "download",
            },
            {
                name: "Import settings",
                icon: "upload",
            },
        ],
    },
    {
        name: "Customize",
        options: [
            {
                name: "Security",
                icon: "shield-alt",
            },
            {
                name: "Notification settings",
                icon: "comment-alt",
            },
            {
                name: "Instance settings",
                icon: "flag",
            },
        ],
    },
    {
        name: "Extend",
        options: [
            {
                name: "Integrations and Extensions",
                icon: "plus",
            },
            {
                name: "Themes",
                icon: "palette",
            },
        ],
    },
];

class Panel extends React.Component<any, undefined> {

    render() {
        return (
            <div>
                {
                    Object.keys(PANELS).map((key, index) => {
                        return (
                            <Route
                                key={`panel-route-${index}`}
                                path={`${this.props.match.url}/${PANELS[key].route}`}
                                component={() => {
                                    const SettingsComponent = PANELS[key].component;

                                    return (
                                        <div>
                                            <SettingsComponent
                                                app={this.props.app}
                                                onGoBack={() => this.props.history.push(`${this.props.match.url}`)}
                                            />
                                        </div>
                                    );
                                }}
                            />
                        );
                    })
                }
                <Route
                    exact
                    path={`${this.props.match.url}`}
                    component={() => {
                        return (
                            <this.props.app.UI.InteractiveNestedGrid
                                options={SETTINGS_OPTIONS}
                                renderItem={(props) => {
                                    return (
                                        <div>
                                            <this.props.app.UI.ButtonPanel
                                                icon={props.item.icon}
                                                onClick={() => {
                                                    const panel = PANELS[props.item.name];
                                                    if (panel) {
                                                        this.props.history.push(`${this.props.match.url}/${panel.route}`);
                                                    }
                                                }}
                                            >
                                                {props.item.name}
                                            </this.props.app.UI.ButtonPanel>
                                        </div>
                                    );
                                }}
                            />
                        );
                    }}
                />
            </div>
        );
    }
}

export default withRouter(Panel);