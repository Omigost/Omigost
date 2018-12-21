import * as React from 'react';
import styled  from 'styled-components';


import { IconName } from '@fortawesome/fontawesome-svg-core';
import { OmigostModule, OmigostApp, OmigostModulesLoaderInterface } from 'modules/ModulesLoader';

import Panel from './src/Panel';

const Wrapper = styled.div`
  margin-left: 5vw;
  position: relative;
  margin-top: 1vw;
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

export default class SettingsViewModule implements OmigostModule {
    app: OmigostApp;
    
    onLoad(app: OmigostApp, loader: OmigostModulesLoaderInterface) {
        this.app = app;
    }
    
    getDetails() {
        return {
            description: 'The builtin module to display settings view.'
        };
    }
    
    getRoutes() {
        return [{
            name: 'test',
            component: ((props) => <div>HELLOO TEST ROUTE!</div>)
        }];
    }
    
    renderDashboardView(props: any) {
        return (
            <Wrapper>
                <Panel app={this.app} />
                <this.app.UI.SearchableList
                    renderItem={(item) => {
                        return (
                            <this.app.UI.Card>
                                {item.name}
                                {(item.details.description)?(item.details.description):(null)}
                            </this.app.UI.Card>
                        );
                    }}
                >
                    {
                        this.app.modulesLoader.getAllModules().map(module => ({ name: module.getName(), details: module.getDetails() }))
                    }
                </this.app.UI.SearchableList>
            </Wrapper>
        );
    }
    
    getIcon(): IconName {
        return 'tools';
    }
    
    getName(): string {
        return 'settings-view';
    }
};