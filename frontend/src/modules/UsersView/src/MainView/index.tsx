import * as React from "react";

import styled from "styled-components";

import TabUsers from "../TabUsers";
import TabAccounts from "../TabAccounts";

export default class MainView extends React.Component<any, undefined> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <this.props.app.UI.Tabs
                tabs={[
                    {
                        name: "Users",
                        content: () => (<TabUsers app={this.props.app} />)
                    },
                    {
                        name: "Accounts",
                        content: () => (<TabAccounts app={this.props.app} />)
                    }
                ]}
            />
        );
    }
}