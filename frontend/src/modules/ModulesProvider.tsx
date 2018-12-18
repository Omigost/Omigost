import * as React from 'react';
import OmigostModulesLoader, { OmigostModulesLoaderInterface, ModuleSource } from 'modules/ModulesLoader';

export interface ModulesProviderProps {
    children?: any;
    loader?: OmigostModulesLoaderInterface;
    modules?: Array<ModuleSource>;
};

const ModulesLoaderContext = React.createContext(null);

export type ModulesLoader = OmigostModulesLoaderInterface;

export default class ModulesProvider extends React.Component<ModulesProviderProps, undefined> {
    render() {
        let loader = null;
        if(this.props.loader) {
            loader = this.props.loader;
        } else {
            loader = new OmigostModulesLoader();
        }
        
        if(this.props.modules) {
            loader.loadAllModules(this.props.modules);
        }
        
        return (
           <ModulesLoaderContext.Provider value={loader}>
                {this.props.children}
           </ModulesLoaderContext.Provider>
        );
    }
};

export class ModulesConsumer extends React.Component<any & { children: Array<React.ReactElement<any>> }, undefined> {
  //static contextType = ModulesLoaderContext;
  render() {
    return (
        <ModulesLoaderContext.Consumer>
            {modulesLoader => {
                return React.Children.map(this.props.children, (child) =>
                    React.cloneElement(child as React.ReactElement<any>, { modulesLoader })
                ); 
            }}
        </ModulesLoaderContext.Consumer>
    );
  }
};

export interface WithLoaderProps {
    loader?: OmigostModulesLoaderInterface;
};

export function withModules<P>(Component: React.ComponentType<P & WithLoaderProps>): React.SFC<P> {
    return (props: P) => {
        return (
            <ModulesConsumer>
                <Component {...props} />
            </ModulesConsumer>
        );
    };
};