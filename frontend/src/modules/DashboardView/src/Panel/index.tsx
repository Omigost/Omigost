import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import widgetsFactory from "../widgets";

import {
    faWrench, faHistory, faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Box, Flex } from "@rebass/grid";

const CursorIcon = styled.div`
    margin-right: 0.3vw;
    display: inline-block;
`;

const HeaderOptions = styled.div`
    display: inline-block;
    font-size: 1vw;
`;

const DATA = {
    columns: [
        {
            name: "x",
            type: "date",
            parseFormat: "YYYY-MM-DD HH:mm",
            cursorFormat: "YYYY-MM-DD HH:mm",
            axisFormat: "HH:mm",
            cursorPrefix: (<CursorIcon><FontAwesomeIcon icon="clock" /></CursorIcon>),
        },
        {
            name: "y",
            type: "number",
            prefix: "$ ",
            cursorPrefix: (<CursorIcon><FontAwesomeIcon icon="dollar-sign" /></CursorIcon>),
        },
        {
            name: "z",
            type: "number",
            prefix: "z = ",
            generator: (column, row) => (5 - row.p) * (8 - row.p) * 0.3 + 0.8 * row.y,
        },
        {
            name: "p",
            type: "number",
            prefix: "p = ",
        },
    ],
    rows: [
        {x: "2018-12-10 12:30", p: 1, y: 10},
        {x: "2018-12-10 13:30", p: 2, y: 15},
        {x: "2018-12-10 14:30", p: 3, y: 20},
        {x: "2018-12-10 15:30", p: 4, y: 15},
        {x: "2018-12-10 16:30", p: 5, y: 15},
        {x: "2018-12-10 17:30", p: 6, y: 10},
        {x: "2018-12-10 18:30", p: 7, y: 11},
        {x: "2018-12-10 19:30", p: 8, y: 11},
        {x: "2018-12-10 20:30", p: 9, y: 4},
        {x: "2018-12-10 21:30", p: 10, y: 6},
        {x: "2018-12-10 22:30", p: 11, y: 8},
        {x: "2018-12-10 23:30", p: 12, y: 5},
    ],
};

const PanelHeader = styled.div`
  font-family: ${(props) => props.theme.primaryFont};
  font-size: ${(props) => props.theme.fontSize["XXL"]};
  color: #727277;
  margin-left: 1vw;
  margin-top: 2vw;
`;

const WidgetDialogCardListContainer = styled.div`
  width: 60vw;
`;

interface PanelState {
    draggableMode: boolean;
    layout: any;
}

const PreviewWidgetMask = styled.div`
    width: 100%;
    height: 10vw;
    position: relative;
    top: -220%;
    z-index: 9999999;
    background: transparent;
`;

const PreviewWidget = styled.div`
    width: 200%;
    height: 200%;
    background: white;
    overflow: hidden;
    transform: scale(0.5) translateX(-15vw) translateY(-8vw);
    user-select: none;
    pointer-events: none;
`;

const PreviewWidgetContent = styled.div`
    width: 100%;
    height: 50vw;
    padding-top: 1vw;
`;

export default class Panel extends React.Component<any, PanelState> {

    state: PanelState;

    constructor(props) {
        super(props);
        
        this.state = {
            draggableMode: false,
            layout: this.props.settings.layout,
        };
    }

    render() {
        return (
            <this.props.app.UI.FloatingActionConsumer>
                {({ showAction, cancelAction }) => {
                    return (
                        <this.props.app.UI.DialogsConsumer>
                            {({ openDialog }) => {
                                return (
                                    <this.props.app.UI.DataProvider
                                        data={DATA}
                                    >
                                        <PanelHeader>
                                            Budgets dashboard
                                            
                                            <this.props.app.UI.Dialog
                                                name="add-widget-dialog"
                                                transparent
                                            >
                                                {({ closeDialog, parameters }) => {
                                                    return (
                                                        <WidgetDialogCardListContainer>
                                                            <this.props.app.UI.CardVerticalList
                                                                disableHoverAnimaions
                                                                onSelected={(item) => {
                                                                    console.log(item);
                                                                    const widget = widgetsFactory(this.props.app).find(w => w.name === item.name);
                                                                    const newLayout = this.props.app.UI.addItemToInteractiveGrid2Layout(this.state.layout, widget);
                                                                    
                                                                    console.log("THAT WILL BE NEW LAYOUT");
                                                                    console.log(newLayout);
                                                                    
                                                                    this.setState({
                                                                        layout: newLayout,
                                                                    }, () => { closeDialog() });
                                                                }}
                                                                items={widgetsFactory(this.props.app).map(widget => {
                                                                    return {
                                                                        name: widget.name,
                                                                        description: widget.description,
                                                                        value: widget.name,
                                                                        header: () => (
                                                                            <>
                                                                                <PreviewWidget>
                                                                                    <PreviewWidgetContent>
                                                                                        {widget.content(widget.initialOptions || {})}
                                                                                    </PreviewWidgetContent>
                                                                                </PreviewWidget>
                                                                                <PreviewWidgetMask>
                                                                                </PreviewWidgetMask>
                                                                            </>
                                                                        ),
                                                                    };
                                                                })}
                                                            />
                                                        </WidgetDialogCardListContainer>
                                                    );
                                                }}
                                            </this.props.app.UI.Dialog>
                                    
                                            <HeaderOptions>
                                                <this.props.app.UI.TinyButtons
                                                    items={[
                                                        {
                                                            icon: faWrench.iconName,
                                                            tooltip: "Customize layout",
                                                            tooltipClickTrigger: false,
                                                            onClick: () => {
                                                                this.setState({
                                                                    draggableMode: !this.state.draggableMode,
                                                                });
                                                            },
                                                        },
                                                        {
                                                            icon: faHistory.iconName,
                                                            tooltip: "Reset layout",
                                                            tooltipClickTrigger: false,
                                                            onClick: () => {
                                                                this.props.app.module.resetSettings();
                                                            },
                                                        },
                                                        {
                                                            icon: faPlus.iconName,
                                                            tooltip: "Add new widget",
                                                            tooltipClickTrigger: false,
                                                            onClick: () => {
                                                                openDialog("add-widget-dialog");
                                                            },
                                                        },
                                                    ]}
                                                />
                                            </HeaderOptions>
                                        </PanelHeader>

                                        <this.props.app.UI.InteractiveGrid2
                                            enableActionDrag={this.state.draggableMode}
                                            enableActionRemove={this.state.draggableMode}
                                            enableActionResize={this.state.draggableMode}
                                            enableActionSettings={this.state.draggableMode}
                                            layout={this.state.layout}
                                            onLayoutChange={(layout) => {
                                                showAction({
                                                    title: "Save the layout",
                                                    description: "Current layout was not saved click here to save it.",
                                                    options: [
                                                        {
                                                            icon: faWrench.iconName,
                                                            description: "Save the layout",
                                                            onClick: () => {
                                                                this.props.app.module.setSettings({
                                                                    layout: this.state.layout,
                                                                });
                                                                cancelAction();
                                                            },
                                                        },
                                                    ],
                                                });
                                                
                                                console.log("LAYOUT CHANGED");
                                                console.log(layout);
                                                
                                                this.setState({
                                                    layout,
                                                });
                                            }}
                                            items={widgetsFactory(this.props.app)}
                                        />

                                    </this.props.app.UI.DataProvider>
                                );
                            }}
                        </this.props.app.UI.DialogsConsumer>
                    );
                }}
            </this.props.app.UI.FloatingActionConsumer>
        );
    }
}