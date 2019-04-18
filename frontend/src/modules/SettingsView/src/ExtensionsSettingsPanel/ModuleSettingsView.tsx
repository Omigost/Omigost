import * as React from "react";

export default class ModuleSettingsView extends React.Component<any, any> {
    render() {
        return (
            <div>
                <this.props.app.UI.Breadcrumbs>
                    {[
                        {
                            name: "Settings",
                            onClick: () => this.props.onGoTop(),
                        },
                        {
                            name: "Integrations and Extensions",
                            onClick: () => this.props.onGoBack(),
                        },
                        {
                            name: this.props.module.getName(),
                        },
                    ]}
                </this.props.app.UI.Breadcrumbs>
            </div>
        );
    }
}