import * as React from "react";
import styled from "styled-components";

import SideMenu, { MenuOption } from "components/SideMenu";
import { withModules, ModulesLoader } from "modules/ModulesProvider";
import { Route } from "react-router";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { History } from "history";

const Wrapper = styled.aside`
  width: 100%;
`;

const PanelContentWrapper = styled.div`
  padding-left: 8vw;
  position: absolute;
  left: 0;
  top: 0;
  width: 90vw;
  max-width: 90vw;
`;

export interface DashboardPanelMatchParams {
    url?: string;
}

export interface DashboardPanelProps extends RouteComponentProps<DashboardPanelMatchParams> {
    modulesLoader?: ModulesLoader;
    history: History;
}

interface DashboardPanelState {
    selectedOptionIndex: number | null;
}

class DashboardPanel extends React.Component<DashboardPanelProps, DashboardPanelState> {

    state: DashboardPanelState = {
        selectedOptionIndex: null,
    };

    constructor(props) {
        super(props);

        this.handleSideMenuSelection = this.handleSideMenuSelection.bind(this);
    }

    handleSideMenuSelection(menuOption: MenuOption, index: number) {
        const modules = this.props.modulesLoader.getActiveModules();

        this.props.history.push(`${this.props.match.url}/${modules[index].getName()}`);
    }

    render() {
        if (!this.props.modulesLoader) {
            return null;
        }

        const modules = this.props.modulesLoader.getActiveModules();

        return (
            <Wrapper>
                <SideMenu
                    selectedOption={this.state.selectedOptionIndex}
                    onSectionChanged={this.handleSideMenuSelection}
                    options={
                        modules.map(module => {
                            return {
                                name: ((module.getMenuName) ? (module.getMenuName()) : (module.getName() || "Anonymous module")),
                                icon: module.getIcon() || "chart-bar",
                            };
                        })
                    }
                />
                <PanelContentWrapper>
                    {
                        modules.map(module => {
                            return (
                                <Route
                                    path={`${this.props.match.url}/${module.getName()}`}
                                    component={() => {
                                        return module.renderDashboardView(null);
                                    }}
                                />
                            );
                        })
                    }
                </PanelContentWrapper>
            </Wrapper>
        );
    }
}

export default withModules(withRouter(DashboardPanel));