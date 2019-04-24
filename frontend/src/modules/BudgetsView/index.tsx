import * as React from "react";

import { IconName } from "@fortawesome/fontawesome-svg-core";
import { OmigostApp, OmigostModule, OmigostModulesLoaderInterface } from "modules/ModulesLoader";

import Panel from "./src/Panel";

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
        return "money-bill-alt";
    }

    getName(): string {
        return "budgets-view";
    }

    getMenuName(): string {
        return "Your budgets";
    }
    
    getSettingsForm() {
        return {
            title: "A registration form",
            description: "The description",
            type: this.app.UI.FormUtils.NodeType.OBJECT,
            properties: {
                "limit": {
                    type: this.app.UI.FormUtils.NodeType.STRING,
                    title: "The budget limit",
                    minLength: 1,
                },
            },
        };
    }
}