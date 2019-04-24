import * as React from "react";

import { CompositeNode, ChildrenMap, NodeO } from "../compositeNodes";

import WithMargins from "./utils/WithMargins";
import WithDescription from "./utils/WithDescription";
import WithErrors from "./utils/WithErrors";

import {
    NodeArraySchema,
    FormContext,
    NodeOutputValue,
    NodeSchema,
} from "../schemaTypes";

export default class ArrayTuple<O, M extends NodeSchema> extends CompositeNode<Array<O>, M> {

    getChildrenMapFromSchema() {
        return { ...this.getSchema().items };
    }

    setValue(value: NodeOutputValue<Array<O>>) {
        if (this.getSchema().formatInput) {
            value = this.getSchema().formatInput(value);
        }
        value = this.getValueMapFromValue(value);
        
        Object.keys(this.getChildrenMapFromSchema()).forEach(key => {
            if (this.findChild(key)) {
                this.findChild(key).setValue(value[key]);
            }
        });
    }
    
    getCompositeOutput(output: NodeO) {
        const items = [];
        Object.keys(output).sort().forEach(key => items.push(output[key]));
        
        return items;
    }
    
    renderComposite(context: FormContext, children: ChildrenMap<React.ReactNode>): React.ReactNode {
        return (
            <WithMargins parent={this}>
                <WithErrors parent={this} context={context}>
                    <WithDescription parent={this}>
                        {Object.keys(children).map(key => children[key])}
                    </WithDescription>
                </WithErrors>
            </WithMargins>
        );
    }

}