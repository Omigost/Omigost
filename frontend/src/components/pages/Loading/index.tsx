import * as React from 'react';
import styled from 'styled-components';

import Page from 'components/Page';
import LoadingPanel from 'components/LoadingPanel';

export interface LoadingPageProps {
}

export default class LoadingPage extends React.Component<LoadingPageProps, undefined> {
    render() {
        return (
            <Page>
                <LoadingPanel />
            </Page>
        );
    }
};