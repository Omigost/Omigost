import { CompositeNode, NodeO } from "../compositeNodes";

import WithMargins from "./utils/WithMargins";
import WithDescription from "./utils/WithDescription";
import WithErrors from "./utils/WithErrors";

import {
    NodeObjectSchema,
} from "../schemaTypes";

export default class ArrayTuple extends CompositeNode<NodeO, NodeObjectSchema> {

    getChildrenMapFromSchema() {
        return { ...this.getSchema().items };
    }

    setValue(value: NodeOutputValue<O>) {
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