import * as React from "react";
import styled from "styled-components";

import WithMargins from "./utils/WithMargins";
import WithDescription from "./utils/WithDescription";
import WithErrors from "./utils/WithErrors";

import TextInput from "../../TextInput";
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
            <WithMargins parent={this}>
                <WithErrors parent={this} context={context}>
                    <WithDescription parent={this}>
                        <TextInput
                            value={value}
                            onChange={(text) => {
                                this.setState({ value: text });
                            }}
                        />
                    </WithDescription>
                </WithErrors>
            </WithMargins>
        );
    }
}