import * as React from "react";

export enum NodeType {
    STRING = "string",
    OBJECT = "object",
    ROOT = "root",
}

export interface NodeBaseSchema {
    title?: string;
    description?: string;
    ui?: string;
}

export interface NodeProperties {
    [key: string]: NodeSchema;
}

export interface NodeObjectSchema extends NodeBaseSchema {
    type: NodeType.OBJECT;
    required?: Array<string>;
    properties: NodeProperties;
}

export interface NodeStringSchema extends NodeBaseSchema {
    type: NodeType.STRING;
}

export type NodeSchema = NodeObjectSchema | NodeStringSchema;

export type Schema = NodeObjectSchema;

export interface NodeHandler {
    render: (schemaNode: NodeSchema, node: Node, parentNode: Node, config: SchemaParserConfig) => React.ReactNode;
    resolveInitialState?: (schemaNode: NodeSchema, node: Node, parentNode: Node, config: SchemaParserConfig, resolve: SchemaTreeResolver) => NodeState;
    resolveChildren?: (schemaNode: NodeSchema, node: Node, parentNode: Node, config: SchemaParserConfig, resolve: SchemaTreeResolver) => Array<Node>;
    getOutput?: (schemaNode: NodeSchema, node: Node, parentNode: Node, config: SchemaParserConfig, resolve: SchemaTreeResolver) => NodeOutputValue;
}

export interface SchemaNodeHandlersMappingForType {
    [key: string]: NodeHandler;
}

type NodeTypeNames = keyof typeof NodeType;

export type SchemaNodeHandlersMapping = {
    [key in NodeTypeNames]: SchemaNodeHandlersMappingForType;
};

export interface SchemaParserConfig {
    handlers: SchemaNodeHandlersMapping;
    rootState: NodeState;
    rootSetState?: (state: NodeState, root: Node) => void;
}

export interface SchemaParserConfigOpt {
    handlers?: SchemaNodeHandlersMapping;
    rootState?: NodeState;
    rootSetState?: (state: NodeState, root: Node) => void;
}

export type NodeState = any;

export type NodeOutputValue = any;

export type SchemaTreeResolver = (node: NodeSchema, parentNode: Node, config: SchemaParserConfig) => Node;

export interface Node {
    state: NodeState;
    tag?: string;
    type: NodeType;
    schemaNode: NodeSchema;
    children: Array<Node>;
    handler: NodeHandler;
    render: () => React.ReactNode;
    getOutput: () => NodeOutputValue;
    setState: (state: NodeState) => void;
    findChild: (tag: string) => Node;
}