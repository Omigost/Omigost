import * as React from 'react';
import styled from 'styled-components';

import Page from 'components/Page';
import LoginPanel from 'components/LoginPanel';

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
};