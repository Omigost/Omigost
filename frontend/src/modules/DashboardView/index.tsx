import * as React from "react";

import { IconName } from "@fortawesome/fontawesome-svg-core";
import { OmigostApp, OmigostModule, OmigostModulesLoaderInterface } from "modules/ModulesLoader";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CursorIcon = styled.div`
  margin-right: 0.3vw;
  display: inline-block;
`;

const DATA = {
    columns: [
        {
            name: "x",
            type: "date",
            parseFormat: "YYYY-MM-DD HH:mm",
            cursorFormat: "YYYY-MM-DD HH:mm",
            axisFormat: "HH:mm",
            cursorPrefix: (<CursorIcon><FontAwesomeIcon icon="clock" /></CursorIcon>),
        },
        {
            name: "y",
            type: "number",
            prefix: "$ ",
            cursorPrefix: (<CursorIcon><FontAwesomeIcon icon="dollar-sign" /></CursorIcon>),
        },
        {
            name: "z",
            type: "number",
            prefix: "z = ",
        },
        {
            name: "p",
            type: "number",
            prefix: "p = ",
        },
    ],
    rows: [
        {x: "2018-12-10 12:30", p: 1, y: 10, z: 20},
        {x: "2018-12-10 13:30", p: 2, y: 15, z: 5},
        {x: "2018-12-10 14:30", p: 3, y: 20, z: 8},
        {x: "2018-12-10 15:30", p: 4, y: 15, z: 14},
        {x: "2018-12-10 16:30", p: 5, y: 15, z: 11},
        {x: "2018-12-10 17:30", p: 6, y: 10, z: 7},
        {x: "2018-12-10 18:30", p: 7, y: 11, z: 8},
        {x: "2018-12-10 19:30", p: 8, y: 11, z: 10},
        {x: "2018-12-10 20:30", p: 9, y: 4, z: 9},
        {x: "2018-12-10 21:30", p: 10, y: 6, z: 12},
        {x: "2018-12-10 22:30", p: 11, y: 8, z: 18},
        {x: "2018-12-10 23:30", p: 12, y: 5, z: 15},
    ],
};

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
                   <this.app.UI.DataProvider
                       data={DATA}
                   >
                       <this.app.UI.Chart
                            graphType={"line"}
                            input={"x"}
                            output={["z", "y"]}
                       >
                           <this.app.UI.ChartTypeSwitchPanel />
                           <this.app.UI.ChartDataOptionsPanel />
                       </this.app.UI.Chart>
                   </this.app.UI.DataProvider>
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