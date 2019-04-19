import OmigostModulesLoader, { ModuleSource, OmigostModulesLoaderInterface, OmigostModulesStore } from "modules/ModulesLoader";
import * as React from "react";

import { connectProvider } from "./ModulesRedux";

export interface ModulesProviderProps {
    children?: any;
    loader?: OmigostModulesLoaderInterface;
    modules?: Array<ModuleSource>;
}

const ModulesLoaderContext = React.createContext(null);

export type ModulesLoader = OmigostModulesLoaderInterface;

export class ModulesProvider extends React.Component<ModulesProviderProps, undefined> {
    render() {
        let loader = null;
        if (this.props.loader) {
            loader = this.props.loader;
        } else {
            loader = new OmigostModulesLoader();
        }
        
        const store: OmigostModulesStore = {
            getAll: () => this.props.instances,
            put: (instance) => this.props.putInstance(instance),
            enable: this.props.enable,
            disable: this.props.disable,
        };
        
        loader.setStore(store);

        if (this.props.modules) {
            loader.loadAllModules(this.props.modules);
        }

        return (
           <ModulesLoaderContext.Provider value={loader}>
                {this.props.children}
           </ModulesLoaderContext.Provider>
        );
    }
}

export default connectProvider(ModulesProvider);

export class ModulesConsumer extends React.Component<any & { children: Array<React.ReactElement<any>> }, undefined> {
  // static contextType = ModulesLoaderContext;
  render() {
    return (
        <ModulesLoaderContext.Consumer>
            {modulesLoader => {
                return React.Children.map(this.props.children, (child) =>
                    React.cloneElement(child as React.ReactElement<any>, { modulesLoader }),
                );
            }}
        </ModulesLoaderContext.Consumer>
    );
  }
}

export interface WithLoaderProps {
    modulesLoader?: OmigostModulesLoaderInterface;
}

export function withModules<P>(Component: React.ComponentType<P & WithLoaderProps> | React.SFC<P & WithLoaderProps>): React.SFC<P> {
    return (props: P) => {
        return (
            <ModulesConsumer>
                <Component {...props} />
            </ModulesConsumer>
        );
    };
}