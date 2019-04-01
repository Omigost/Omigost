import * as React from "react";
import * as ReactDOM from "react-dom";
import styled, { withTheme } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popout } from 'react-popout-component';

import {
    faWindowMinimize, faWindowMaximize, faWindowClose,
} from "@fortawesome/free-solid-svg-icons";

import { Rnd } from "react-rnd";

interface ComponentProps {
  fontSize?: string;
  theme?: any;
  parentWindowState: FloatingWindowState;
}

const Wrapper = styled.div<ComponentProps>`
  font-family: ${(props: ComponentProps) => props.theme.primaryFont};
  font-size: ${(props: ComponentProps) => props.theme.fontSize[props.fontSize || "default"]};
  color: ${(props: ComponentProps) => props.theme.colors.lightAccent};
`;

const Header = styled.div<ComponentProps>`
  position: absolute;
  top: 0;
  font-family: ${(props: ComponentProps) => props.theme.primaryFont};
  font-size: ${(props: ComponentProps) => props.theme.fontSize[props.fontSize || "XL"]};
  color: ${(props: ComponentProps) => props.theme.colors.lightAccent};
  background: ${(props: ComponentProps) => props.theme.colors.accent};
  width: ${(props: ComponentProps) => props.parentWindowState.width};
  min-width: 100vw;
  height: 2vw;
  padding: 0.3vw;
`;

const Content = styled.div<ComponentProps>`
  font-family: ${(props: ComponentProps) => props.theme.primaryFont};
  font-size: ${(props: ComponentProps) => props.theme.fontSize[props.fontSize || "default"]};
  color: ${(props: ComponentProps) => props.theme.colors.accent};
  width: ${(props: ComponentProps) => props.parentWindowState.width};
  margin-top: 2vw;
`;

const Button = styled.div<ComponentProps>`
  color: ${(props: ComponentProps) => props.theme.colors.lightAccent};
  padding: 0.1vw;
  font-size: 1.3vw;
  padding: 0.2vw;
  width: 1.5vw;
  margin-left: 0.1vw;
  cursor: pointer;
  display: inline-block;
  
  &:hover {
      background: ${(props: ComponentProps) => props.theme.colors.primaryGradient};
      color: ${(props: ComponentProps) => props.theme.colors.accent};
  }
`;

export interface FloatingWindowProps {
    theme?: any;
    open: boolean;
}

export interface FloatingWindowState {
    width: string;
    height: string;
    x: number;
    y: number;
    showAsPopout: boolean;
}

class FloatingWindow extends React.Component<FloatingWindowProps, FloatingWindowState> {
    state: FloatingWindowState;
    
    constructor(props) {
        super(props);
        
        this.state = {
            width: null,
            height: null,
            x: null,
            y: null,
            showAsPopout: false,
        };
    }
    
    render() {
        
        if (!this.props.open) {
            return null;
        }
        
        let node = (
            <Rnd
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: this.props.theme.colors.background,
                    zIndex: 99999999,
                    overflow: "hidden",
                    border: `0.3vw solid ${this.props.theme.colors.accent}`,
                }}
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                onResize={(e, direction, ref, delta, position) => {
                    this.setState({
                        width: ref.style.width,
                        height: ref.style.height,
                        ...position,
                    });
                }}
            >
                <Wrapper parentWindowState={this.state}>
                    <Header parentWindowState={this.state}>
                        <Button parentWindowState={this.state}>
                            <FontAwesomeIcon icon={faWindowMinimize.iconName} />
                        </Button>
                        <Button
                            parentWindowState={this.state}
                            onClick={() => this.setState({ showAsPopout: true })}
                        >
                            <FontAwesomeIcon icon={faWindowMaximize.iconName} />
                        </Button>
                        <Button parentWindowState={this.state}>
                            <FontAwesomeIcon icon={faWindowClose.iconName} />
                        </Button>
                    </Header>
                    <Content parentWindowState={this.state}>
                        {this.props.children}
                    </Content>
                </Wrapper>
            </Rnd>
        );
        
        if (this.state.showAsPopout) {
            const originalNode = node;
            node = (
                <Popout>
                    {originalNode}
                </Popout>
            );
        }
        
        return ReactDOM.createPortal(
            node,
            document.body
        );
    }
}

export default withTheme(FloatingWindow);