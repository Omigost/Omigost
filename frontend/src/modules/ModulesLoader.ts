
import { IconName } from "@fortawesome/fontawesome-svg-core";

import OmigostClient, { OmigostClientInterface } from "../client/OmigostClient";
import OmigostUI from "../components/universal/index";

import { Schema } from "../components/universal/Form/schemaTypes";

import BudgetsViewModule from "./BudgetsView";
import DashboardViewModule from "./DashboardView";
import SettingsViewModule from "./SettingsView";
import UsersViewModule from "./UsersView";
import DesignGuideViewModule from "./DesignGuideView";

const BUILTIN_MODULES: Array<OmigostModule> = [
    new DashboardViewModule(),
    new BudgetsViewModule(),
    new SettingsViewModule(),
    new UsersViewModule(),
    new DesignGuideViewModule(),
];

export type OmigostModuleRenderInterceptor = (module: OmigostModule, props: any, next: (props: any, settings: any) => React.ReactElement<any>) => React.ReactElement<any>;

export interface OmigostAppModuleHelper {
    setSettings: (settings: any) => void;
    resetSettings: () => void;
}

export interface OmigostApp {
    UI: any;
    modulesLoader: OmigostModulesLoaderInterface;
    client: OmigostClientInterface;
    module: OmigostAppModuleHelper;
}

export interface OmigostModuleDetails {
    description?: string;
    author?: string;
    version?: string;
    lastUpdate?: string;
}

export interface OmigostModule {
    onLoad(app: OmigostApp, loader: OmigostModulesLoaderInterface);
    getIcon(): IconName | null;
    getName(): string | null;
    getMenuName?(): string;
    getDetails(): OmigostModuleDetails;
    renderDashboardView?(props: any, settings?: any): React.ReactElement<any> | null;
    getRoutes?(): Array<OmigostModuleRoute>;
    getSettingsForm?(): Schema;
    getInitialSettings?(): any;
}

export type ModuleSource = String | OmigostModule;

export interface OmigostModuleRoute {
    name: string;
    component: React.ReactNode;
}

export interface OmigostModulesStore {
    getAll(): Array<OmigostModuleInstance>;
    put(instance: OmigostModuleInstance): void;
    enable(module: OmigostModule): void;
    disable(module: OmigostModule): void;
    setSettings(module: OmigostModule, settings: any): void;
}

export interface OmigostModulesLoaderInterface {
    loadModule(src: ModuleSource);
    loadAllModules(srcs: Array<ModuleSource>);
    getActiveModules(): Array<OmigostModule>;
    getAllModules(): Array<OmigostModule>;
    getRegisteredRoutes(): Array<OmigostModuleRoute>;
    setStore(store: OmigostModulesStore);
    resetModuleSettings(module: OmigostModule);
}

export interface OmigostModuleInstance {
    activated: boolean;
    module: OmigostModule;
    enable: () => void;
    disable: () => void;
}

export default class OmigostModulesLoader implements OmigostModulesLoaderInterface {
    modulesStore: OmigostModulesStore;
    renderInterceptor: OmigostModuleRenderInterceptor;
    
    constructor() {
        this.modulesStore = null;
        this.renderInterceptor = null;
    }
    
    setRenderInterceptor(renderInterceptor: OmigostModuleRenderInterceptor) {
        this.renderInterceptor = renderInterceptor;
    }
    
    setStore(store: OmigostModulesStore) {
        this.modulesStore = store;
    }

    getApp(instance: OmigostModuleInstance): OmigostApp {
        return {
            UI: OmigostUI,
            modulesLoader: this,
            client: OmigostClient,
            module: {
                setSettings: (settings: any) => {
                    this.modulesStore.setSettings(instance.module, settings);
                },
                resetSettings: () => {
                    this.resetModuleSettings(instance.module);
                },
            },
        };
    }

    getRegisteredRoutes() {
        let routes: Array<OmigostModuleRoute> = [];
        this.modulesStore.getAll().forEach(instance => {
            if (instance.module.getRoutes) {
                routes = routes.concat(
                    instance.module.getRoutes()
                      .filter(e => !!e)
                      .map(route => {
                          return {
                              name: "/" + instance.module.getName() + "-" + route.name,
                              component: route.component,
                          };
                      }),
                );
            }
        });

        return routes;
    }

    enableModule(module: OmigostModule) {
        this.modulesStore.enable(module);
    }

    disableModule(module: OmigostModule) {
        console.error("TRIGGER DISABLE MODULE!");
        console.log(module);
        this.modulesStore.disable(module);
    }

    resetModuleSettings(module: OmigostModule) {
        this.modulesStore.setSettings(module, (module.getInitialSettings) ? ({ ...module.getInitialSettings() }) : ({}));
    }
    
    loadModule(src: ModuleSource) {
        let modInst: OmigostModule = null;
        if (typeof src === "string") {
            const builtinModulesSearchResult: OmigostModule = BUILTIN_MODULES.filter(module => module.getName() === src)[0];
            if (builtinModulesSearchResult) {
                modInst = builtinModulesSearchResult as OmigostModule;
            }
        } else {
            modInst = src as OmigostModule;
        }

        if (modInst) {
                        
            if (this.modulesStore.getAll().find(inst => modInst.getName() === inst.module.getName())) {
                return;
            }
            
            if (this.renderInterceptor) {
                const renderDashboardViewOriginal = modInst.renderDashboardView;
                modInst.renderDashboardView = (props, settings) => {
                    return this.renderInterceptor(modInst, props, renderDashboardViewOriginal);
                };
            }
            
            const inst = {
                enable: () => this.enableModule(modInst),
                disable: () => this.disableModule(modInst),
                activated: true,
                module: modInst,
            };
            
            this.resetModuleSettings(modInst);
            
            this.modulesStore.put(inst);
            modInst.onLoad(this.getApp(inst), this);
        }
    }

    loadAllModules(srcs: Array<ModuleSource>) {
        srcs.forEach(module => this.loadModule(module));
    }

    getAllModuleInstances() {
        return this.modulesStore.getAll().map(instance => instance);
    }

    getModule(name: string): OmigostModule {
        return this.modulesStore.getAll().find(instance => instance.module.getName() === name).module;
    }

    getAllModules() {
        return this.modulesStore.getAll().map(instance => instance.module);
    }

    getActiveModules() {
        return this.modulesStore.getAll().filter(instance => instance.activated).map(instance => instance.module);
    }
}