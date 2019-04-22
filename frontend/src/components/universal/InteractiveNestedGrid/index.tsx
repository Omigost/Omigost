import * as React from "react";
import styled  from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconName } from "@fortawesome/fontawesome-svg-core";
import ButtonPanel from "components/ButtonPanel";
import InteractiveGrid, { RenderItemArgs } from "components/InteractiveGrid";

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
`;

const CategoryWrapper = styled.div`
  background: transparent;
`;

const CatogryTitle = styled.div`
  display: block;
  padding: 0.1vw;
  color: ${(props) => props.theme.colors.accent};
  font-family: ${(props) => props.theme.primaryFont};
  font-size: ${(props) => props.theme.fontSize.M};
`;

const CategoryContent = styled.div`
  padding: 1vw;
  position: relative;
`;

const NestedGridHandler = styled.span`
  position: relative;
  left: -0.3vw;
  top: -0.1vw;
  color: gray;
  opacity: 0.3;
  cursor: pointer;
  
  &:hover {
        opacity: 1;
  }
`

export interface OptionNode {
    options?: Array<OptionNode>;
    name?: string;
    icon?: IconName;
    data?: any;
}

export interface InteractiveNestedGridProps {
    showHandlers?: boolean;
    options?: Array<OptionNode>;
    renderItem?: (option: RenderItemArgs<OptionNode>) => React.ReactNode;
}

const DEFAULT_ITEM_RENDERER = (props: RenderItemArgs<OptionNode>) => {
    return (
        <ButtonPanel
            icon={props.item.icon}
        >
            {props.item.name}
        </ButtonPanel>
    );
};

export default class InteractiveNestedGrid extends React.Component<InteractiveNestedGridProps, undefined> {
    render() {
        
        const showHandlers = (this.props.showHandlers === false) ? (false) : (true);
        
        return (
            <Wrapper>
                <InteractiveGrid
                    muuriOptions={{
                        dragStartPredicate: {
                            distance: 0,
                            delay: 0,
                            handle: ".topGridWrapper",
                        },
                    }}
                    items={this.props.options || []}
                    renderItem={(props: RenderItemArgs<OptionNode>) => {
                        return (
                            <CategoryWrapper>
                                <CatogryTitle className="topGridWrapper">
                                    {
                                        (showHandlers) ? (
                                            <NestedGridHandler className="nestedGridHandler">
                                                <FontAwesomeIcon icon="expand" />
                                            </NestedGridHandler>
                                        ) : (null)
                                    }
                                    {props.item.name}
                                </CatogryTitle>
                                <CategoryContent>
                                    <InteractiveGrid
                                        muuriOptions={{
                                            dragStartPredicate: {
                                                distance: 0,
                                                delay: 0,
                                                handle: ".nestedGridHandler",
                                            },
                                        }}
                                        items={props.item.options}
                                        renderItem={(props) => {
                                            return (
                                                <div>
                                                    {
                                                        (showHandlers) ? (
                                                            <NestedGridHandler className="nestedGridHandler">
                                                                <FontAwesomeIcon icon="expand" />
                                                            </NestedGridHandler>
                                                        ) : (null)
                                                    }
                                                    {(this.props.renderItem || DEFAULT_ITEM_RENDERER)(props)}
                                                </div>
                                            );
                                        }}
                                    />
                                </CategoryContent>
                            </CategoryWrapper>
                        );
                    }}
                />
            </Wrapper>
        );
    }
}
