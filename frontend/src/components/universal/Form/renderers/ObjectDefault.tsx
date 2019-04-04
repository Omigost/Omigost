import { CompositeNode, NodeO } from "../compositeNodes";

import {
    NodeObjectSchema,
} from "../schemaTypes";

export default class ObjectDefault extends CompositeNode<NodeO, NodeObjectSchema> {

    getChildrenMapFromSchema() {
        return this.getSchema().properties;
    }

    getCompositeOutput(output: NodeO) {
        return output;
    }

}