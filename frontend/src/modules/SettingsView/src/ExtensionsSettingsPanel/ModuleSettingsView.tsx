import * as React from "react";

export default class ModuleSettingsView extends React.Component<any, any> {
    render() {
        const settingsForm = (this.props.module.getSettingsForm) ? (this.props.module.getSettingsForm()) : (null);
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
                {
                    (settingsForm) ? (
                        <this.props.app.UI.Form>
                            {settingsForm}
                        </this.props.app.UI.Form>
                    ) : (
                        <div>
                            Nothing's there.
                        </div>
                    )
                }
            </div>
        );
    }
}