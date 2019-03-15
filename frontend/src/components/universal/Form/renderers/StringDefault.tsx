import * as React from "react";

import {
    NodeStringSchema,
    SchemaParserConfig,
    NodeSchema,
    NodeHandler,
    NodeState,
    Node,
} from "../schemaTypes";

type NodeS = {
    value: string;
};

type NodeO = string;

type NodeSelf = Node<NodeS, NodeO, NodeStringSchema>;

const handler: NodeHandler<NodeS, NodeO, NodeStringSchema> = {
    resolveInitialState: () => {
        return {
            value: '',
        };
    },
    getOutput: (schemaNode: NodeSchema, node: NodeSelf) => {
        return node.state.value;
    },
    render: (schemaNode: NodeSchema, node: NodeSelf) => {
        return (
            <div>
                {schemaNode.title}
                {schemaNode.description}
                <input
                    value={node.state.value}
                    onChange={(event) => {
                        node.setState({
                            ...node.state,
                            value: event.target.value || '',
                        });
                    }}
                />
            </div>
        );
    },
}

export default handler;