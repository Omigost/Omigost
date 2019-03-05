import * as React from "react";

import LoginPanel from "components/LoginPanel";
import Page from "components/Page";

export interface LoginPageProps {
}

export default class LoginPage extends React.Component<LoginPageProps, undefined> {
    render() {
        return (
            <Page>
                <LoginPanel />
            </Page>
        );
    }
}