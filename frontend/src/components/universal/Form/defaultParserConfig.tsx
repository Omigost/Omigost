import { SchemaParserConfig } from "./schemaTypes";

import ObjectDefault from "./renderers/ObjectDefault";
import StringDefault from "./renderers/StringDefault";
import NoticeDefault from "./renderers/NoticeDefault";

export const defaultParserConfig: SchemaParserConfig = {
    handlers: {
        ROOT: {
            default: null,
        },
        STRING: {
            default: StringDefault,
            notice:  NoticeDefault,
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