import * as React from "react";

import { IconName } from "@fortawesome/fontawesome-svg-core";
import { OmigostApp, OmigostModule, OmigostModulesLoaderInterface } from "modules/ModulesLoader";
import styled from "styled-components";

const ChartWrapper = styled.div`
  margin-top: 3vw;
  width: 80vw;
  height: 25vw;
`;

export default class DashBoardViewModule implements OmigostModule {
    app: OmigostApp;

    onLoad(app: OmigostApp, loader: OmigostModulesLoaderInterface) {
        this.app = app;
    }

    renderDashboardView(props: any) {
        return (
            <div>
                <ChartWrapper>
                   <this.app.UI.Form>
                   </this.app.UI.Form>
                </ChartWrapper>
            </div>
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
}