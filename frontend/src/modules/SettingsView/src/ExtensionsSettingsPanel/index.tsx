import * as React from "react";

import { Route } from "react-router";
import { withRouter } from "react-router-dom";

import ModuleSettingsView from "./ModuleSettingsView";

import {
    faTools, faQuestion, faRedo,
} from "@fortawesome/free-solid-svg-icons";

class ExtensionsSettingsPanel extends React.Component<any, undefined> {
    render() {

        return (
            <div>
                {
                    this.props.app.modulesLoader.getAllModuleInstances().map(instance => {
                        return (
                            <Route
                                path={`${this.props.match.url}/${instance.module.getName()}`}
                                component={() => {
                                    return (
                                        <ModuleSettingsView
                                            app={this.props.app}
                                            module={instance.module}
                                            onGoBack={() => this.props.history.push(`${this.props.match.url}`)}
                                            onGoTop={() => this.props.onGoBack()}
                                        />
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
                            <div>
                                <this.props.app.UI.Breadcrumbs>
                                    {[
                                        {
                                            name: "Settings",
                                            onClick: () => this.props.onGoBack(),
                                        },
                                        {
                                            name: "Integrations and Extensions",
                                        },
                                    ]}
                                </this.props.app.UI.Breadcrumbs>
                                <this.props.app.UI.SearchableList
                                    renderItem={(instance) => {
                                        const name = instance.module.getName();
                                        const details = instance.module.getDetails();

                                        return (
                                            <this.props.app.UI.Card
                                                title={name}
                                                description={
                                                    <div>
                                                        {(details.description) ? (details.description) :(null)}
                                                        <this.props.app.UI.TinyButtons
                                                            items={[
                                                                {
                                                                    icon: faTools.iconName,
                                                                    text: "Settings",
                                                                    onClick: () => this.props.history.push(`${this.props.match.url}/${name}`),
                                                                },
                                                                {
                                                                    icon: faQuestion.iconName,
                                                                    text: "About",
                                                                },
                                                                {
                                                                    icon: faRedo.iconName,
                                                                    text: "Reset",
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                }
                                                action={
                                                    <div>
                                                        <this.props.app.UI.Toggle
                                                            value={instance.activated}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    instance.enable();
                                                                } else {
                                                                    instance.disable();
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                }
                                            />
                                        );
                                    }}
                                >
                                    {
                                        this.props.app.modulesLoader.getAllModuleInstances()
                                    }
                                </this.props.app.UI.SearchableList>
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}

export default withRouter(ExtensionsSettingsPanel);