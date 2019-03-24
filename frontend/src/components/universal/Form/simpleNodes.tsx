import * as React from "react";

import {
    Node,
    NodeAny,
    NodeHandler,
    NodeSchema,
    SchemaParserConfig,
} from "./schemaTypes";

export abstract class SimpleNodeHandler<V, M extends NodeSchema> extends NodeHandler<{ value: V }, V, M> {
    abstract getInitialValue(schemaNode: M, node: Node<{ value: V }, V, M>, parentNode: NodeAny, config: SchemaParserConfig): V;
    abstract renderSimple(schemaNode: M, value: V, node: Node<{ value: V }, V, M>, parentNode: NodeAny, config: SchemaParserConfig): React.ReactNode;

    resolveInitialState(schemaNode: M, node: Node<{ value: V }, V, M>, parentNode: NodeAny, config: SchemaParserConfig) {
        return {
            value: this.getInitialValue(schemaNode, node, parentNode, config),
        };
    }

    getOutput(schemaNode: M, node: Node<{ value: V }, V, M>) {
        return node.state.value;
    }

    render(schemaNode: M, node: Node<{ value: V }, V, M>, parentNode: NodeAny, config: SchemaParserConfig) {
        return this.renderSimple(schemaNode, node.state.value, node, parentNode, config);
    }
}