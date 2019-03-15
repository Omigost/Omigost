import * as React from "react";

import {
    NodeSchema,
    NodeType,
    NodeState,
    Node,
    NodeAny,
    Schema,
    NodeTypeNames,
    SchemaParserConfig,
    SchemaParserConfigOpt,
    NodeHandler,
    NodeTypeSchemas,
    SchemaNodeHandlersMappingForType,
} from "./schemaTypes";

import { defaultParserConfig } from "./defaultParserConfig";

function getHandlerForUI<M extends NodeSchema>(node: M, handlers: SchemaNodeHandlersMappingForType<M>): NodeHandler<any, any, M> {
    if (node.ui) {
        return handlers[node.ui];
    }
    return handlers.default;
}

function getHandlerForType<M extends NodeSchema>(node: M, config: SchemaParserConfig): SchemaNodeHandlersMappingForType<NodeTypeSchemas[M['type']]> {
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
        findChild: (tag: string) => {
            console.error('NODE FIND CHILD [NODE]! with tag = '+tag);
            console.log(astNode.children);
            return astNode.children.filter(child => child.tag === tag)[0]
        },
        getOutput: () => {
            return astNode.state;
        },
        render: () => handler.render(node, astNode, parentNode, config),
        setState: (state: NodeState<any>) => {
            if (state) {
                Object.assign(astNode, { state });
            }
            parentNode.setState(astNode.state);
        },
        handler,
    };
    
    if(handler.resolveInitialState) {
        astNode.state = handler.resolveInitialState(node, astNode, parentNode, config, recTransformSchemaIntoTree);
    }
    
    if(handler.resolveChildren) {
        astNode.children = handler.resolveChildren(node, astNode, parentNode, config, recTransformSchemaIntoTree);
    }
    
    if(handler.getOutput) {
        astNode.getOutput = () => handler.getOutput(node, astNode, parentNode, config, recTransformSchemaIntoTree);
    }
    
    parentNode.children.push(astNode);
    
    return astNode;
}

export function recTransformSchemaIntoTree<M extends NodeSchema>(node: M, parentNode: NodeAny, config: SchemaParserConfig): Node<any, any, M> {
    return createNode(
        node, parentNode, config,
        getHandlerForUI(node, getHandlerForType(node, config))
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
                if (rootNode.children.length == 0) {
                    return null;
                } else if (rootNode.children.length == 1) {
                    return rootNode.children[0].getOutput();
                } else {
                    return rootNode.children.map(child => child.getOutput());
                }
            },
            render: () => {
                console.log('ROOT RENDER!');
                return rootNode.children.map(child => child.render());
            },
            setState: (state: NodeState<any>) => {
                if (state) {
                    Object.assign(rootNode, { state });
                }
                conf.rootSetState(rootNode.state, rootNode);
            },
            tag: 'root',
            findChild: (tag: string) => {
                console.error('NODE FIND CHILD [ROOT]!');
                console.log(rootNode.children);
                return rootNode.children.filter(child => child.tag === tag)[0]
            }
        };
    }
    
    recTransformSchemaIntoTree(node, rootNode, conf);
    return rootNode;
}