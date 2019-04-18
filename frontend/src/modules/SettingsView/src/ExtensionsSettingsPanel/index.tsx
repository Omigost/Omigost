import * as React from "react";

import ModuleSettingsView from "./ModuleSettingsView";

import {
    faTools, faQuestion, faRedo,
} from "@fortawesome/free-solid-svg-icons";

interface ExtensionsSettingsPanelState {
    selectedModule: any;
}

export default class ExtensionsSettingsPanel extends React.Component<any, ExtensionsSettingsPanelState> {
    state: ExtensionsSettingsPanelState;

    constructor(props) {
        super(props);

        this.state = {
            selectedModule: null,
        };
    }

    render() {

        if (this.state.selectedModule) {
            return (
                <ModuleSettingsView
                    app={this.props.app}
                    module={this.props.app.modulesLoader.getModule(this.state.selectedModule)}
                    onGoBack={() => this.setState({ selectedModule: null })}
                    onGoTop={() => this.props.onGoBack()}
                />
            );
        }

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
                                        <this.props.app.UI.TinyButtons>
                                            {[
                                                {
                                                    icon: faTools.iconName,
                                                    text: "Settings",
                                                    onClick: () => this.setState({ selectedModule: name }),
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
                                        </this.props.app.UI.TinyButtons>
                                    </div>
                                }
                                action={
                                    <div>
                                        <this.props.app.UI.Toggle
                                            defaultValue={instance.activated}
                                            onChange={(e) => {
                                                if (e.target.value) {
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
    }
}