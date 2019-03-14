import * as React from "react";

import {
    NodeObjectSchema,
    SchemaParserConfig,
    SchemaTreeResolver,
    NodeState,
    NodeSchema,
    Node,
} from "../schemaTypes";

export default {
    
    resolveInitialState: (schemaNode: NodeObjectSchema) => {
        const initialState = {};
        Object.keys(schemaNode.properties).forEach(key => {
            initialState[key] = null;
        });
        return initialState;
    },
    getOutput: (schemaNode: NodeObjectSchema, node: Node) => {
        const output = {};
        Object.keys(schemaNode.properties).forEach(key => {
            output[key] = node.findChild(key).getOutput();
        });
        return output;
    },
    resolveChildren: (schemaNode: NodeObjectSchema, node: Node, parentNode: Node, config: SchemaParserConfig, resolve: SchemaTreeResolver) => {
        return Object.keys(schemaNode.properties).map(key => {
            return {
                ...resolve(schemaNode.properties[key], {
                    ...node,
                    setState: (state: NodeState) => {
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
    render: (schemaNode: NodeObjectSchema, node: Node, parentNode: Node, config: SchemaParserConfig) => {
        return (
            <div>
                <b>Object keys</b>
                {
                    Object.keys(schemaNode.properties).map((key: string, index: number) => {
                        return (
                            <div key={`form-ui-${index}`} >
                                <b>key = {key}</b>
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