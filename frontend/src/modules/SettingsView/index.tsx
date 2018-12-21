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