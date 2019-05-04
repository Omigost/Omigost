import * as React from "react";
import styled  from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckboxComponent from "rc-checkbox";

import {
    faCheck,
} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  padding: 1.2vw;
  width: 100%;
`;

const Box = styled.div`
  background: ${(props) => props.theme.colors.primaryGradient};
  width: 2vw;
  height: 2vw;
  border-radius: 0.3vw;
  border: 0.1vw solid transparent;
  cursor: pointer;
  
  &:hover {
      background: white;
      border: 0.1vw solid ${(props) => props.theme.colors.primary};
  }
  
  &:hover .BoxTick {
      color: ${(props) => props.theme.colors.primary};
  }
`;

const Tick = styled.div`
  color: white;
  font-size: 1.5vw;
  position: relative;
  left: 0.2vw;
  top: 0.2vw;
`;

const ChildrenWrapper = styled.div`
  display: inline-block;
  margin-left: 1vw;
`;

export interface CheckboxProps {
    checked: boolean;
    onChange?: (isChecked: boolean) => void;
}

export default class Checkbox extends React.Component<CheckboxProps, undefined> {
    render() {
        return (
            <Wrapper>
                <Box
                    onClick={() => {
                        if (this.props.onChange) {
                            this.props.onChange(!this.props.checked);
                        }
                    }}
                >
                    <Tick className="BoxTick">
                        {
                            (this.props.checked) ? (
                                <FontAwesomeIcon icon={faCheck.iconName} />
                            ) : (null)
                        }
                    </Tick>
                </Box>
                <ChildrenWrapper>
                    {this.props.children}
                </ChildrenWrapper>
            </Wrapper>
        );
    }
}
