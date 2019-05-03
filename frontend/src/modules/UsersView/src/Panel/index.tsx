import * as React from "react";
import { Route } from "react-router";
import { withRouter } from "react-router-dom";

import AddUserView from "../AddUserView";
import CommunicationSettingsView from "../CommunicationSettingsView";
import MainView from "../MainView";

class Panel extends React.Component<any, any> {

    render() {
        const { app } = this.props;
        return (
            <div>
                <Route
                    path={`${this.props.match.url}/users/add`}
                    component={(props) => (<AddUserView {...this.props} {...props} />)}
                />
                <Route
                    path={`${this.props.match.url}/users/edit/:userID`}
                    component={(props) => (
                        <app.client.component
                            request={(client) => client.getUsers()}
                        >
                            {({data, error, loading}, refresh) => {
                                if (loading || !data) return null;
                                let userToEdit = data.find(user => parseInt(user.id) === parseInt(props.match.params.userID));
                                if (userToEdit) {
                                    userToEdit.accounts = (userToEdit.accounts || []).map(account => account.name)
                                }
                                
                                return (
                                    <AddUserView
                                        userEditMode
                                        userToEdit={userToEdit}
                                        {...this.props}
                                        {...props}
                                    />
                                );
                            }}
                        </app.client.component>
                    )}
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