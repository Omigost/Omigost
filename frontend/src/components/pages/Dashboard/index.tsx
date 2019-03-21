import * as React from "react";

import DashboardPanel from "components/DashboardPanel";
import Page from "components/Page";

export interface DashboardPageProps {
}

export default class DashboardPage extends React.Component<DashboardPageProps, undefined> {
    render() {
        return (
            <Page type="fill">
                <DashboardPanel />
            </Page>
        );
    }
}