import * as React from 'react';

import {
    NodeObjectSchema,
    SchemaParserConfig,
    TreeUITransformer
} from '../schemaTypes';

export default {
    render: (node: NodeObjectSchema, transformer: TreeUITransformer, config: SchemaParserConfig) => {
        const propertiesKeys: Array<string> = Object.keys(node.properties);
        
        return (
            <div>
                {
                    propertiesKeys.map((key: string, index: number) => {
                        return (
                            <div key={`form-ui-${index}`} >
                                {
                                    transformer(node.properties[key], config)
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
};