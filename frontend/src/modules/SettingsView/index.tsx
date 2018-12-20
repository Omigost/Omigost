import * as React from 'react';
import styled  from 'styled-components';


import { IconName } from '@fortawesome/fontawesome-svg-core';
import { OmigostModule, OmigostApp, OmigostModulesLoaderInterface } from 'modules/ModulesLoader';

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

const SETTINGS_OPTIONS = [
    {
        name: 'Dump configs',
        options: [
            {
                name: 'Export settings',
                icon: 'download'
            },
            {
                name: 'Import settings',
                icon: 'upload'
            }
        ]
    },
    {
        name: 'Customize',
        options: [
            {
                name: 'Security',
                icon: 'shield-alt'
            },
            {
                name: 'Notification settings',
                icon: 'comment-alt'
            },
            {
                name: 'Instance settings',
                icon: 'flag'
            }
        ]
    },
    {
        name: 'Extend',
        options: [
            {
                name: 'Integrations and Extensions',
                icon: 'plus'
            }
        ]
    }
];

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
                <this.app.UI.InteractiveNestedGrid
                    options={SETTINGS_OPTIONS}
                    renderItem={(props) => {
                        return (
                            <this.app.UI.ButtonPanel
                                icon={props.item.icon}
                            >
                                {props.item.name}
                            </this.app.UI.ButtonPanel>
                        );
                    }}
                />
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