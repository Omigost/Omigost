import * as React from 'react';
import styled from 'styled-components';

import Page from 'components/Page';
import DashboardPanel from 'components/DashboardPanel';

export interface DashboardPageProps {
}

export default class DashboardPage extends React.Component<DashboardPageProps, undefined> {
    render() {
        return (
            <Page>
                <DashboardPanel />
            </Page>
        );
    }
};