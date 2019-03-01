import { SchemaParserConfig } from "./schemaTypes";

import ObjectDefault from "./renderers/ObjectDefault";
import StringDefault from "./renderers/StringDefault";

export const defaultParserConfig: SchemaParserConfig = {
    renderers: {
        STRING: {
            default: StringDefault,
        },
        OBJECT: {
            default: ObjectDefault,
        },
    },
};