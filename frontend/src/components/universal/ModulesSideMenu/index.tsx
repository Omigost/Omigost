import * as React from "react";

import SideMenu from "components/SideMenu";
import { withModules, ModulesLoader } from "modules/ModulesProvider";

export type ModulesSideMenuProps = {
    modulesLoader?: ModulesLoader;
};

class ModulesSideMenu extends React.Component<ModulesSideMenuProps, undefined> {

    render() {
        if (!this.props.modulesLoader) {
            return null;
        }

        return (
            <SideMenu
                options={
                    this.props.modulesLoader.getActiveModules().map(module => {
                        return {
                            name: module.getName() || "Anonymous module",
                            icon: module.getIcon() || "chart-bar",
                        };
                    })
                }
            />
        );
    }
}

export default withModules(ModulesSideMenu);
