
import {
    isNodeErrorPure,
    Node,
    NodeAny,
    NodeError,
    NodeHandler,
    NodeMetaOutputValue,
    NodeSchema,
    NodeType,
    NodeTypeSchemas,
    RootNode,
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
    return node.ui ? handlers[node.ui] : handlers.default;
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
    const astNode: Node<any, any, M> = new handler(
        handler, node.type, node, parentNode, config, recTransformSchemaIntoTree,
    );
    astNode.resolve();

    parentNode.addChild(astNode);
    return astNode;
}

export function recTransformSchemaIntoTree<M extends NodeSchema>(node: M, parentNode: NodeAny, config: SchemaParserConfig): Node<any, any, M> {
    return createNode(
        node, parentNode, config,
        getHandlerForUI(node, getHandlerForType(node, config)),
    );
}

export function isNodeMetaOutputValue(data: any): data is NodeMetaOutputValue<any> {
    return (data && (typeof data.__data) !== "undefined" && data.__source);
}

function recGetMetaOutputSourceNodeByPath(metaOutput: any, path: Array<string> | string): any {
    if (isNodeMetaOutputValue(metaOutput)) {
        if (path !== null && path.length === 0) {
            return metaOutput.__source;
        } else {
            return recGetMetaOutputSourceNodeByPath(metaOutput.__data, path);
        }
    } else if (path === null) {
        return metaOutput;
    } else if (typeof path === "string") {
        return recGetMetaOutputSourceNodeByPath(metaOutput, path.split("."));
    } else if (path.length === 0) {
        return recGetMetaOutputSourceNodeByPath(metaOutput, null);
    } else {
        return recGetMetaOutputSourceNodeByPath(metaOutput[path[0]], path.slice(1));
    }
}

export function getMetaOutputSourceNodeByPath(metaOutput: any, path: string): any {
    const objPath = [];
    for (let match,matcher=/^([^\.\[]+)|\.([^\.\[]+)|\["([^"]+)"\]|\[(\d+)\]/g; match = matcher.exec(path);) {
      objPath.push(Array.from(match).slice(1).filter(x => x !== undefined)[0]);
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

export async function validateRoot(rootNode: RootNode) {
    const Ajv = ((await import("ajv")) as unknown as any).default;

    const ajv = new Ajv({
        allErrors: true,
        ...rootNode.getConfig().ajvOptions,
    });
    const validateSchema = ajv.compile(rootNode.getSchema() as unknown as object);
    const output = rootNode.getOutput();
    const data = transformOutputToRawData(output);

    validateSchema(data);

    let errors: Array<NodeError> = validateSchema.errors || [];
    const errorsMap: WeakMap<NodeAny, Array<NodeError>> = new WeakMap();

    const customErrors: Array<NodeError> = rootNode.validateCustom();
    errors = errors.concat(customErrors);

    errors.forEach(error => {
        let source: NodeAny = null;
        if (isNodeErrorPure(error)) {
            source = error.source;
        } else {
            source = getMetaOutputSourceNodeByPath(output, error.dataPath);
        }

        if (source !== null) {
            const err: NodeError = error;

            if (errorsMap.has(source)) {
                errorsMap.get(source).push(err);
            } else {
                errorsMap.set(source, [ err ]);
            }
        }
    });

    rootNode.setContext({
        errors: errors || [],
        getErrorsForNode: (node: NodeAny) => {
            return errorsMap.get(node) || [];
        },
    });
}

export function transformSchemaIntoTree<M extends NodeSchema>(node: M, rootNode: RootNode = null, config: SchemaParserConfigOpt = null): RootNode {
    const conf = {...defaultParserConfig, ...config};
    if (!conf.uidGenerator) {
        conf.uidGenerator = conf.uidGeneratorFactory();
    }

    if (!rootNode) {
        rootNode = new RootNode(
            node, conf, recTransformSchemaIntoTree, transformOutputToRawData, validateRoot,
        );
        rootNode.resolve();
    }

    recTransformSchemaIntoTree(node, rootNode, conf);
    return rootNode;
}
