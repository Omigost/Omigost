import * as React from "react";

import {
    NodeStringSchema,
    SchemaParserConfig,
    NodeSchema,
    NodeState,
    Node,
} from "../schemaTypes";

export default {
    resolveInitialState: () => {
        return {
            value: '',
        };
    },
    getOutput: (schemaNode: NodeSchema, node: Node) => {
        return node.state.value;
    },
    render: (schemaNode: NodeSchema, node: Node) => {
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
};