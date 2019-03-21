import * as React from "react";

import LoadingPanel from "components/LoadingPanel";
import Page from "components/Page";


export interface LoadingPageProps {
}

export default class LoadingPage extends React.Component<LoadingPageProps, undefined> {
    render() {

        /*
            const o = new OmigostClient("http://localhost/");
            o.callEndpoint("/", {}, (data) => {console.log(data);}, (data) => {console.log(data);});
        */

        return (
            <Page>
                <LoadingPanel />
            </Page>
        );
    }
}