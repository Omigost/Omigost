import * as React from "react";
import styled  from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./index.scss";

const Wrapper = styled.div``;

const GridWrapper = styled.div`
  padding: 1.2vw;
  width: 100vw;
  position: relative;
`;

export interface ItemType {
    content?: any;
}

export interface RenderItemArgs {
    item: ItemType;
}

export interface InteractiveGridProps {
    items: Array<ItemType>;
}

interface InteractiveGridState {
    items: Array<ItemType>;
}

const CardBoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 1vw;
  border-radius: 0.5vw;
  background: #ffffff;
  box-shadow: 0 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1);
`;

const CardBoxHandle = styled.div`
  display: inline-block;
  color: ${(props) => props.theme.colors.accent};
  opacity: 0.3;
  position: relative;
  top: 0.2vw;
  left: 0.2vw;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const CardBoxRemove = styled.div`
  display: inline-block;
  color: ${(props) => props.theme.colors.accent};
  opacity: 0.3;
  position: relative;
  top: 0.2vw;
  left: 0.2vw;
  cursor: pointer;
  margin-left: 0.4vw;

  &:hover {
    opacity: 1;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const CardBoxContent = styled.div`
    margin: 1vw;
    height: 89%;
`;

class ShowcaseLayout extends React.Component {

    static defaultProps = {
        className: "layout",
        rowHeight: 30,
        onLayoutChange: () => {},
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        initialLayout: [],
    };


    constructor(props) {
        super(props);
        this.state = {
            currentBreakpoint: "lg",
            compactType: "vertical",
            mounted: false,
            items: this.props.items,
        };

        this.generateDOM = this.generateDOM.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.onCompactTypeChange = this.onCompactTypeChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
        this.generateLayouts = this.generateLayouts.bind(this);
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    onRemoveItem(index) {
        this.setState({
            items: this.state.items.filter((item, i) => i !== index),
        });
    }

    generateLayouts() {
        return {
            lg: this.state.items.map((item, i) => {
                return {
                    x: 0,
                    y: 0,
                    w: item.width,
                    h: item.height,
                    i: i.toString(),
                    content: item.content,
                    static: item.static,
                };
            }),
        };
    }

    generateDOM() {
        return this.generateLayouts().lg.map((l, i) => {
            return (
                <CardBoxWrapper key={i} className={l.static ? "static" : ""}>
                    {
                        (this.props.enableActionDrag !== false) ? (
                            <CardBoxHandle className="handle">
                                <FontAwesomeIcon icon="expand" />
                            </CardBoxHandle>
                        ) : (null)
                    }
                    {
                        (this.props.enableActionRemove !== false) ? (
                            <CardBoxRemove onClick={() => this.onRemoveItem(i)}>
                                <FontAwesomeIcon icon="times" />
                            </CardBoxRemove>
                        ) : (null)
                    }
                    <CardBoxContent>
                        {l.content}
                    </CardBoxContent>
                </CardBoxWrapper>
            );
        });
    }

    onBreakpointChange(breakpoint) {
        this.setState({
            currentBreakpoint: breakpoint,
        });
    }

    onCompactTypeChange() {
        const { compactType: oldCompactType } = this.state;
        const compactType =
            oldCompactType === "horizontal"
                ? "vertical"
                : oldCompactType === "vertical" ? null : "horizontal";
        this.setState({ compactType });
    }

    onLayoutChange (layout, layouts) {
        if (this.props.onLayoutChange) {
            this.props.onLayoutChange(layout, layouts);
        }
    }

    render() {
        return (
            <div>
                <ResponsiveReactGridLayout
                    {...this.props}
                    isDraggable={(this.props.enableActionDrag !== false)}
                    isResizable={(this.props.enableActionResize !== false)}
                    layouts={this.generateLayouts()}
                    onBreakpointChange={this.onBreakpointChange}
                    onLayoutChange={this.onLayoutChange}
                    // WidthProvider option
                    measureBeforeMount={false}
                    // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                    // and set `measureBeforeMount={true}`.
                    useCSSTransforms={this.state.mounted}
                    compactType={this.state.compactType}
                    preventCollision={!this.state.compactType}
                    draggableHandle=".handle"
                >
                    {this.generateDOM()}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

export default ShowcaseLayout;