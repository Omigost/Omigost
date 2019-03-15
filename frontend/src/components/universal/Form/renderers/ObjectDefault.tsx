import * as React from "react";

import {
    NodeObjectSchema,
    SchemaParserConfig,
    SchemaTreeResolver,
    NodeState,
    NodeOutputValue,
    NodeSchema,
    NodeHandler,
    Node,
    NodeAny,
} from "../schemaTypes";

type NodeS = {
    [key: string]: NodeState<any>;
};

type NodeO = {
    [key: string]: NodeOutputValue<any>;
};

type NodeSelf = Node<NodeS, NodeO, NodeObjectSchema>;

const handler: NodeHandler<NodeS, NodeO, NodeObjectSchema> = {
    
    resolveInitialState: (schemaNode: NodeObjectSchema) => {
        const initialState = {};
        Object.keys(schemaNode.properties).forEach(key => {
            initialState[key] = null;
        });
        return initialState;
    },
    getOutput: (schemaNode: NodeObjectSchema, node: NodeSelf) => {
        const output = {};
        Object.keys(schemaNode.properties).forEach(key => {
            output[key] = node.findChild(key).getOutput();
        });
        return output;
    },
    resolveChildren: (schemaNode: NodeObjectSchema, node: NodeSelf, parentNode: NodeAny, config: SchemaParserConfig, resolve: SchemaTreeResolver) => {
        return Object.keys(schemaNode.properties).map(key => {
            return {
                ...resolve(schemaNode.properties[key], {
                    ...node,
                    setState: (state: NodeState<any>) => {
                        node.setState({
                            ...node.state,
                            [key]: state,
                        })
                    },
                }, config),
                tag: key,
            };
        });
    },
    render: (schemaNode: NodeObjectSchema, node: NodeSelf, parentNode: NodeAny, config: SchemaParserConfig) => {
        return (
            <div>
                {
                    Object.keys(schemaNode.properties).map((key: string, index: number) => {
                        return (
                            <div key={`form-ui-${index}`} >
                                {
                                    node.findChild(key).render()
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    },
};

export default handler;