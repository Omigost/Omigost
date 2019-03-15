import * as React from "react";

type ValueOf<T> = T[keyof T];

export enum NodeType {
    STRING = "string",
    OBJECT = "object",
    ROOT = "root",
}

export interface NodeTypeSchemas {
    STRING: NodeStringSchema;
    OBJECT: NodeObjectSchema;
    ROOT: any;
}

export type NodeBaseSchema = {
    title?: string;
    description?: string;
    ui?: string;
    [key: string]: any;
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

export type NodeSchema = ValueOf<NodeTypeSchemas>;

export type Schema = NodeObjectSchema;

export abstract class NodeHandler<
  S, O, M extends NodeSchema,
  CS = any, CO = any, CM extends NodeSchema = any,
  PS = any, PO = any, PM extends NodeSchema = any
> {
    constructor() {}

    abstract render(schemaNode: M, node: Node<S, O, M>, parentNode: Node<PS, PO, PM>, config: SchemaParserConfig): React.ReactNode;

    resolveInitialState(schemaNode: M, node: Node<S, O, M>, parentNode: Node<PS, PO, PM>, config: SchemaParserConfig, resolve: SchemaTreeResolver): NodeState<S> {
        return null;
    }

    resolveChildren(schemaNode: M, node: Node<S, O, M>, parentNode: Node<PS, PO, PM>, config: SchemaParserConfig, resolve: SchemaTreeResolver): Array<Node<CS, CO, CM>> {
        return [];
    }

    getOutput(schemaNode: M, node: Node<S, O, M>, parentNode: Node<PS, PO, PM>, config: SchemaParserConfig, resolve: SchemaTreeResolver): NodeOutputValue<O> {
        return null;
    }
    
    setErrors(errors: Array<NodeError>, schemaNode: M, node: Node<S, O, M>, parentNode: Node<PS, PO, PM>, config: SchemaParserConfig, resolve: SchemaTreeResolver): void {
        
    }
}

export interface SchemaNodeHandlersMappingForType<M extends NodeSchema> {
    [key: string]: NodeHandler<any, any, M>;
}

export type NodeTypeNames = keyof typeof NodeType;

export type SchemaNodeHandlersMapping = {
    [key in NodeTypeNames]: SchemaNodeHandlersMappingForType<NodeTypeSchemas[key]>;
};

export interface SchemaParserConfig {
    handlers: SchemaNodeHandlersMapping;
    rootState: NodeState<any>;
    rootSetState?: (state: NodeState<any>, root: RootNode) => void;
}

export interface SchemaParserConfigOpt {
    handlers?: SchemaNodeHandlersMapping;
    rootState?: NodeState<any>;
    rootSetState?: (state: NodeState<any>, root: NodeAny) => void;
}

export type NodeState<S> = S;

export type NodeOutputValue<O> = O;

export type NodeMetaOutputValue<O> = {
    __data: NodeOutputValue<O>;
    __source: NodeAny;
};

export type NodeAny = Node<any, any, any>;

export type SchemaTreeResolver<
  M extends NodeSchema = any,
  PS = any, PO = any, PM extends NodeSchema = any
> = (node: M, parentNode: Node<PS, PO, PM>, config: SchemaParserConfig) => Node<any, any, M>;

export interface Node<
 S, O, M extends NodeSchema,
 CS = any, CO = any, CM extends NodeSchema = any,
 PS = any, PO = any, PM extends NodeSchema = any
> {
    state: NodeState<S>;
    tag?: string;
    type: NodeType;
    schemaNode: M;
    children: Array<Node<CS, CO, CM>>;
    handler: NodeHandler<S, O, M, CS, CO, CM, PS, PO, PM>;
    render: () => React.ReactNode;
    getOutput: () => NodeMetaOutputValue<O>;
    setState: (state: NodeState<S>) => void;
    setErrors: (errors: Array<NodeError>) => void;
    findChild: (tag: string) => Node<CS, CO, CM>;
}

export interface RootNode extends Node<any, any, NodeSchema> {
    validate: () => void;
    getData: () => any;
}

export interface NodeError {
    keyword: string;
    message?: string;
    params: any;
    schemaPath: string;
}    