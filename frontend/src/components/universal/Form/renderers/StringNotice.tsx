import * as React from "react";

import { SimpleNode } from "../simpleNodes";

import {
    FormContext,
    NodeError,
    NodeStringSchema,
} from "../schemaTypes";

export default class StringNotice extends SimpleNode<string, NodeStringSchema> {
    getInitialValue() {
        return "null";
    }

    isOutputAvailable(): boolean {
        return false;
    }

    validateCustom(): Array<NodeError> {
        return [];
    }

    renderSimple(value: string, context: FormContext) {
        return (
            <div>
                {this.getSchema().value}
            </div>
        );
    }
}