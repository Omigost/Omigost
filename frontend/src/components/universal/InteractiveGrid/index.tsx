import * as React from "react";
import styled  from "styled-components";

import "./index.scss";

import MuuriGrid from "react-muuri";

const Wrapper = styled.div`
  padding: 1.2vw;
  width: 100vw;

`;

export interface RenderItemArgs<ItemType> {
    item: ItemType;
}

export interface InteractiveGridProps<ItemType> {
    renderItem: (props: RenderItemArgs<ItemType>) => React.ReactNode;
    items: Array<ItemType>;
    onMove?: (items: Array<ItemType>) => void;
    muuriOptions?: any;
}

interface InteractiveGridState<ItemType> {
    items: Array<ItemType>;
}

export default class InteractiveGrid<ItemType> extends React.Component<InteractiveGridProps<ItemType>, InteractiveGridState<ItemType>> {
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
            <div>
                <Wrapper ref={gridElement => this.gridElement = gridElement}>
                    {
                        this.props.items.map((item: ItemType) => {
                            return (
                                <div className="item box1">
                                    <div className="item-content">
                                      {this.props.renderItem({
                                          item,
                                      })}
                                    </div>
                                </div>
                            );
                        })
                    }
                </Wrapper>
            </div>
        );
    }
}
