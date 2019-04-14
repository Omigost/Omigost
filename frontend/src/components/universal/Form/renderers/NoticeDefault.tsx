import * as React from "react";
import styled from "styled-components";

import { SimpleNode } from "../simpleNodes";

import {
    FormContext,
    NodeNoticeSchema,
} from "../schemaTypes";

export default class NoticeDefault extends SimpleNode<string, NodeNoticeSchema> {
    getInitialValue() {
        return "null";
    }

    isOutputAvailable(): boolean {
        return true;
    }

    renderSimple(value: string, context: FormContext) {
        return (
            <div>
                {this.getSchema().value}
            </div>
        );
    }
}