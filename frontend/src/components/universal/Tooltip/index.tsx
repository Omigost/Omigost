import * as React from 'react';
import styled, { withTheme }  from 'styled-components';
import 'rc-tooltip/assets/bootstrap.css';
import './index.css';

import TooltipComponent from 'rc-tooltip';

const Wrapper = styled.div`
  padding: 0;
`;

const TooltipContent = styled.div`
  font-family: ${(props) => props.theme.primaryFont};
  font-size: ${(props) => props.theme.fontSize['default']};
  color: ${(props) => props.theme.colors.lightAccent};
`;

export interface TooltipProps {
    theme: any;
    children?: React.ReactNode;
    content?: React.ReactNode;
    clickTrigger?: boolean;
    show?: boolean;
}; 

class Tooltip extends React.Component<TooltipProps, undefined> {
    render() {
        if(!this.props.content) {
            return this.props.children;
        }
        
        return (
            <Wrapper>
                <TooltipComponent
                    destroyTooltipOnHide
                    placement='right'
                    trigger={(this.props.clickTrigger)?(['click']):(['hover'])}
                    overlay={
                        <TooltipContent theme={this.props.theme}>
                            {this.props.content}
                        </TooltipContent>
                    }
                    {
                        ...((this.props.show === null || typeof this.props.show === 'undefined')?({}):({
                            visible: this.props.show
                        }))
                    }
                >
                    {this.props.children}
                </TooltipComponent>
            </Wrapper>
        );
    }
};

export default withTheme(Tooltip);