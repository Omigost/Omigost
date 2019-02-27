import * as React from 'react';
import styled  from 'styled-components';

import { translate } from 'react-polyglot';
import * as ReactMarkdown from 'react-markdown';

interface TextProps {
  children?: any,
  translate?: boolean,
  t?: any,
  compact?: boolean
};

const Wrapper = styled.span<TextProps>`
  ${(props: TextProps) => {
      if(props.compact) {
        return '& > p { margin: 0; }';
      }
      return '';
  }};
`;


class Text extends React.Component<TextProps, undefined> {
    render() {
        let content = this.props.children || '';
        
        if(this.props.translate) {
            content = this.props.t(content);
        }
        
        return (
           <Wrapper compact={this.props.compact}>
               <ReactMarkdown source={content} />
           </Wrapper>
        );
    }
};

export default translate()(Text);