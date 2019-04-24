import * as React from "react";
import styled from "styled-components";

import WithMargins from "./utils/WithMargins";
import WithDescription from "./utils/WithDescription";
import WithErrors from "./utils/WithErrors";

import TextInput from "../../TextInput";
import { SimpleNode } from "../simpleNodes";

import {
    FormContext,
    NodeNumberSchema,
} from "../schemaTypes";

export default class NumberDefault extends SimpleNode<number, NodeNumberSchema> {
    getInitialValue() {
        return 0;
    }

    renderSimple(value: number, context: FormContext) {
        return (
            <WithMargins parent={this}>
                <WithErrors parent={this} context={context}>
                    <WithDescription parent={this}>
                        <TextInput
                            value={(value || 0).toString()}
                            onChange={(text) => {
                                this.setState({ value: parseFloat(text) });
                            }}
                        />
                    </WithDescription>
                </WithErrors>
            </WithMargins>
        );
    }
}