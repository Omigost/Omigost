import * as React from "react";
import styled  from "styled-components";

import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Popover from "components/Popover";
import Tooltip from "components/Tooltip";

const Wrapper = styled.div`
  padding: 0;
`;

interface PanelButtonProps {
  theme?: any;
  onClick?: () => void;
  active?: boolean;
}

const PanelButton = styled.div<PanelButtonProps>`
  padding: 0.3vw;
  display: inline-block;
  margin-left: 0.1vw;
  margin-right: 0.1vw;
  color: ${(props: PanelButtonProps) => (props.active) ? (props.theme.colors.lightAccent) :(props.theme.colors.primary)};
  background: ${(props: PanelButtonProps) => (props.active) ? (props.theme.colors.primary) :("transparent")};
  cursor: pointer;

  &:hover {
    color: ${(props: PanelButtonProps) => props.theme.colors.lightAccent};
    background: ${(props: PanelButtonProps) => props.theme.colors.primary};
  }
`;

const IconLabel = styled.span`
  margin-left: 0.3vw;
`;

export interface ButtonSpecs {
    icon: IconName;
    active?: boolean;
    onClick?: () => void;
    text?: string;
    tooltip?: React.ReactElement<any>;
    popover?: React.ReactElement<any>;
}

export interface TinyButtonsProps {
    children: Array<ButtonSpecs | null>;
    info?: string | React.ReactElement<any>;
}

class TinyButtons extends React.Component<TinyButtonsProps, any> {

    render() {
        const buttons = (this.props.children || []).filter(button => !!button);

        if (this.props.info) {
            buttons.push({
                icon: "question-circle",
                tooltip: (
                    <div>
                        {this.props.info}
                    </div>
                ),
            });
        }

        return (
            <Wrapper>
                {
                    buttons.map((button: ButtonSpecs, index: number) => {
                        let contentNode = (
                            <span>
                                <FontAwesomeIcon icon={button.icon} />
                                {
                                    (button.text) ? (
                                        <IconLabel>
                                            {button.text}
                                        </IconLabel>
                                    ) :(null)
                                }
                            </span>
                        );

                        if (button.popover) {
                            contentNode = (
                                <Popover
                                    content={button.popover}
                                >
                                    {contentNode}
                                </Popover>
                            );
                        }

                        if (button.tooltip) {
                            contentNode = (
                                <Tooltip
                                    content={button.tooltip}
                                    clickTrigger
                                >
                                    {contentNode}
                                </Tooltip>
                            );
                        }

                        return (
                            <PanelButton
                                key={`panel-button-${index}`}
                                onClick={button.onClick}
                                active={button.active}
                            >
                                {contentNode}
                            </PanelButton>
                        );
                    })
                }
            </Wrapper>

        );
    }
}

export default TinyButtons;