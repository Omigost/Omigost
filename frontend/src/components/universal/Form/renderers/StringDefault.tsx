import * as React from "react";

import { SimpleNode } from "../simpleNodes";

import {
    FormContext,
    NodeStringSchema,
} from "../schemaTypes";

export default class StringDefault extends SimpleNode<string, NodeStringSchema> {
    getInitialValue() {
        return "";
    }

    renderSimple(value: string, context: FormContext) {
        return (
            <div>
                <span>
                    {context.getErrorsForNode(this).map(err => {
                        return (
                            <div>
                                -> {err.message}
                            </div>
                        );
                    })}
                </span>
                {this.getSchema().title}
                {this.getSchema().description}
                <input
                    value={value}
                    onChange={(event) => {
                        this.setState({
                            value: event.target.value || "",
                        });
                    }}
                />
            </div>
        );
    }
}