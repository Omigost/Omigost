import * as React from "react";
import defaultTheme from "themes/default";

import Page from "components/Page";
import RequestLimitsForm from "pages/BudgetLimitRequestPage/RequestLimitsForm";
import {ThemeProvider} from "styled-components";

export interface BudgetLimitRequestPageProps {
}

export default class RequestLimitsPage extends React.Component<BudgetLimitRequestPageProps, undefined> {
    render() {
        return (
            <ThemeProvider theme={defaultTheme}>
                <Page type="fill">
                    <RequestLimitsForm />
                </Page>
            </ThemeProvider>
        );
    }
}