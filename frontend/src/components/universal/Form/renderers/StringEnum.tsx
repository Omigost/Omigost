import * as React from "react";

import WithDescription from "./utils/WithDescription";
import WithErrors from "./utils/WithErrors";
import WithMargins from "./utils/WithMargins";

import Select from "../../Select";
import { SimpleNode } from "../simpleNodes";

import {
    FormContext,
    NodeStringSchema,
} from "../schemaTypes";

export default class StringEnum extends SimpleNode<string, NodeStringSchema> {
    getInitialValue() {
        return "";
    }

    renderSimple(value: string, context: FormContext) {
        const enumLabels = this.getSchema().enumLabels || null;
        const enumOpts = (this.getSchema().enum || []).map(value => {
            let oLabel = value;
            let oVal = value;

            if (enumLabels) {
                const lbSpec = enumLabels.find(opt => opt.name === value);
                if (lbSpec) {
                    oLabel = lbSpec.label;
                    oVal = lbSpec.name || value;
                }
            }

            return ({
                name: oVal,
                label: oLabel,
            });
        });

        const selectedValue = enumOpts.find(opt => opt.name === value) || null;
        return (
            <WithMargins parent={this}>
                <WithErrors parent={this} context={context}>
                    <WithDescription parent={this}>
                        <Select
                            value={selectedValue}
                            options={enumOpts}
                            onChange={(option) => {
                                this.setState({ value: option.name });
                            }}
                        />
                    </WithDescription>
                </WithErrors>
            </WithMargins>
        );
    }
}