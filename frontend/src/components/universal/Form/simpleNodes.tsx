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

    setValue(value: NodeOutputValue<O>) {
        if (this.getSchema().formatInput) {
            value = this.getSchema().formatInput(value);
        }
        if (value !== null && typeof value !== 'undefined') {
            this.setState({ value });
        }
    }
    
    getRawOutput() {
        return this.getState().value;
    }

    render(context: FormContext) {
        return this.renderSimple(this.getState().value, context);
    }
}