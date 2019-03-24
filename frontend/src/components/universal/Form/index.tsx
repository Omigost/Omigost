import * as React from "react";
import styled  from "styled-components";

import { transformSchemaIntoTree } from "./schemaParser";
import { FormContext, NodeAny, NodeState, NodeType, RootNode, Schema } from "./schemaTypes";

const Wrapper = styled.div`
  width: 100%;
`;

export interface FormProps {
    fontSize?: string;
    theme?: any;
    validateOnChange?: boolean;
    validateOnInit?: boolean;
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
        const schema: Schema = {
            title: "A registration form",
            description: "The description",
            type: NodeType.OBJECT,
            properties: {
                "firstName": {
                    type: NodeType.STRING,
                    title: "Your first name",
                    minLength: 1,
                },
                "lastName": {
                    type: NodeType.STRING,
                    title: "Your last name",
                    minLength: 4,
                },
            },
        };

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
            </Wrapper>
        );
    }
}
