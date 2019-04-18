
import { IconName } from "@fortawesome/fontawesome-svg-core";

import OmigostClient, { OmigostClientInterface } from "../client/OmigostClient";
import OmigostUI from "../components/universal/index";

import BudgetsViewModule from "./BudgetsView";
import DashboardViewModule from "./DashboardView";
import SettingsViewModule from "./SettingsView";

const BUILTIN_MODULES: Array<OmigostModule> = [
    new DashboardViewModule(),
    new BudgetsViewModule(),
    new SettingsViewModule(),
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
}

export type ModuleSource = String | OmigostModule;

export interface OmigostModuleRoute {
    name: string;
    component: React.ReactNode;
}

export interface OmigostModulesLoaderInterface {
    loadModule(src: ModuleSource);
    loadAllModules(srcs: Array<ModuleSource>);
    getActiveModules(): Array<OmigostModule>;
    getAllModules(): Array<OmigostModule>;
    getRegisteredRoutes(): Array<OmigostModuleRoute>;
}

export interface OmigostModuleInstance {
    activated: boolean;
    module: OmigostModule;
    enable: () => void;
    disable: () => void;
}

export default class OmigostModulesLoader implements OmigostModulesLoaderInterface {
    modules: Array<OmigostModuleInstance>;

    constructor() {
        this.modules = [];
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
        this.modules.forEach(instance => {
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
        this.modules.find(item => item.module === module).activated = true;
    }

    disableModule(module: OmigostModule) {
        this.modules.find(item => item.module === module).activated = false;
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
            const inst = {
                enable: () => this.enableModule(modInst),
                disable: () => this.disableModule(modInst),
                activated: true,
                module: modInst,
            };
            this.modules.push(inst);
            modInst.onLoad(this.getApp(), this);
        }
    }

    loadAllModules(srcs: Array<ModuleSource>) {
        srcs.forEach(module => this.loadModule(module));
    }

    getAllModuleInstances() {
        return this.modules.map(instance => instance);
    }

    getModule(name: string): OmigostModule {
        return this.modules.find(instance => instance.module.getName() === name).module;
    }

    getAllModules() {
        return this.modules.map(instance => instance.module);
    }

    getActiveModules() {
        return this.modules.filter(instance => instance.activated).map(instance => instance.module);
    }
}