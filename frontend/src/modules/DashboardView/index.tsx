import * as React from 'react';

import { IconName } from '@fortawesome/fontawesome-svg-core';
import { OmigostModule, OmigostApp, OmigostModulesLoaderInterface } from 'modules/ModulesLoader';

export default class DashBoardViewModule implements OmigostModule {
    onLoad(app: OmigostApp, loader: OmigostModulesLoaderInterface) {
        
    }
    
    renderDashboardView(props: any) {
        return (
            <div>
                Hello!
            </div>
        );
    }
    
    getIcon(): IconName {
        return 'chart-bar';
    }
    
    getName(): string {
        return 'dashboard-view';
    }
};