import * as React from "react";

import WithDescription from "./utils/WithDescription";
import WithErrors from "./utils/WithErrors";
import WithMargins from "./utils/WithMargins";

import Checkbox from "../../Checkbox";
import { SimpleNode } from "../simpleNodes";

import {
    FormContext,
    NodeBooleanSchema,
} from "../schemaTypes";

export default class BooleanDefault extends SimpleNode<boolean, NodeBooleanSchema> {
    getInitialValue() {
        return false;
    }

    renderSimple(value: boolean, context: FormContext) {
        return (
            <WithMargins parent={this}>
                <WithErrors parent={this} context={context}>
                    <WithDescription parent={this}>
                        <Checkbox
                            checked={value}
                            onChange={(value) => {
                                this.setState({ value });
                            }}
                        />
                    </WithDescription>
                </WithErrors>
            </WithMargins>
        );
    }
}