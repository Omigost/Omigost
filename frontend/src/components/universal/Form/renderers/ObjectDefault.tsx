import * as React from "react";

import { ChildrenMap, CompositeNode, NodeO } from "../compositeNodes";

import WithDescription from "./utils/WithDescription";
import WithErrors from "./utils/WithErrors";
import WithMargins from "./utils/WithMargins";

import {
    FormContext,
    NodeObjectSchema,
} from "../schemaTypes";

export default class ObjectDefault extends CompositeNode<NodeO, NodeObjectSchema> {

    getChildrenMapFromSchema() {
        return this.getSchema().properties;
    }

    getCompositeOutput(output: NodeO) {
        return output;
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