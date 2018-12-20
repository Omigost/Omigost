import axios from 'axios'

import { IconName } from '@fortawesome/fontawesome-svg-core';

import OmigostUI from '../components/universal/index';

import DashboardViewModule from './DashboardView';
import SettingsViewModule from './SettingsView';

const BUILTIN_MODULES: Array<OmigostModule> = [
    new DashboardViewModule(),
    new SettingsViewModule()
];

export interface OmigostApp {
    UI: any;
    
};

export interface OmigostModule {
    onLoad(app: OmigostApp, loader: OmigostModulesLoaderInterface);
    getIcon(): IconName | null;
    getName(): string | null;
    renderDashboardView?(props: any): React.ReactElement<any> | null;
    getRoutes?(): Array<OmigostModuleRoute>;
};

export type ModuleSource = String | OmigostModule;

export interface OmigostModuleRoute {
    name: string;
    component: React.ReactNode;
};

export interface OmigostModulesLoaderInterface {
    loadModule(src: ModuleSource);
    loadAllModules(srcs: Array<ModuleSource>);
    getActiveModules(): Array<OmigostModule>;
    getRegisteredRoutes(): Array<OmigostModuleRoute>;
};

export interface OmigostModuleInstance {
    activated: boolean;
    module: OmigostModule;
};

export default class OmigostModulesLoader implements OmigostModulesLoaderInterface {
    modules: Array<OmigostModuleInstance>;
    
    constructor() {
        this.modules = [];
    }
    
    getApp(): OmigostApp {
        return {
            UI: OmigostUI
        };
    }
    
    getRegisteredRoutes() {
        let routes: Array<OmigostModuleRoute> = [];
        this.modules.forEach(instance => {
            if(instance.module.getRoutes) {
                routes = routes.concat(
                    instance.module.getRoutes()
                      .filter(e => !!e)
                      .map(route => {
                          return {
                              name: '/' + instance.module.getName() + '-' + route.name,
                              component: route.component
                          };
                      })
                );
            }
        });
        
        return routes;
    }
    
    loadModule(src: ModuleSource) {
        let modInst: OmigostModule = null;
        if(typeof src === 'string') {
            const builtinModulesSearchResult: OmigostModule = BUILTIN_MODULES.filter(module => module.getName() === src)[0];
            if(builtinModulesSearchResult) {
                modInst = builtinModulesSearchResult as OmigostModule;
            }
        } else {
            modInst = src as OmigostModule;
        }
        
        if(modInst) {
            this.modules.push({
                activated: true,
                module: modInst
            });
            modInst.onLoad(this.getApp(), this);
        }
    }
    
    loadAllModules(srcs: Array<ModuleSource>) {
        srcs.forEach(module => this.loadModule(module));
    }
    
    getActiveModules() {
        return this.modules.filter(instance => instance.activated).map(instance => instance.module);
    }
};