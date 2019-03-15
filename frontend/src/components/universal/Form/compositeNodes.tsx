import * as React from "react";

import {
    Node,
    NodeAny,
    NodeHandler,
    NodeOutputValue,
    NodeSchema,
    NodeState,
    SchemaParserConfig,
    SchemaTreeResolver,
} from "./schemaTypes";

export type NodeS = {
    [key: string]: NodeState<any>;
};

export type NodeO = {
    [key: string]: NodeOutputValue<any>;
};

export type ChildrenMap<T> = {
    [key: string]: T;
};

export abstract class CompositeNodeHandler<O, M extends NodeSchema> extends NodeHandler<NodeS, O, M> {

    abstract getChildrenMapFromSchema(schemaNode: M): ChildrenMap<NodeSchema>;

    abstract getCompositeOutput(output: NodeO, schemaNode: M, node: Node<NodeS, O, M>): NodeOutputValue<O>;

    renderComposite(children: ChildrenMap<React.ReactNode>, schemaNode: M, node: Node<NodeS, O, M>, parentNode: NodeAny, config: SchemaParserConfig) {
        return Object.values(children);
    }

    resolveInitialState(schemaNode: M) {
        const initialState = {};
        Object.keys(this.getChildrenMapFromSchema(schemaNode)).forEach(key => {
            initialState[key] = null;
        });
        return initialState;
    }

    getOutput(schemaNode: M, node: Node<NodeS, O, M>) {
        const output = {};
        Object.keys(this.getChildrenMapFromSchema(schemaNode)).forEach(key => {
            output[key] = node.findChild(key).getOutput();
        });
        return this.getCompositeOutput(output, schemaNode, node);
    }

    resolveChildren(schemaNode: M, node: Node<NodeS, O, M>, parentNode: NodeAny, config: SchemaParserConfig, resolve: SchemaTreeResolver) {
        const childrenMap: ChildrenMap<NodeSchema> = this.getChildrenMapFromSchema(schemaNode);

        return Object.keys(childrenMap).map(key => {
            return {
                ...resolve(childrenMap[key], {
                    ...node,
                    setState: (state: NodeState<any>) => {
                        node.setState({
                            ...node.state,
                            [key]: state,
                        });
                    },
                }, config),
                tag: key,
            };
        });
    }

    render(schemaNode: M, node: Node<NodeS, O, M>, parentNode: NodeAny, config: SchemaParserConfig) {
        const childrenMap: ChildrenMap<React.ReactNode> = {};

        Object.keys(this.getChildrenMapFromSchema(schemaNode)).forEach((key: string, index: number) => {
            childrenMap[key] = node.findChild(key).render();
        });

        return this.renderComposite(childrenMap, schemaNode, node, parentNode, config);
    }
}