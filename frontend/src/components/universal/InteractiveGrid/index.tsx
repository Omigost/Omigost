import * as React from "react";
import styled  from "styled-components";

import "./index.scss";

import MuuriGrid from "react-muuri";

const Wrapper = styled.div``;

const GridWrapper = styled.div`
  padding: 1.2vw;
  width: 80vw;
  position: relative;
`;

export interface ItemType {
    content?: any;
    height?: number;
    width?: number;
}

export interface RenderItemArgs<ItemT> {
    item: ItemT;
}

export interface InteractiveGridProps {
    renderItem?: (props: RenderItemArgs<ItemType>) => React.ReactNode;
    items: Array<ItemType>;
    onMove?: (items: Array<ItemType>) => void;
    muuriOptions?: any;
}

interface InteractiveGridState {
    items: Array<ItemType>;
}

const CardBoxWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 1vw;
    border-radius: 0.5vw;
    background: #ffffff;
    box-shadow: 0 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1);
`;


export default class InteractiveGrid extends React.Component<InteractiveGridProps, InteractiveGridState> {
    grid: any = null;
    gridElement: any = null;

    constructor(props) {
        super(props);

        this.removeElement = this.removeElement.bind(this);
    }

    componentDidMount() {
        this.grid = new MuuriGrid({
            node: this.gridElement,
            defaultOptions: {
                dragEnabled: true,
                ...this.props.muuriOptions,
            },
        });
        this.grid.getEvent("dragEnd");
    }

    componentWillUnmount() {
        this.grid.getMethod("destroy");
    }

    removeElement() {
        if (this.gridElement && this.gridElement.children.length) {
            this.grid.getMethod("remove", this.gridElement.children[0], {removeElements: true});
        }
    }

    render() {
        return (
            <Wrapper>
                <GridWrapper ref={gridElement => this.gridElement = gridElement}>
                    {
                        this.props.items.map((item: ItemType, index: number) => {
                            return (
                                <div
                                    key={`grid-item-${index}`}
                                    className={`item h${item.height || 1} w${item.width || 1} blue`}
                                >
                                    <div className="item-content">
                                      {
                                          (item.content) ? (
                                              <CardBoxWrapper>
                                                  <div style={{
                                                      width: `${item.width / 7 * 60}vw`,
                                                  }}>
                                                    {item.content}
                                                  </div>
                                              </CardBoxWrapper>
                                          ) : (
                                              this.props.renderItem({
                                                  item,
                                              })
                                          )
                                      }
                                    </div>
                                </div>
                            );
                        })
                    }
                </GridWrapper>
            </Wrapper>
        );
    }
}
