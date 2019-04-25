import * as React from "react";

import { withTheme } from "styled-components";

import { Route } from "react-router";
import { withRouter } from "react-router-dom";


class NotificationsSettingsPanel extends React.Component<any, undefined> {
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
                                            name: "Notifications",
                                        },
                                    ]}
                                </this.props.app.UI.Breadcrumbs>
                                <div>
                                    <this.props.app.UI.Form
                                        submitButton="Save settings"
                                        onSubmit={(data) => {
                                            this.props.onGoBack();
                                        }}
                                    >
                                        {{
                                            title: "Configure users",
                                            description: "Notifications",
                                            type: "object",
                                            properties: {
                                                "limit": {
                                                    type: "string",
                                                    ui: "hourTime",
                                                    title: "Notification interval",
                                                    description: "Send notifications if there's a michne that is running after the certain hour passes",
                                                },
                                            },
                                        }}
                                    </this.props.app.UI.Form>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}

export default withTheme(withRouter(NotificationsSettingsPanel));