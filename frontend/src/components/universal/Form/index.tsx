import * as React from "react";
import styled  from "styled-components";

import { transformSchemaIntoTree } from "./schemaParser";
import { NodeAny, RootNode, NodeState, NodeType, Schema } from "./schemaTypes";

const Wrapper = styled.div`
  width: 100%;
`;

export interface FormProps {
    fontSize?: string;
    theme?: any;
}

interface FormState {
    tree: RootNode;
}

export default class Form extends React.Component<FormProps, FormState> {

    state: FormState;

    constructor(props) {
        super(props);

        this.state = {
            tree: null,
        };
    }

    componentWillUpdate() {
        /*setTimeout(() => {
            if(this.state.tree) this.state.tree.validate();
        }, 3000);*/
    }
    
    handleFormStateUpdate(state: NodeState<any>, root: RootNode) {
        console.error("TREE HERE!");
        console.log(root.getOutput());
        
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
                    minLength: 1,
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
                    rootSetState: (state: NodeState<any>, root: RootNode) => this.handleFormStateUpdate(state, root),
                    rootState: {},
                });
                
                this.setState({
                    tree,
                });
            }, 0);
        }
    }

    componentDidMount() {
        this.createTree();
    }

    render() {
        this.createTree();

        return (
            <Wrapper>
                {(this.state.tree) ? (this.state.tree.render()) :(null)}
            </Wrapper>
        );
    }
}