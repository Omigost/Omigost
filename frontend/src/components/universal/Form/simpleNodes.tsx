import * as React from "react";

import {
    FormContext,
    Node,
    NodeSchema,
} from "./schemaTypes";

export abstract class SimpleNode<V, M extends NodeSchema> extends Node<{ value: V }, V, M> {

    abstract getInitialValue(): V;
    abstract renderSimple(value: V, context: FormContext): React.ReactNode;

    resolveInitialState() {
        return {
            value: this.getInitialValue(),
        };
    }

    getRawOutput() {
        return this.getState().value;
    }

    render(context: FormContext) {
        return this.renderSimple(this.getState().value, context);
    }
}