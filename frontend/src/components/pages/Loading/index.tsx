import * as React from 'react';
import styled from 'styled-components';

import Page from 'components/Page';
import LoadingPanel from 'components/LoadingPanel';

import OmigostClient from '../../../client/OmigostClient';

export interface LoadingPageProps {
}

export default class LoadingPage extends React.Component<LoadingPageProps, undefined> {
    render() {
        
        const o = new OmigostClient('http://localhost/');
        o.callEndpoint('/', {}, (data) => {console.log(data);}, (data) => {console.log(data);});
        
        return (
            <Page>
                <LoadingPanel />
            </Page>
        );
    }
};