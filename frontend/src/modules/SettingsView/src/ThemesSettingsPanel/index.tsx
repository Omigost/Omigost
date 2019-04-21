import * as React from "react";

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
                                    HELLO!
                                </div>
                            </div>
                        );
                    }
                />
            </div>
        );
    }
}

export default withRouter(ThemesSettingsPanel);