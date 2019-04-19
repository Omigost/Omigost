
import { IconName } from "@fortawesome/fontawesome-svg-core";

import OmigostClient, { OmigostClientInterface } from "../client/OmigostClient";
import OmigostUI from "../components/universal/index";

import { Schema } from "../components/universal/Form/schemaTypes";

import BudgetsViewModule from "./BudgetsView";
import DashboardViewModule from "./DashboardView";
import SettingsViewModule from "./SettingsView";
import UsersViewModule from "./UsersView";

const BUILTIN_MODULES: Array<OmigostModule> = [
    new DashboardViewModule(),
    new BudgetsViewModule(),
    new SettingsViewModule(),
    new UsersViewModule(),
];

export interface OmigostApp {
    UI: any;
    modulesLoader: OmigostModulesLoaderInterface;
    client: OmigostClientInterface;
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
    renderDashboardView?(props: any): React.ReactElement<any> | null;
    getRoutes?(): Array<OmigostModuleRoute>;
    getSettingsForm?(): Schema;
}

export type ModuleSource = String | OmigostModule;

export interface OmigostModuleRoute {
    name: string;
    component: React.ReactNode;
}

export interface OmigostModulesStore {
    getAll(): Array<OmigostModuleInstance>;
    put(instance: OmigostModuleInstance): Array<OmigostModuleInstance>;
    enable(instance: OmigostModuleInstance): void;
    disable(instance: OmigostModuleInstance): void;
}

export interface OmigostModulesLoaderInterface {
    loadModule(src: ModuleSource);
    loadAllModules(srcs: Array<ModuleSource>);
    getActiveModules(): Array<OmigostModule>;
    getAllModules(): Array<OmigostModule>;
    getRegisteredRoutes(): Array<OmigostModuleRoute>;
    setStore(store: OmigostModulesStore);
}

export interface OmigostModuleInstance {
    activated: boolean;
    module: OmigostModule;
    enable: () => void;
    disable: () => void;
}

export default class OmigostModulesLoader implements OmigostModulesLoaderInterface {
    modulesStore: OmigostModulesStore;

    constructor() {
        this.modulesStore = null;
    }
    
    setStore(store: OmigostModulesStore) {
        this.modulesStore = store;
    }

    getApp(): OmigostApp {
        return {
            UI: OmigostUI,
            modulesLoader: this,
            client: OmigostClient,
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
            
            const inst = {
                enable: () => this.enableModule(modInst),
                disable: () => this.disableModule(modInst),
                activated: true,
                module: modInst,
            };
            
            this.modulesStore.put(inst);
            modInst.onLoad(this.getApp(), this);
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