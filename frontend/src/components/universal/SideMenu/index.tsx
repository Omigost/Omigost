import * as React from "react";
import styled, { keyframes } from "styled-components";

import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const menuResizeAnimation = keyframes`
    from {
        width: 6vw;
    }
    to {
        width: 15vw;
    }
`;

const menuResizeAnimationReversed = keyframes`
    from {
        width: 15vw;
    }
    to {
        width: 6vw;
    }
`;

const menuItemsTextAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const Wrapper = styled.aside`
  width: 6vw;
  min-height: 100vh;
  padding-top: 2vw;
  padding-bottom: 1vw;
  position: fixed;
  z-index: 99999;
  animation: ${menuResizeAnimationReversed} 0.5s normal ease-in-out;
  background: transparent;

  .side-menu-button-icon {
    width: 2.3vw;
  }

  &:hover {
    width: 15vw;
    animation: ${menuResizeAnimation} 0.5s normal ease-in-out;
    background: ${(props: MenuButtonProps) => props.theme.colors.primaryGradient};
    box-shadow: 0.3vw 0.2vw 0 0 rgba(0,0,0,0.14);
    & .side-menu-button {
      color: white;
    }
    & .side-menu-button-name {
      display: inline-block;
      animation: ${menuItemsTextAnimation} 0.55s normal cubic-bezier(0.92, -0.12, 0.68, 0.91);
    }
  }
`;

export interface MenuButtonProps {
  fontSize?: string;
  theme?: any;
  selected?: boolean;
}

const MenuButtonText = styled.div<MenuButtonProps>`
  font-family: ${(props: MenuButtonProps) => props.theme.primaryFont};
  color: ${(props: MenuButtonProps) => props.theme.colors.lightAccent};
  font-size: 1vw;
  display: none;
  margin-left: 2vw;
`;

const MenuButtonIcon = styled.div`
  display: inline-block;
`;

const MenuButton = styled.div<MenuButtonProps>`
  height: 3.5vw;
  font-family: ${(props: MenuButtonProps) => props.theme.primaryFont};
  font-size: ${(props: MenuButtonProps) => props.theme.fontSize[props.fontSize || "XL"]};
  color: ${(props: MenuButtonProps) => props.theme.colors.primary};
  padding-top: 0.1vw;
  padding-left: 1.9vw;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    color: ${(props: MenuButtonProps) => props.theme.colors.lightAccent};
    opacity: 1;
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
                                className={"side-menu-button"}
                                fontSize={this.props.fontSize}
                                selected={index === this.state.selectedIndex}
                                onClick={() => {
                                    this.handleButtonClicked(menuOption, index);
                                }}
                            >
                                <MenuButtonIcon
                                    className="side-menu-button-icon"
                                >
                                    <FontAwesomeIcon icon={menuOption.icon} />
                                </MenuButtonIcon>
                                <MenuButtonText
                                    className="side-menu-button-name"
                                    selected={index === this.state.selectedIndex}
                                >
                                    {menuOption.name}
                                </MenuButtonText>
                            </MenuButton>
                        );
                    })
                }
            </Wrapper>
        );
    }
}