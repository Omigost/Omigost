import * as React from "react";
import styled from "styled-components";

import TextInput from "../../TextInput";
import { SimpleNode } from "../simpleNodes";

import {
    FormContext,
    NodeStringSchema,
} from "../schemaTypes";

const InputWrapper = styled.div`
  width: 10vw;
  margin-right: 3vw;
`;

export default class StringDefault extends SimpleNode<string, NodeStringSchema> {
    getInitialValue() {
        return "";
    }

    renderSimple(value: string, context: FormContext) {
        return (
            <div>
                {this.getSchema().title}
                {this.getSchema().description}
                <InputWrapper>
                    <TextInput
                        value={value}
                        onChange={(text) => {
                            this.setState({ value: text });
                        }}
                    />
                </InputWrapper>
            </div>
        );
    }
}