import * as React from "react";

import { OmigostClientInterface, ResponseData, ResponsePromise } from "./OmigostClient";

export type RequestProducer = (client: OmigostClientInterface) => ResponsePromise;

export type RefreshCallback = (() => ResponsePromise) | ((request: RequestProducer) => ResponsePromise);

export interface ClientComponentChildrenArg {
    data: ResponseData;
    error: any;
    loading: boolean;
    client: OmigostClientInterface;
}

export interface ClientComponentProps {
    children: (result: ClientComponentChildrenArg, refresh: RefreshCallback) => React.ReactNode;
    request?: (client: OmigostClientInterface) => ResponsePromise;
}

export interface ClientComponentState {
    data: ResponseData;
    error: any;
    loading: boolean;
}

export abstract class ClientAbstractComponentNode extends React.Component<ClientComponentProps & {
    mutation?: boolean;
}, ClientComponentState> {
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

        makeRequest(forceRequest: boolean = false, promiseOverride: ResponsePromise = null) {

            if (this.state.loading) return;
            if (!forceRequest && (this.state.data || this.state.error)) return;

            const dataPromise = (promiseOverride) ? (promiseOverride) :(this.props.request(client));
            this.setState({
                loading: true,
            });

            return new Promise<ResponseData>((resolve, reject) => {
                dataPromise.then((data) => {
                    this.setState({
                        data,
                        error: null,
                        loading: false,
                    }, () => {
                        resolve(data);
                    });
                }).catch((error) => {
                    this.setState({
                        data: null,
                        error,
                        loading: false,
                    }, () => {
                        reject(error);
                    });
                });
            });
        }

        componentDidMount() {
            if (!this.props.mutation) {
                this.makeRequest();
            }
        }

        render() {

            let refreshFn: RefreshCallback = () => this.makeRequest(true);
            if (this.props.mutation) {
                refreshFn = (request: RequestProducer) => this.makeRequest(true, request(client));
            }

            return this.props.children({
                data: this.state.data,
                error: this.state.error,
                loading: this.state.loading,
                client,
            }, refreshFn);
        }
    };
};
