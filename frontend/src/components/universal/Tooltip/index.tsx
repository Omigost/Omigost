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
    children?: Array<React.ReactElement<any>> | React.ReactElement<any>;
    content?: React.ReactElement<any>;
    clickTrigger?: boolean;
    show?: boolean;
}; 

class Tooltip extends React.Component<TooltipProps, undefined> {
    render() {
        if(!this.props.content) {
            return this.props.children;
        }
        
        let additionalProps = {};
        if(this.props.show) {
            additionalProps = {
                visible: true
            };
        } else if(this.props.show !== null && typeof this.props.show !== 'undefined') {
            additionalProps = {
                visible: false
            };
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
                    {...additionalProps}
                >
                    {this.props.children}
                </TooltipComponent>
            </Wrapper>
        );
    }
};

export default withTheme(Tooltip);