import * as React from "react";
import styled from "styled-components";

import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.aside`
  width: 8vw;
  min-height: 100vh;
  background: ${(props: MenuButtonProps) => props.theme.colors.accent};
  position: fixed;
  z-index: 99999;
`;

export interface MenuButtonProps {
  fontSize?: string;
  theme?: any;
  selected?: boolean;
}

const MenuButton = styled.div<MenuButtonProps>`
  width: 5.8vw;
  height: 6vw;
  font-family: ${(props: MenuButtonProps) => props.theme.primaryFont};
  font-size: ${(props: MenuButtonProps) => props.theme.fontSize[props.fontSize || "XXL"]};
  color: ${(props: MenuButtonProps) => props.theme.colors.lightAccent};
  background: ${(props: MenuButtonProps) => {
      if (props.selected) {
          return props.theme.colors.primaryGradient;
      }
      return props.theme.colors.accent;
  }};
  padding-top: 2.0vw;
  padding-left: 2.1vw;
  cursor: pointer;

  &:hover {
    background: ${(props: MenuButtonProps) => props.theme.colors.lightAccent};
    color: ${(props: MenuButtonProps) => props.theme.colors.accent};
  }
`;


export interface MenuOption {
    name: string;
    icon: IconName;
}

export interface SideMenuProps {
    onSectionChanged?: (option: MenuOption, index: number) => void;
    fontSize?: string;
    options: Array<MenuOption>;
    selectedOption?: number | null;
}

export interface SideMenuState {
    selectedIndex?: number | null;
    selectedIndexProp?: number | null;
}

export default class SideMenu extends React.Component<SideMenuProps, SideMenuState> {

    state: SideMenuState = {
        selectedIndex: null,
        selectedIndexProp: null,
    };

    static getDerivedStateFromProps(props, state) {
        if (props.selectedOption !== state.selectedIndexProp) {
          return {
            selectedIndexProp: props.selectedOption,
            selectedIndex: props.selectedOption,
          };
        }
        return null;
    }

    handleButtonClicked(menuOption: MenuOption, index: number) {
        this.setState({
            selectedIndex: index,
        }, () => {
            if (this.props.onSectionChanged) {
                this.props.onSectionChanged(menuOption, index);
            }
        });
    }

    render() {
        return (
            <Wrapper>
                {
                    this.props.options.map((menuOption: MenuOption, index: number) => {
                        return (
                            <MenuButton
                                key={`side-menu-button-${index}`}
                                fontSize={this.props.fontSize}
                                selected={index === this.state.selectedIndex}
                                onClick={() => {
                                    this.handleButtonClicked(menuOption, index);
                                }}
                            >
                                <FontAwesomeIcon icon={menuOption.icon} />
                            </MenuButton>
                        );
                    })
                }
            </Wrapper>
        );
    }
}