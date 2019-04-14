import * as React from "react";
import styled  from "styled-components";

import Button from "../Button";
import { transformSchemaIntoTree } from "./schemaParser";
import { FormContext, NodeAny, NodeState, RootNode, Schema } from "./schemaTypes";

const Wrapper = styled.div`
  width: 100%;
`;

export interface FormProps {
    fontSize?: string;
    theme?: any;
    validateOnChange?: boolean;
    validateOnInit?: boolean;
    children: Schema;
    onSubmit: (data: any) => void;
    submitButton?: any;
}

interface FormState {
    tree: RootNode;
    formContext: FormContext;
}

export default class Form extends React.Component<FormProps, FormState> {

    state: FormState;

    constructor(props) {
        super(props);

        this.state = {
            tree: null,
            formContext: {
                errors: [],
                getErrorsForNode: () => [],
            },
        };
    }

    handleFormStateUpdate(state: NodeState<any>, root: RootNode) {
        this.setState({
            tree: root,
        }, () => {
            if (this.props.validateOnChange !== false) {
                this.state.tree.validate();
            }
        });
    }

    handleFormContextUpdate(context: FormContext, source: NodeAny) {
        this.setState({
            formContext: {
                ...this.state.formContext,
                ...context,
            },
        });
    }

    handleFormContextMapping(fn: (context: FormContext) => FormContext, source: NodeAny) {
        this.handleFormContextUpdate(fn(this.state.formContext), source);
    }

    createTree() {
        const schema = this.props.children;

        if (!this.state.tree) {
            setTimeout(() => {
                const tree = transformSchemaIntoTree(schema, null, {
                    rootSetState: (state: NodeState<any>, root: RootNode) => this.handleFormStateUpdate(state, root),
                    rootSetContext: (context: FormContext, source: NodeAny) => this.handleFormContextUpdate(context, source),
                    rootModifyContext: (fn: (context: FormContext) => FormContext, source: NodeAny) => this.handleFormContextMapping(fn, source),
                    rootState: {},
                });

                this.setState({
                    tree,
                }, () => {
                    if (this.props.validateOnInit !== false) {
                        this.state.tree.validate();
                    }
                });
            });
        }
    }

    componentDidMount() {
        this.createTree();
    }

    render() {
        this.createTree();

        return (
            <Wrapper>
                {(this.state.tree) ? (this.state.tree.render(this.state.formContext)) : (null)}
                {
                    (this.state.tree && this.props.onSubmit) ? (
                        <div
                            style={{
                                marginLeft: "-2vw",
                            }}
                        >
                            <Button
                                onClick={() => {
                                    if (this.state.tree && this.props.onSubmit) {
                                        this.props.onSubmit(this.state.tree.getData());
                                    }
                                }}
                            >
                                {this.props.submitButton || "Save"}
                            </Button>
                        </div>
                    ) :(null)
                }
            </Wrapper>
        );
    }
}
