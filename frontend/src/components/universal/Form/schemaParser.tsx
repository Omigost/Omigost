
import {
    Node,
    NodeAny,
    NodeHandler,
    NodeSchema,
    NodeState,
    NodeType,
    NodeTypeSchemas,
    SchemaNodeHandlersMappingForType,
    SchemaParserConfig,
    SchemaParserConfigOpt,
} from "./schemaTypes";

import { defaultParserConfig } from "./defaultParserConfig";

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
        getOutput: () => handler.getOutput(node, astNode, parentNode, config, recTransformSchemaIntoTree),
        render: () => handler.render(node, astNode, parentNode, config),
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

export function transformSchemaIntoTree<M extends NodeSchema>(node: M, rootNode: NodeAny = null, config: SchemaParserConfigOpt = null): Node<any, any, M> {
    const conf = {...defaultParserConfig, ...config};

    if (!rootNode) {
        rootNode = {
            handler: null,
            state: conf.rootState,
            schemaNode: node,
            type: NodeType.ROOT,
            children: [],
            getOutput: () => {
                if (rootNode.children.length === 0) {
                    return null;
                } else if (rootNode.children.length === 1) {
                    return rootNode.children[0].getOutput();
                } else {
                    return rootNode.children.map(child => child.getOutput());
                }
            },
            render: () => rootNode.children.map(child => child.render()),
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