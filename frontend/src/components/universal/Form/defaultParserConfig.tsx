import { SchemaParserConfig } from "./schemaTypes";

import ObjectDefault from "./renderers/ObjectDefault";
import StringDefault from "./renderers/StringDefault";
import NoticeDefault from "./renderers/NoticeDefault";
import StringColorPicker from "./renderers/StringColorPicker";

import ArrayDefault from "./renderers/ArrayDefault";
import ArrayTuple from "./renderers/ArrayTuple";

import NumberDefault from "./renderers/NumberDefault";
import NumberSlider from "./renderers/NumberSlider";

export const defaultParserConfig: SchemaParserConfig = {
    handlers: {
        ROOT: {
            default: null,
        },
        STRING: {
            default: StringDefault,
            notice:  NoticeDefault,
            colorPicker: StringColorPicker,
        },
        OBJECT: {
            default: ObjectDefault,
        },
        NUMBER: {
            default: NumberDefault,
            slider: NumberSlider,
        },
        ARRAY: {
            default: ArrayDefault,
            tuple: ArrayTuple,
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