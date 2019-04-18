import * as React from "react";

import ExtensionsSettingsPanel from "../ExtensionsSettingsPanel";

const PANELS = {
    "Integrations and Extensions": ExtensionsSettingsPanel,
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
        ],
    },
];

export default class Panel extends React.Component<any, any> {

    state: any = null;

    constructor(props) {
        super(props);

        this.state = {
            openedPaneName: null,
        };
        this.handlePanelClick = this.handlePanelClick.bind(this);
    }

    handlePanelClick(item) {
        this.setState({
            openedPaneName: item.name,
        });
    }

    render() {

        if (this.state.openedPaneName) {
            const SettingsComponent = PANELS[this.state.openedPaneName] || (() => null);

            return (
                <div>
                    {
                        <SettingsComponent
                            app={this.props.app}
                            onGoBack={() => this.setState({ openedPaneName: null })}
                        />
                    }
                </div>
            );
        }

        return (
            <this.props.app.UI.InteractiveNestedGrid
                options={SETTINGS_OPTIONS}
                renderItem={(props) => {
                    return (
                        <div>
                            <span className="nestedGridHandler">Drag</span>
                            <this.props.app.UI.ButtonPanel
                                icon={props.item.icon}
                                onClick={() => this.handlePanelClick(props.item)}
                            >
                                {props.item.name}
                            </this.props.app.UI.ButtonPanel>
                        </div>
                    );
                }}
            />
        );
    }
}