
import {
    Node,
    NodeAny,
    RootNode,
    NodeError,
    NodeHandler,
    NodeSchema,
    NodeState,
    NodeType,
    NodeTypeSchemas,
    NodeMetaOutputValue,
    SchemaNodeHandlersMappingForType,
    SchemaParserConfig,
    SchemaParserConfigOpt,
} from "./schemaTypes";

import { defaultParserConfig } from "./defaultParserConfig";

export interface AjvError {
    dataPath: string;
    keyword: string;
    message?: string;
    params: any;
    schemaPath: string;
    node?: NodeAny;
}    

function getHandlerForUI<M extends NodeSchema>(node: M, handlers: SchemaNodeHandlersMappingForType<M>): NodeHandler<any, any, M> {
    if (node.ui) {
        return handlers[node.ui];
    }
    return handlers.default;
}

function getHandlerForType<M extends NodeSchema>(node: M, config: SchemaParserConfig): SchemaNodeHandlersMappingForType<NodeTypeSchemas[M["type"]]> {
    const t: NodeType = node.type;
    switch (t) {
        case NodeType.OBJECT:
            return config.handlers.OBJECT;
        case NodeType.STRING:
            return config.handlers.STRING;
        case NodeType.ROOT:
            return null;
    }
    const never: never = t;
    return never;
}

function createNode<M extends NodeSchema>(node: M, parentNode: NodeAny, config: SchemaParserConfig, handler: NodeHandler<any, any, M>): Node<any, any, M> {

    const astNode: Node<any, any, M> = {
        state: null,
        schemaNode: node,
        type: node.type,
        children: [],
        tag: null,
        findChild: (tag: string) => astNode.children.filter(child => child.tag === tag)[0],
        getOutput: () => ({
            __data: handler.getOutput(node, astNode, parentNode, config, recTransformSchemaIntoTree),
            __source: astNode,
        }),
        render: () => handler.render(node, astNode, parentNode, config),
        setErrors: (errors: Array<NodeError>) => {
            handler.setErrors(errors, node, astNode, parentNode, config, recTransformSchemaIntoTree);
        },
        setState: (state: NodeState<any>) => {
            if (state) {
                Object.assign(astNode, { state: { ...astNode.state, ...state } });
            }
            parentNode.setState(astNode.state);
        },
        handler,
    };

    astNode.state = handler.resolveInitialState(node, astNode, parentNode, config, recTransformSchemaIntoTree);
    astNode.children = handler.resolveChildren(node, astNode, parentNode, config, recTransformSchemaIntoTree);

    parentNode.children.push(astNode);

    return astNode;
}

export function recTransformSchemaIntoTree<M extends NodeSchema>(node: M, parentNode: NodeAny, config: SchemaParserConfig): Node<any, any, M> {
    return createNode(
        node, parentNode, config,
        getHandlerForUI(node, getHandlerForType(node, config)),
    );
}

export function isNodeMetaOutputValue(data: any): data is NodeMetaOutputValue<any> {
    return (data && (typeof data.__data) !== 'undefined' && data.__source);
}

function recGetMetaOutputSourceNodeByPath(metaOutput: any, path: Array<string> | string): any {
    if (isNodeMetaOutputValue(metaOutput)) {
        if (path !== null && path.length == 0) {
            return metaOutput.__source;
        } else {
            return recGetMetaOutputSourceNodeByPath(metaOutput.__data, path);
        }
    } else if(path === null) {
        return metaOutput;
    } else if (typeof path == 'string') {
        return recGetMetaOutputSourceNodeByPath(metaOutput, path.split('.'));
    } else if (path.length == 0) {
        return recGetMetaOutputSourceNodeByPath(metaOutput, null);
    } else {
        return recGetMetaOutputSourceNodeByPath(metaOutput[path[0]], path.slice(1));
    }
}

export function getMetaOutputSourceNodeByPath(metaOutput: any, path: string): any {
    let objPath = [];
    for(var match,matcher=/^([^\.\[]+)|\.([^\.\[]+)|\["([^"]+)"\]|\[(\d+)\]/g; 
        match=matcher.exec(path);) {
      objPath.push(Array.from(match).slice(1).filter(x=>x!==undefined)[0]);
    }
    return recGetMetaOutputSourceNodeByPath(metaOutput, objPath);
}

export function transformOutputToRawData(metaOutput: any): any {
    if (isNodeMetaOutputValue(metaOutput)) {
        return transformOutputToRawData(metaOutput.__data);
    } else if (Array.isArray(metaOutput)) {
        metaOutput.map(item => transformOutputToRawData(item));
    } else if (metaOutput instanceof Object) {
        const result = {};
        Object.keys(metaOutput).forEach(key => {
            result[key] = transformOutputToRawData(metaOutput[key]);
        });
        return result;
    } else {
        return metaOutput;
    }
}

export function transformSchemaIntoTree<M extends NodeSchema>(node: M, rootNode: RootNode = null, config: SchemaParserConfigOpt = null): RootNode {
    const conf = {...defaultParserConfig, ...config};

    if (!rootNode) {
        rootNode = {
            handler: null,
            state: conf.rootState,
            schemaNode: node,
            type: NodeType.ROOT,
            children: [],
            getData: () => transformOutputToRawData(rootNode.getOutput()),
            validate: async () => {
                const Ajv = await import('ajv');
                const ajv = new Ajv();
                const validateSchema = ajv.compile(node as unknown as object);
                const output = rootNode.getOutput();
                const data = transformOutputToRawData(output);     
                
                console.log(output);
                
                validateSchema(data);
                
                let errors: Array<AjvError> = validateSchema.errors;
                let errorsMap: WeakMap<NodeAny, Array<NodeError>> = new WeakMap();
                let sourcesList: Array<NodeAny> = [];
                
                if (errors) {
                    errors.forEach(error => {
                        const source: NodeAny = getMetaOutputSourceNodeByPath(output, error.dataPath);
                        const err: NodeError = error;
                        
                        if (errorsMap.has(source)) {
                            errorsMap.get(source).push(err);
                        } else {
                            errorsMap.set(source, [ err ]);
                        }
                        
                        sourcesList.push(source);
                    });
                    
                    sourcesList.forEach(source => {
                        if (errorsMap.has(source)) {
                            source.setErrors(errorsMap.get(source));
                            errorsMap.delete(source);
                        }
                    });
                }
                
                /*
                console.log(data);
                console.log(node);
                console.log(validateSchema(data));
                console.log(validateSchema.errors);]
                */
                
                
            },
            getOutput: () => {
                if (rootNode.children.length === 0) {
                    return {
                        __data: null,
                        __source: rootNode,
                    };
                } else if (rootNode.children.length === 1) {
                    return {
                        __data: rootNode.children[0].getOutput(),
                        __source: rootNode,
                    };
                } else {
                    return {
                        __data: rootNode.children.map(child => child.getOutput()),
                        __source: rootNode,
                    };
                }
            },
            render: () => rootNode.children.map(child => child.render()),
            setErrors: (errors: Array<NodeError>) => {},
            setState: (state: NodeState<any>) => {
                if (state) {
                    Object.assign(rootNode, { state: { ...rootNode.state, ...state } });
                }
                conf.rootSetState(rootNode.state, rootNode);
            },
            tag: "root",
            findChild: (tag: string) => rootNode.children.filter(child => child.tag === tag)[0],
        };
    }

    recTransformSchemaIntoTree(node, rootNode, conf);
    return rootNode;
}