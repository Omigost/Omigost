import * as React from "react";
import styled  from "styled-components";

import { transformSchemaIntoTree } from "./schemaParser";
import { NodeAny, NodeState, NodeType, Schema } from "./schemaTypes";

const Wrapper = styled.div`
  width: 100%;
`;

export interface FormProps {
    fontSize?: string;
    theme?: any;
}

interface FormState {
    tree: NodeAny;
}

export default class Form extends React.Component<FormProps, FormState> {

    state: FormState;

    constructor(props) {
        super(props);

        this.state = {
            tree: null,
        };
    }

    handleFormStateUpdate(state: NodeState<any>, root: NodeAny) {
        this.setState({
            tree: root,
        });
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
                },
                "lastName": {
                    type: NodeType.STRING,
                    title: "Your last name",
                },
            },
        };

        if (!this.state.tree) {
            setTimeout(() => {
                const tree = transformSchemaIntoTree(schema, null, {
                    rootSetState: (state: NodeState<any>, root: NodeAny) => this.handleFormStateUpdate(state, root),
                    rootState: {},
                });

                this.setState({
                    tree,
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
                {(this.state.tree) ? (this.state.tree.render()) : (null)}
            </Wrapper>
        );
    }
}
