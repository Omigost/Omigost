import * as React from 'react';
import styled  from 'styled-components';

import { transformTreeIntoUI } from './schemaParser';
import { NodeType, Schema } from './schemaTypes';

const Wrapper = styled.div`
  width: 100%;
`;

interface FormProps {
  fontSize?: string;
  theme?: any;
};

export default class Form extends React.Component<FormProps, undefined> {
    render() {
        const schema: Schema = {
            title: 'A registration form',
            description: 'The description',
            type: NodeType.OBJECT,
            properties: {
                'firstName': {
                    type: NodeType.STRING,
                    title: 'Your first name'
                }
            }
        };
        
        return (
            <Wrapper>
                {transformTreeIntoUI(schema)}
            </Wrapper>
        );
    }
}