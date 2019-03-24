import * as React from "react";

import { OmigostClientInterface, ResponsePromise, ResponseData } from "./OmigostClient";

export type RefreshCallback = () => void;

export interface ClientComponentChildrenArg {
    data: ResponseData;
    error: any;
    loading: boolean;
};

export interface ClientComponentProps {
    children: (result: ClientComponentChildrenArg, refresh: RefreshCallback) => React.ReactNode;
    request: (client: OmigostClientInterface) => ResponsePromise;
}

export interface ClientComponentState {
    data: ResponseData;
    error: any;
    loading: boolean;
}

export abstract class ClientAbstractComponentNode extends React.Component<ClientComponentProps, ClientComponentState> {
}

export interface ClientAbstractComponent {
    new(props: any): ClientAbstractComponentNode;
}

export default (client: OmigostClientInterface): ClientAbstractComponent => {
    return class extends ClientAbstractComponentNode {
        
        state: ClientComponentState;
        
        constructor(props) {
            super(props);
            
            this.state = {
                data: null,
                error: null,
                loading: false,
            };
        }
        
        makeRequest(forceRequest?: boolean) {
            
            if (this.state.loading) return;
            if (!forceRequest && (this.state.data || this.state.error)) return;
            
            const dataPromise = this.props.request(client);
            this.setState({
                loading: true,
            });
            
            dataPromise.then((data) => {
                console.log("GOT DATA");
                console.log(data);
                this.setState({
                    data,
                    error: null,
                    loading: false,
                });
            }).catch((error) => {
                console.log("ERRORR 69 HEHE");
                console.log(error);
                this.setState({
                    data: null,
                    error,
                    loading: false,
                });
            });
        }
        
        componentDidMount() {
            this.makeRequest();
        }
        
        render() {
            return this.props.children({
                data: this.state.data,
                error: this.state.error,
                loading: this.state.loading,
            }, () => this.makeRequest(true));
        }
    };
};
