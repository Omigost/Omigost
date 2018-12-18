import * as React from 'react';

import { IconName } from '@fortawesome/fontawesome-svg-core';
import { OmigostModule, OmigostApp, OmigostModulesLoaderInterface } from 'modules/ModulesLoader';

export default class SettingsViewModule implements OmigostModule {
    app: OmigostApp;
    
    onLoad(app: OmigostApp, loader: OmigostModulesLoaderInterface) {
        this.app = app;
    }
    
    renderDashboardView(props: any) {
        return (
            <div>
                <this.app.UI.ButtonPanel>
                    Heheszki
                </this.app.UI.ButtonPanel>
            </div>
        );
    }
    
    getIcon(): IconName {
        return 'tools';
    }
    
    getName(): string {
        return 'settings-view';
    }
};