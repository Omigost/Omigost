import * as React from "react";

import WithDescription from "./utils/WithDescription";
import WithErrors from "./utils/WithErrors";
import WithMargins from "./utils/WithMargins";

import ColorPicker from "../../ColorPicker";
import { SimpleNode } from "../simpleNodes";

import {
    FormContext,
    NodeStringSchema,
} from "../schemaTypes";

export default class StringColorPicker extends SimpleNode<string, NodeStringSchema> {
    getInitialValue() {
        return "";
    }

    renderSimple(value: string, context: FormContext) {
        return (
            <WithMargins parent={this}>
                <WithErrors parent={this} context={context}>
                    <WithDescription parent={this}>
                        <ColorPicker
                            value={value}
                            onChangeComplete={({ hex }) => {
                                this.setState({ value: hex });
                            }}
                        />
                    </WithDescription>
                </WithErrors>
            </WithMargins>
        );
    }
}