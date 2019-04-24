import * as React from "react";
import styled from "styled-components";

import WithMargins from "./utils/WithMargins";
import WithDescription from "./utils/WithDescription";
import WithErrors from "./utils/WithErrors";

import Slider from "../../Slider";
import { SimpleNode } from "../simpleNodes";

import {
    FormContext,
    NodeNumberSchema,
} from "../schemaTypes";

export default class NumberSlider extends SimpleNode<number, NodeNumberSchema> {
    getInitialValue() {
        return 0;
    }

    renderSimple(value: number, context: FormContext) {
        return (
            <WithMargins parent={this}>
                <WithErrors parent={this} context={context}>
                    <WithDescription parent={this}>
                        <Slider
                            value={parseFloat(value.toString()) || 0}
                            min={this.getSchema().minimum || 0}
                            max={this.getSchema().maximum || 100}
                            onChange={(value) => {
                                this.setState({ value: parseFloat(value.toString()) });
                            }}
                        />
                    </WithDescription>
                </WithErrors>
            </WithMargins>
        );
    }
}