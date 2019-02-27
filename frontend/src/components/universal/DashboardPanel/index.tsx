import * as React from 'react';
import styled from 'styled-components';

import { withModules, ModulesLoader } from 'modules/ModulesProvider';
import SideMenu, { MenuOption } from 'components/SideMenu';

const Wrapper = styled.aside`
  width: 100%;
`;

const PanelContentWrapper = styled.div`
  margin-left: 8vw;
  position: fixed;
`;

export interface DashboardPanelProps {
    modulesLoader?: ModulesLoader;
}

interface DashboardPanelState {
    selectedOptionIndex: number | null;
};

class DashboardPanel extends React.Component<DashboardPanelProps, DashboardPanelState> {
    
    constructor(props) {
        super(props);
        
        this.handleSideMenuSelection = this.handleSideMenuSelection.bind(this);
    }
    
    state: DashboardPanelState = {
        selectedOptionIndex: null
    };
    
    handleSideMenuSelection(menuOption: MenuOption, index: number) {
        this.setState({
            selectedOptionIndex: index
        });
    }
    
    render() {
        if(!this.props.modulesLoader) {
            return null;
        }
        
        console.warn("HELLO 69");
        console.log(this.props.modulesLoader);
        
        const modules = this.props.modulesLoader.getActiveModules();
        
        return (
            <Wrapper>
                <SideMenu
                    selectedOption={this.state.selectedOptionIndex}
                    onSectionChanged={this.handleSideMenuSelection}
                    options={
                        modules.map(module => {
                            return {
                                name: module.getName() || 'Anonymous module',
                                icon: module.getIcon() || 'chart-bar'
                            };
                        })
                    }
                />
                <PanelContentWrapper>
                    {
                        (this.state.selectedOptionIndex === null)?(null):(
                            modules[this.state.selectedOptionIndex].renderDashboardView(null)
                        )
                    }
                </PanelContentWrapper>
            </Wrapper>
        );
    }
}

export default withModules(DashboardPanel);