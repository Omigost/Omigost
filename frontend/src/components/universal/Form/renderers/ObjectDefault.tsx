import { CompositeNodeHandler, NodeO } from "../compositeNodes";

import {
    NodeObjectSchema,
} from "../schemaTypes";

export default class ObjectDefault extends CompositeNodeHandler<NodeO, NodeObjectSchema> {

    getChildrenMapFromSchema(schemaNode: NodeObjectSchema) {
        return schemaNode.properties;
    }

    getCompositeOutput(output: NodeO) {
        return output;
    }

}