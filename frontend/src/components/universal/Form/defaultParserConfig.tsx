import { SchemaParserConfig } from "./schemaTypes";

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
    rootSetState: () => {},
    rootSetContext: () => {},
    rootModifyContext: () => {},
    uidGenerator: null,
    uidGeneratorFactory: () => {
        let uid = 0;
        return () => {
            ++uid;
            return uid;
        };
    },
};