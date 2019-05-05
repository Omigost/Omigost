import * as React from "react";

import WithDescription from "./utils/WithDescription";
import WithErrors from "./utils/WithErrors";
import WithMargins from "./utils/WithMargins";

import TextInput from "../../TextInput";
import { SimpleNode } from "../simpleNodes";

import {
    FormContext,
    NodeStringSchema,
} from "../schemaTypes";

export default class StringPassword extends SimpleNode<string, NodeStringSchema> {
    resolveInitialState() {
        return {
            value: "",
            filled: false,
        };
    }
    
    getRawOutput() {
       if (this.getState().filled) {
           return null;
       }
       return this.getState().value;
    }
    
    setValue(value) {
        if (this.getSchema().formatInput) {
            value = this.getSchema().formatInput(value);
        }
        if (value !== null && typeof value !== "undefined") {
            this.setState({ value: null, filled: true });
        }
    }

    renderSimple(value: string, context: FormContext) {
        return (
            <WithMargins parent={this}>
                <WithErrors parent={this} context={context}>
                    <WithDescription parent={this}>
                        <TextInput
                            type="password"
                            value={(this.getState().filled) ? ("DUMMY123") : (value)}
                            onChange={(text) => {
                                this.setState({ value: text, filled: false });
                            }}
                        />
                    </WithDescription>
                </WithErrors>
            </WithMargins>
        );
    }
}