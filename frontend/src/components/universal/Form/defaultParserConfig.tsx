import { NodeAny, NodeState, SchemaParserConfig } from "./schemaTypes";

import ObjectDefault from "./renderers/ObjectDefault";
import StringDefault from "./renderers/StringDefault";

export const defaultParserConfig: SchemaParserConfig = {
    handlers: {
        ROOT: {
            default: null,
        },
        STRING: {
            default: new StringDefault(),
        },
        OBJECT: {
            default: new ObjectDefault(),
        },
    },
    rootState: null,
    rootSetState: (state: NodeState<any>, root: NodeAny) => {},
};