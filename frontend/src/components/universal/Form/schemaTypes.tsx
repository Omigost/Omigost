import * as React from 'react';

export enum NodeType {
    STRING = 'string',
    OBJECT = 'object'    
};

export interface NodeBaseSchema {
    title?: string;
    description?: string;
    ui?: string;
};

export interface NodeProperties {
    [key: string]: NodeSchema;
};

export interface NodeObjectSchema extends NodeBaseSchema {
    type: NodeType.OBJECT;
    required?: Array<string>;
    properties: NodeProperties;
};

export interface NodeStringSchema extends NodeBaseSchema {
    type: NodeType.STRING;
};

export type NodeSchema = NodeObjectSchema | NodeStringSchema;

export type Schema = NodeObjectSchema;

export interface SchemaRenderer {
    render: (node: NodeSchema, transformer: TreeUITransformer, config: SchemaParserConfig) => React.ReactNode;
};

export interface SchemaRenderersMappingForType {
    [key: string]: SchemaRenderer;
};

type NodeTypeNames = keyof typeof NodeType;

export type SchemaRenderersMapping = {
    [key in NodeTypeNames]: SchemaRenderersMappingForType;
};

export interface SchemaParserConfig {
     renderers: SchemaRenderersMapping;
};

export type TreeUITransformer = (NodeSchema, SchemaParserConfig) => React.ReactNode;