import * as React from "react";

import {
    FormContext,
    Node,
    NodeAny,
    NodeOutputValue,
    NodeSchema,
    NodeState,
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

export abstract class CompositeNode<O, M extends NodeSchema> extends Node<NodeS, O, M> {

    abstract getChildrenMapFromSchema(): ChildrenMap<NodeSchema>;

    abstract getCompositeOutput(output: NodeO): NodeOutputValue<O>;

    renderComposite(context: FormContext, children: ChildrenMap<React.ReactNode>): React.ReactNode {
        return Object.keys(children).map(key => children[key]);
    }

    resolveInitialState() {
        const initialState = {};
        Object.keys(this.getChildrenMapFromSchema()).forEach(key => {
            initialState[key] = null;
        });
        return initialState;
    }

    getRawOutput() {
        const output = {};
        Object.keys(this.getChildrenMapFromSchema()).forEach(key => {
            if (this.findChild(key).isOutputAvailable()) {
                output[key] = this.findChild(key).getOutput();
            }
        });
        return this.getCompositeOutput(output);
    }

    onChildStateChanged(state: NodeState<any>, source: NodeAny, originalSource?: NodeAny) {
        this.setState({
            [source.getTag()]: state,
        });
    }

    resolveChildren() {
        const childrenMap: ChildrenMap<NodeSchema> = this.getChildrenMapFromSchema();

        return Object.keys(childrenMap).map(key => {
            const child = this.resolveNode(childrenMap[key], this, this.getConfig());
            child.setTag(key);
            return child;
        });
    }

    render(context: FormContext): React.ReactNode {
        const childrenMap: ChildrenMap<React.ReactNode> = {};

        Object.keys(this.getChildrenMapFromSchema()).forEach((key: string, index: number) => {
            childrenMap[key] = this.findChild(key).render(context);
        });

        return this.renderComposite(context, childrenMap);
    }
}