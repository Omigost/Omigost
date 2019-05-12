import * as React from "react";
import styled from "styled-components";

import { IconName } from "@fortawesome/fontawesome-svg-core";
import { OmigostApp, OmigostModule, OmigostModulesLoaderInterface } from "modules/ModulesLoader";

import {
    faPalette,
} from "@fortawesome/free-solid-svg-icons";

const StyleGuideComponent = styled.iframe`
    width: 92vw;
    height: 97vh;
    overflow: hidden;
    border: none;
`;

export default class DesignGiudeViewModule implements OmigostModule {
    app: OmigostApp;

    onLoad(app: OmigostApp, loader: OmigostModulesLoaderInterface) {
        this.app = app;
    }

    renderDashboardView(props: any) {
        return (
            <div>
                <StyleGuideComponent src="http://localhost:6006/" />
            </div>
        );
    }

    getDetails() {
        return {};
    }

    getIcon(): IconName {
        return faPalette.iconName;
    }

    getName(): string {
        return "design-guide";
    }

    getMenuName(): string {
        return "Design guide";
    }
}