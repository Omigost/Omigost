import * as React from "react";

type ValueOf<T> = T[keyof T];

export enum NodeType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    OBJECT = "object",
    ARRAY = "array",
    ROOT = "root",
}

export interface NodeTypeSchemas {
    STRING: NodeStringSchema;
    NUMBER: NodeNumberSchema;
    BOOLEAN: NodeBooleanSchema;
    OBJECT: NodeObjectSchema;
    ARRAY: NodeArraySchema;
    ROOT: any;
}

export type NodeBaseSchema = {
    title?: string;
    description?: string;
    ui?: string;
    [key: string]: any;
    formatOutput?: (output: any) => any;
    formatInput?: (output: any) => any;
};

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

export interface NodeNumberSchema extends NodeBaseSchema {
    type: NodeType.NUMBER;
}

export interface NodeBooleanSchema extends NodeBaseSchema {
    type: NodeType.BOOLEAN;
}

export interface NodeArraySchema extends NodeBaseSchema {
    type: NodeType.ARRAY;
    items: Array<NodeBaseSchema> | NodeBaseSchema;
}

export type NodeSchema = ValueOf<NodeTypeSchemas>;

export type Schema = NodeObjectSchema;

export abstract class Node<
  S, O, M extends NodeSchema,
  CS = any, CO = any, CM extends NodeSchema = any,
  PS = any, PO = any, PM extends NodeSchema = any
> {
    private uid: number;
    private schemaNode: M;
    private parentNode: Node<PS, PO, PM>;
    private config: SchemaParserConfig;
    private type: NodeType;
    private resolver: SchemaTreeResolver;
    private state: NodeState<S> = null;
    private tag: string = null;
    private children: Array<Node<CS, CO, CM>>;
    private handler: NodeHandler<S, O, M, CS, CO, CM, PS, PO, PM>;

    constructor(handler: NodeHandler<S, O, M, CS, CO, CM, PS, PO, PM>, type: NodeType, schemaNode: M, parentNode: Node<PS, PO, PM>, config: SchemaParserConfig, resolver: SchemaTreeResolver) {
        this.schemaNode = schemaNode;
        this.config = config;
        this.resolver = resolver;
        this.children = [];
        this.type = type;
        this.parentNode = parentNode;
        this.uid = config.uidGenerator();
    }

    getHandler(): NodeHandler<S, O, M, CS, CO, CM, PS, PO, PM> {
        return this.handler;
    }

    isOutputAvailable(): boolean {
        return true;
    }

    validateCustom(): Array<NodeError> {
        if (this.children.length === 0) {
            return [];
        } else {
            let result = [];
            this.children.forEach(child => {
                result = result.concat(child.validateCustom());
            });
            return result;
        }
    }

    getDebugRepresentation(): string {
        let output = "";
        const indent = 4;
        const indentStr = " ";

        output += (this.type.toString());
        if (this.tag) {
            output += `[${this.tag}]`;
        }
        if (this.children.length > 0) {
            output += " {\n";
            this.children.map(child => {
                const childText = child.getDebugRepresentation();
                output += "  > ";
                output += childText.split("\n").map((line, index) => {
                    if (index === 0) {
                        return line;
                    }
                    return indentStr.repeat(indent) + line;
                }).join("\n");
                output += "\n";
            });
            output += "}";
        }

        return output;
    }

    getUID() {
        return this.uid;
    }

    onResolveFinished() {
        // No nothing
    }

    modifyContext(fn: (context: FormContext) => FormContext) {
        this.config.rootModifyContext(fn, this);
    }

    setContext(context: FormContext) {
        this.config.rootSetContext(context, this);
    }

    resolve() {
        this.state = this.resolveInitialState() || null;
        this.children = this.resolveChildren() || [];
        this.onResolveFinished();
    }

    addChild(child: Node<CS, CO, CM>) {
        this.children.push(child);
    }

    overrideChildren(children: Array<Node<CS, CO, CM>>) {
        this.children = [ ...children ];
    }

    getChildren() {
        return this.children;
    }

    resolveNode(node: any, parentNode: NodeAny, config: SchemaParserConfig): NodeAny {
        return this.resolver(node, parentNode, config);
    }

    getConfig(): SchemaParserConfig {
        return this.config;
    }

    getSchema(): M {
        return this.schemaNode;
    }

    getState(): NodeState<S> {
        return this.state;
    }

    getTag(): string {
        return this.tag;
    }

    setTag(tag: string) {
        this.tag = tag;
    }

    setParent(parentNode: Node<PS, PO, PM>) {
        this.parentNode = parentNode;
    }

    abstract render(context: FormContext): React.ReactNode;

    getRawOutput(options): NodeOutputValue<O> {
        return null;
    }

    onChildStateChanged(state: NodeState<CS>, source: NodeAny, originalSource?: NodeAny) {
        // Do nothing
    }

    setStateSilently(state: NodeState<S>, source?: NodeAny, originalSource?: NodeAny): void {
        if (state) {
            Object.assign(this.state, { ...this.state, ...state });
        }
    }

    setState(state: NodeState<S>, source?: NodeAny, originalSource?: NodeAny): void {
        this.setStateSilently(state, source, originalSource);
        this.parentNode.onChildStateChanged(this.state, this, originalSource);
    }

    findChild(tag: string): Node<CS, CO, CM> {
        return this.children.filter(child => child.tag === tag)[0];
    }

    resolveInitialState(): NodeState<S> {
        return null;
    }

    resolveChildren(): Array<Node<CS, CO, CM>> {
        return [];
    }

    getOutput(options): NodeMetaOutputValue<O> {
        if ((!options || (options && options.enableFormat !== false)) && this.getSchema().formatOutput) {
            return {
                __data: this.getSchema().formatOutput(this.getRawOutput(options)),
                __source: this,
            };
        }
        return {
            __data: this.getRawOutput(options),
            __source: this,
        };
    }

    setValue(value: NodeOutputValue<O>) {
        // Do nothing
    }
}

export class RootNode extends Node<any, any, NodeSchema> {

    private dataTransformer: (output: any) => any;
    private validator: (root: RootNode) => any;

    constructor(schemaNode: NodeSchema, config: SchemaParserConfig, resolve: SchemaTreeResolver, dataTransformer: (output: any) => any, validator: (root: RootNode) => any) {
        super(null, NodeType.ROOT, schemaNode, null, config, resolve);
        this.dataTransformer = dataTransformer;
        this.validator = validator;
    }

    resolveInitialState() {
        return {};
    }

    validate() {
        this.validator(this);
    }

    getOutput(options) {
        if (this.getChildren().length === 0) {
            return {
                __data: null,
                __source: this,
            };
        } else if (this.getChildren().length === 1) {
            return {
                __data: this.getChildren()[0].getOutput(options),
                __source: this,
            };
        } else {
            return {
                __data: this.getChildren().map(child => child.getOutput(options)),
                __source: this,
            };
        }
    }

    getData(options?: any) {
        return this.dataTransformer(this.getOutput(options));
    }

    render(context: FormContext) {
        return this.getChildren().map(child => child.render(context));
    }

    getTag(): string {
        return "root";
    }

    // FIXME: ROOT
    onChildStateChanged(state: NodeState<any>, source: NodeAny, originalSource?: NodeAny) {
        this.setState(state);
    }

    setState(state: NodeState<any>, source?: NodeAny, originalSource?: NodeAny): void {
        this.setStateSilently(state, source, originalSource);
        this.getConfig().rootSetState(this.getState(), this, originalSource);
    }

    setValue(value: NodeOutputValue<any>) {
        this.getChildren().forEach(child => child.setValue(value));
    }
}

export type NodeHandler<
  S, O, M extends NodeSchema,
  CS = any, CO = any, CM extends NodeSchema = any,
  PS = any, PO = any, PM extends NodeSchema = any
> = {
   new(handler: NodeHandler<S, O, M, CS, CO, CM, PS, PO, PM>, type: NodeType, schemaNode: M, parentNode: Node<PS, PO, PM>, config: SchemaParserConfig, resolver: SchemaTreeResolver): Node<S, O, M, CS, CO, CM, PS, PO, PM>;
};

export interface SchemaNodeHandlersMappingForType<M extends NodeSchema> {
    [key: string]: NodeHandler<any, any, M>;
}

export type NodeTypeNames = keyof typeof NodeType;

export type SchemaNodeHandlersMapping = {
    [key in NodeTypeNames]: SchemaNodeHandlersMappingForType<NodeTypeSchemas[key]>;
};

export interface FormContext {
    errors?: Array<NodeError>;
    getErrorsForNode?: (node: NodeAny) => Array<NodeError>;
}

export interface SchemaParserConfig {
    handlers: SchemaNodeHandlersMapping;
    rootState: NodeState<any>;
    rootSetState: (state: NodeState<any>, root: RootNode, originalSource?: NodeAny) => void;
    rootSetContext: (context: FormContext, source: NodeAny) => void;
    rootModifyContext: (fn: (context: FormContext) => FormContext, source: NodeAny) => void;
    uidGenerator: () => number;
    uidGeneratorFactory: () => () => number;
    ajvOptions?: any;
}

export interface SchemaParserConfigOpt {
    handlers?: SchemaNodeHandlersMapping;
    rootState?: NodeState<any>;
    rootSetState?: (state: NodeState<any>, root: NodeAny, originalSource?: NodeAny) => void;
    rootSetContext?: (context: FormContext, source: NodeAny) => void;
    rootModifyContext?: (fn: (context: FormContext) => FormContext, source: NodeAny) => void;
    uidGenerator?: () => number;
    uidGeneratorFactory?: () => () => number;
    ajvOptions?: any;
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

export function isNodeErrorPure(error: NodeError): error is NodeErrorPure {
    return (error as NodeErrorPure).source !== undefined;
}

interface NodeErrorAjv {
    keyword: string;
    message?: string;
    params: any;
    schemaPath: string;
    dataPath: string;
}

interface NodeErrorPure {
    message: string;
    source: NodeAny;
}

export type NodeError = NodeErrorAjv | NodeErrorPure;