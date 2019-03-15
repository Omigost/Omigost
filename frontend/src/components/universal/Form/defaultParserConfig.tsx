import { SchemaParserConfig, NodeState, NodeAny } from "./schemaTypes";

import ObjectDefault from "./renderers/ObjectDefault";
import StringDefault from "./renderers/StringDefault";

export const defaultParserConfig: SchemaParserConfig = {
    handlers: {
        ROOT: {
            default: null,
        },
        STRING: {
            default: StringDefault,
        },
        OBJECT: {
            default: ObjectDefault,
        },
    },
    rootState: null,
    rootSetState: (state: NodeState<any>, root: NodeAny) => {},
};