import * as React from "react";
import { Route } from "react-router";
import { withRouter } from "react-router-dom";

import AddUserView from "../AddUserView";
import CommunicationSettingsView from "../CommunicationSettingsView";
import MainView from "../MainView";

class Panel extends React.Component<any, any> {

    render() {
        return (
            <div>
                <Route
                    path={`${this.props.match.url}/users/add`}
                    component={(props) => (<AddUserView {...this.props} {...props} />)}
                />
                <Route
                    path={`${this.props.match.url}/users/:user/communication/:com`}
                    component={(props) => (<CommunicationSettingsView {...this.props} {...props} />)}
                />
                <Route
                    exact
                    path={`${this.props.match.url}/`}
                    component={(props) => (<MainView {...this.props} {...props} />)}
                />
            </div>
        );
    }
}

export default withRouter(Panel);