import * as React from "react";

import { IconName } from "@fortawesome/fontawesome-svg-core";
import { OmigostApp, OmigostModule, OmigostModulesLoaderInterface } from "modules/ModulesLoader";

import Panel from "./src/Panel";

export default class DashBoardViewModule implements OmigostModule {
    app: OmigostApp;

    onLoad(app: OmigostApp, loader: OmigostModulesLoaderInterface) {
        this.app = app;
    }

    renderDashboardView(props: any) {
        return (
            <Panel app={this.app} />
        );
    }

    getDetails() {
        return {};
    }

    getIcon(): IconName {
        return "chart-bar";
    }

    getName(): string {
        return "dashboard-view";
    }

    getMenuName(): string {
        return "Dashboard";
    }
}