import * as React from "react";

import WithDescription from "./utils/WithDescription";
import WithErrors from "./utils/WithErrors";
import WithMargins from "./utils/WithMargins";

import HourPicker from "../../HourPicker";
import { SimpleNode } from "../simpleNodes";

import {
    FormContext,
    NodeStringSchema,
} from "../schemaTypes";

export default class StringHourTime extends SimpleNode<string, NodeStringSchema> {
    getInitialValue() {
        return "12:00";
    }

    renderSimple(value: string, context: FormContext) {

        // FIXME: Remove the try-catch there
        const hourValue = {
            hours: 12,
            minutes: 0,
        };

        try {
            const valueTokens = value.split(";");
            hourValue.hours = parseInt(valueTokens[0]);
            hourValue.minutes = parseInt(valueTokens[1]);
        } catch(e) {
            // Do nothing
        }

        return (
            <WithMargins parent={this}>
                <WithErrors parent={this} context={context}>
                    <WithDescription parent={this}>
                        <HourPicker
                            value={hourValue}
                            onChange={(value) => {
                                this.setState({ value: `${value.hours}:${value.minutes}` });
                            }}
                        />
                    </WithDescription>
                </WithErrors>
            </WithMargins>
        );
    }
}