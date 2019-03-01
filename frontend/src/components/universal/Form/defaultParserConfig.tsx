import { SchemaParserConfig } from './schemaTypes';

import StringDefault from './renderers/StringDefault';
import ObjectDefault from './renderers/ObjectDefault';

export const defaultParserConfig: SchemaParserConfig = {
    renderers: {
        STRING: {
            default: StringDefault
        },
        OBJECT: {
            default: ObjectDefault
        }
    }
};