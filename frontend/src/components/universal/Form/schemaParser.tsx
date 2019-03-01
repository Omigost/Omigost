import * as React from 'react';

import {
    Schema,
    NodeSchema,
    NodeType,
    SchemaParserConfig,
    SchemaRenderersMappingForType,
    SchemaRenderer
} from './schemaTypes';

import { defaultParserConfig } from './defaultParserConfig';

export function recTransformTreeIntoUI(node: NodeSchema, config: SchemaParserConfig): React.ReactNode {
    let renderersForType: SchemaRenderersMappingForType;
    
    switch(node.type) {
        case NodeType.OBJECT:
            renderersForType = config.renderers.OBJECT;
            break;
        case NodeType.STRING:
            renderersForType = config.renderers.STRING;
            break;
        default:
            return null;
    }
    
    let renderer: SchemaRenderer = renderersForType.default;
    if(node.ui) {
        renderer = renderersForType[node.ui];
    }
    
    return renderer.render(node, recTransformTreeIntoUI, config);
};

export function transformTreeIntoUI(schema: Schema, config: SchemaParserConfig = defaultParserConfig): React.ReactNode {
    return recTransformTreeIntoUI(schema, config);
};