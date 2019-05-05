import { SchemaParserConfig } from "./schemaTypes";

import ObjectDefault from "./renderers/ObjectDefault";

import StringColorPicker from "./renderers/StringColorPicker";
import StringDefault from "./renderers/StringDefault";
import StringPassword from "./renderers/StringPassword";
import StringEnum from "./renderers/StringEnum";
import StringHourTime from "./renderers/StringHourTime";
import StringNotice from "./renderers/StringNotice";

import ArrayDefault from "./renderers/ArrayDefault";
import ArrayTuple from "./renderers/ArrayTuple";

import NumberDefault from "./renderers/NumberDefault";
import NumberSlider from "./renderers/NumberSlider";

import BooleanDefault from "./renderers/BooleanDefault";

export const defaultParserConfig: SchemaParserConfig = {
    handlers: {
        ROOT: {
            default: null,
        },
        STRING: {
            default: StringDefault,
            password: StringPassword,
            notice:  StringNotice,
            colorPicker: StringColorPicker,
            hourTime: StringHourTime,
            enum: StringEnum,
        },
        OBJECT: {
            default: ObjectDefault,
        },
        NUMBER: {
            default: NumberDefault,
            slider: NumberSlider,
        },
        BOOLEAN: {
            default: BooleanDefault,
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