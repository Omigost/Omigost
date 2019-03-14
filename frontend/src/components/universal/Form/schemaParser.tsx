import * as React from "react";

import {
    NodeSchema,
    NodeType,
    NodeState,
    Node,
    Schema,
    SchemaParserConfig,
    SchemaParserConfigOpt,
    NodeHandler,
    SchemaNodeHandlersMappingForType,
} from "./schemaTypes";

import { defaultParserConfig } from "./defaultParserConfig";

export function recTransformSchemaIntoTree(node: NodeSchema, parentNode: Node, config: SchemaParserConfig): Node {
    let handlersForType:  SchemaNodeHandlersMappingForType;

    switch (node.type) {
        case NodeType.OBJECT:
            handlersForType = config.handlers.OBJECT;
            break;
        case NodeType.STRING:
            handlersForType = config.handlers.STRING;
            break;
        default:
            return null;
    }

    let handler: NodeHandler = handlersForType.default;
    if (node.ui) {
        handler = handlersForType[node.ui];
    }
    
    const astNode: Node = {
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
        setState: (state: NodeState) => {
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

export function transformSchemaIntoTree(node: NodeSchema, rootNode: Node = null, config: SchemaParserConfigOpt = null): Node {
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
            setState: (state: NodeState) => {
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

/*export function recTransformTreeIntoUI(node: NodeSchema, config: SchemaParserConfig): React.ReactNode {
    let renderersForType: SchemaRenderersMappingForType;

    switch (node.type) {
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
    if (node.ui) {
        renderer = renderersForType[node.ui];
    }

    return renderer.render(node, recTransformTreeIntoUI, config);
}

export function transformTreeIntoUI(schema: Schema, config: SchemaParserConfigOpt = null): React.ReactNode {
    return recTransformTreeIntoUI(schema, {...defaultParserConfig, ...config});
}*/