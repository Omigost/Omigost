import * as React from "react";
import styled  from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Responsive, WidthProvider, Layout as BaseLayout } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import Dialog from "../Dialog";
import Form from "../Form";
import { DialogsConsumer } from "../DialogProvider";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./index.scss";

const Wrapper = styled.div``;

const GridWrapper = styled.div`
  padding: 1.2vw;
  width: 100vw;
  position: relative;
`;

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

export interface InteractiveGridItem {
    name: string;
    width: number;
    height: number;
    static: boolean;
    content: (options: any) => React.ReactNode;
    initialOptions: any;
    optionsForm?: any;
}

interface Layout {
    items: Array<InteractiveGridItem>;
    positions: BaseLayout;
}

export interface InteractiveGridProps {
    items: Array<InteractiveGridItem>;
    onLayoutChange?: (layout: Layout) => void;
    enableActionDrag?: boolean;
    enableActionRemove?: boolean;
    enableActionResize?: boolean;
    enableActionSettings?: boolean;
    layout?: Layout;
}

interface InteractiveGridState {
    currentBreakpoint: string;
    compactType: string;
    mounted: boolean;
    items: Array<InteractiveGridItem>;
    layout: Layout;
}

export function addItemToLayout(layout: Layout, item: InteractiveGridItem) {
    
    if (!layout) {
        const newItem = {
            ...item,
            x: 0,
            y: 0,
            w: item.width,
            h: item.height,
            i: "0",
            content: item.content,
            static: item.static,
        };
        
        return {
            items: [newItem],
            positions: [newItem],
        };
    } else {
        const newItem = {
            ...item,
            x: 0,
            y: 0,
            w: item.width,
            h: item.height,
            i: layout.positions.length.toString(),
            content: item.content,
            static: item.static,
        };
        
        return {
            ...layout,
            items: [
                ...layout.items,
                newItem,
            ],
            positions: [
                ...layout.positions,
                newItem,
            ],
        };
    }
}

class InteractiveGrid extends React.Component<InteractiveGridProps, InteractiveGridState> {

    state: InteractiveGridState;

    static defaultProps: InteractiveGridProps = {
        items: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            currentBreakpoint: "lg",
            compactType: "vertical",
            mounted: false,
            items: [],
            layout: null,
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
    
    onSetItemOptions(index, newOptions) {
        if (this.props.onLayoutChange) {
            const positions = ((this.props.layout || { positions: null }).positions || this.state.layout);
            this.props.onLayoutChange({
                items: ((this.props.layout || { items: null }).items || this.state.items).map((item, i) => {
                    const newItem = { ...item };
                    delete newItem['content'];
                    if (i === index) {
                        newItem.options = { ...newItem.options, ...newOptions };
                    }
                    return newItem;
                }),
                positions: positions,
            });
        }
        
        this.setState({
            items: ((this.props.layout || { items: null }).items || this.state.items).map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        options: { ...item.options, ...newOptions },
                    };
                }
                return item;
            }),
        });
    }

    onRemoveItem(index) {
        
        const newItems = ((this.props.layout || { items: null }).items || this.state.items).filter((item, i) => i !== index);
        
        if (this.props.onLayoutChange) {
            const positions = ((this.props.layout || { positions: null }).positions || this.state.layout);
            this.props.onLayoutChange({
                items: newItems.map(item => {
                    const newItem = { ...item };
                    delete newItem['content'];
                    return newItem;
                }),
                positions: positions.filter((item, i) => {
                    return i !== index;
                }).map((item, i) => {
                    return {
                        ...item,
                        i: i.toString(),
                    };
                }),
            });
        }
            
        this.setState({
            items: newItems,
        });
    }

    generateLayouts() {
        if (this.props.layout) {
            return {
                lg: this.props.layout.items.map((item, index) => {
                    return {
                        ...item,
                        ...this.props.layout.positions[index],
                        content: this.props.items.find(i => i.name === item.name).content,
                    };
                }),
            };
        }
        
        return {
            lg: ((this.props.layout || { items: null }).items || this.state.items).map((item, i) => {
                return {
                    ...item,
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

    generateDOM(openDialog, closeDialog) {
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
                    {
                        (l.optionsForm && this.props.enableActionSettings !== false) ? (
                            <CardBoxRemove
                                onClick={() => openDialog("interactive-grid-settings-dialog", {
                                    form: l.optionsForm,
                                    options: (l.options || l.initialOptions),
                                    onSubmit: (data) => {
                                        closeDialog("interactive-grid-settings-dialog");
                                        this.onSetItemOptions(i, data);
                                    },
                                })}
                            >
                                <FontAwesomeIcon icon="tools" />
                            </CardBoxRemove>
                        ) : (null)
                    }
                    <CardBoxContent>
                        {l.content(l.options || l.initialOptions, (newOptions) => {
                            this.onSetItemOptions(i, newOptions);
                        })}
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

    onLayoutChange(layout: BaseLayout) {
        
        this.setState({
            layout,
        });
        
        const canDispatch = (this.props.enableActionDrag !== false) || (this.props.enableActionResize !== false) || (this.props.enableActionRemove !== false);
        if (canDispatch && this.props.onLayoutChange) {
            this.props.onLayoutChange({
                items: ((this.props.layout || { items: null }).items || this.state.items).map(item => {
                    const newItem = { ...item };
                    delete newItem['content'];
                    return newItem;
                }),
                positions: layout,
            });
        }
    }

    render() {
        return (
            <div>
                <Dialog
                    name="interactive-grid-settings-dialog"
                    minWidth={40}
                >
                    {({ closeDialog, parameters }) => {
                        return (
                            <div>
                                <Form
                                    defaultValue={parameters.options}
                                    submitButton="Save settings"
                                    onSubmit={(data) => {
                                        parameters.onSubmit(data);
                                    }}
                                >
                                    {parameters.form}
                                </Form>
                            </div>
                        );
                    }}
                </Dialog>
                <DialogsConsumer>
                    {({ openDialog, closeDialog }) => {
                        return (
                            <ResponsiveReactGridLayout
                                {...this.props}
                                isDraggable={(this.props.enableActionDrag !== false)}
                                isResizable={(this.props.enableActionResize !== false)}
                                layouts={this.generateLayouts()}
                                onBreakpointChange={this.onBreakpointChange}
                                onLayoutChange={this.onLayoutChange}
                                measureBeforeMount={false}
                                useCSSTransforms={this.state.mounted}
                                compactType={this.state.compactType}
                                preventCollision={!this.state.compactType}
                                draggableHandle=".handle"
                            >
                                {this.generateDOM(openDialog, closeDialog)}
                            </ResponsiveReactGridLayout>
                        );
                    }}
                </DialogsConsumer>
            </div>
        );
    }
}

export default InteractiveGrid;