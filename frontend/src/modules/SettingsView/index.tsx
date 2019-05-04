import * as React from "react";
import styled  from "styled-components";


import { IconName } from "@fortawesome/fontawesome-svg-core";
import { OmigostApp, OmigostModule, OmigostModulesLoaderInterface } from "modules/ModulesLoader";

import Panel from "./src/Panel";

const Wrapper = styled.div`
  margin-left: 5vw;
  position: relative;
  margin-top: 1vw;
`;

export default class SettingsViewModule implements OmigostModule {
    app: OmigostApp;

    onLoad(app: OmigostApp, loader: OmigostModulesLoaderInterface) {
        this.app = app;
    }

    getDetails() {
        return {
            description: "The builtin module to display settings view.",
        };
    }

    getRoutes() {
        return [{
            name: "test",
            component: ((props) => <div>HELLOO TEST ROUTE!</div>),
        }];
    }

    renderDashboardView(props: any) {
        return (
            <Wrapper>
                <Panel app={this.app} />
            </Wrapper>
        );
    }

    getIcon(): IconName {
        return "tools";
    }

    getName(): string {
        return "settings-view";
    }

    getMenuName(): string {
        return "Settings";
    }
}