import { SchemaParserConfig } from "./schemaTypes";

import ObjectDefault from "./renderers/ObjectDefault";

import StringColorPicker from "./renderers/StringColorPicker";
import StringDefault from "./renderers/StringDefault";
import StringNotice from "./renderers/StringNotice";
import StringHourTime from "./renderers/StringHourTime";

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
            notice:  StringNotice,
            colorPicker: StringColorPicker,
            hourTime: StringHourTime,
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