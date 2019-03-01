import * as React from "react";

import {
    NodeStringSchema,
    SchemaParserConfig,
    TreeUITransformer,
} from "../schemaTypes";

export default {
    render: (node: NodeStringSchema, transformer: TreeUITransformer, config: SchemaParserConfig) => {
        return (
            <div>
                {node.title}
                {node.description}
            </div>
        );
    },
};