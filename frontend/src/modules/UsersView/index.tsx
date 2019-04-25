import * as React from "react";

import { IconName } from "@fortawesome/fontawesome-svg-core";
import { OmigostApp, OmigostModule, OmigostModulesLoaderInterface } from "modules/ModulesLoader";

import Panel from "./src/Panel";

import {
    faAddressCard,
} from "@fortawesome/free-solid-svg-icons";

export default class BudgetsViewModule implements OmigostModule {
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
        return faAddressCard.iconName;
    }

    getName(): string {
        return "users-view";
    }

    getMenuName(): string {
        return "User accounts";
    }

}