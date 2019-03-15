import * as React from "react";

import {
    Node,
    NodeAny,
    NodeError,
    NodeHandler,
    NodeSchema,
    SchemaParserConfig,
} from "./schemaTypes";

export abstract class SimpleNodeHandler<V, M extends NodeSchema> extends NodeHandler<{ value: V, errors: Array<NodeError> }, V, M> {
    abstract getInitialValue(schemaNode: M, node: Node<{ value: V, errors: Array<NodeError> }, V, M>, parentNode: NodeAny, config: SchemaParserConfig): V;
    abstract renderSimple(schemaNode: M, value: V, node: Node<{ value: V, errors: Array<NodeError> }, V, M>, parentNode: NodeAny, config: SchemaParserConfig): React.ReactNode;

    resolveInitialState(schemaNode: M, node: Node<{ value: V, errors: Array<NodeError> }, V, M>, parentNode: NodeAny, config: SchemaParserConfig) {
        return {
            value: this.getInitialValue(schemaNode, node, parentNode, config),
            errors: [],
        };
    }

    getOutput(schemaNode: M, node: Node<{ value: V, errors: Array<NodeError> }, V, M>) {
        return node.state.value;
    }

    setErrors(errors: Array<NodeError>, schemaNode: NodeSchema, node: NodeAny) {
        node.setState({
            errors: errors || [],
        });
    }
    
    render(schemaNode: M, node: Node<{ value: V, errors: Array<NodeError> }, V, M>, parentNode: NodeAny, config: SchemaParserConfig) {
        return this.renderSimple(schemaNode, node.state.value, node, parentNode, config);
    }
}