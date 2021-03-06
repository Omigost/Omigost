import * as React from "react";
import { Route } from "react-router";
import { withRouter } from "react-router-dom";

import AddBudgetView from "../AddBudgetView";
import MainView from "../MainView";

class Panel extends React.Component<any, any> {

    render() {
        return (
            <div>
                <Route path={`${this.props.match.url}/budgets/add`} component={(props) => (<AddBudgetView {...this.props} {...props} />)} />
                <Route exact path={`${this.props.match.url}/`} component={(props) => (<MainView {...this.props} {...props} />)} />
            </div>
        );
    }
}

export default withRouter(Panel);