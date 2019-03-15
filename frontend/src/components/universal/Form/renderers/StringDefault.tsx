import * as React from "react";

import { SimpleNodeHandler } from "../simpleNodes";

import {
    NodeAny,
    NodeSchema,
    NodeStringSchema,
} from "../schemaTypes";

export default class StringDefault extends SimpleNodeHandler<string, NodeStringSchema> {
    getInitialValue() {
        return "";
    }
    
    renderSimple(schemaNode: NodeSchema, value: string, node: NodeAny) {
        return (
            <div>
                {schemaNode.title}
                {schemaNode.description}
                {node.state.errors.map(error => {
                    return (
                        <div>
                            Error:
                            {error.message}
                        </div>
                    );
                })}
                <input
                    value={value}
                    onChange={(event) => {
                        node.setState({
                            value: event.target.value || "",
                        });
                    }}
                />
            </div>
        );
    }
}