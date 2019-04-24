import * as React from "react";
import styled, { withTheme, ThemeProvider as StyledThemeProvider } from "styled-components";
import { connect } from "react-redux";

export interface Theme {
    primaryFont: string;
    colors: {
        background: string;
        primary: string;
        secondary: string;
        palette: Array<string>;
        primaryText: string;
        accent: string;
        primaryGradient: string;
        lightAccent: string;
    };
    fontSize: {
        S: string;
        default: string;
        M: string;
        L: string;
        XL: string;
        XXL: string;
    };
};

export interface PropsWithTheme {
    theme?: Theme;
};

export enum Action {
    SetTheme = 'THEMES_SET_THEME',
};

export interface SetThemeAction {
    type: Action.SetTheme;
    theme: Theme;
};

export function executeSetTheme(theme: Theme): SetThemeAction {
    return {
        type: Action.SetTheme,
        theme,
    };
}

export interface ThemesReduxState {
    currentTheme: Theme;
};

export const INITIAL_STATE: ThemesReduxState = {
    currentTheme: null,
};

export function reducer(stateIn: ThemesReduxState, action): ThemesReduxState {
    const state = stateIn || INITIAL_STATE;
    const actionType: Action = action.type;
    
    switch(actionType) {
        case Action.SetTheme: {
            return {
                ...state,
                currentTheme: action.theme,
            };
        }
        default: {
            return state;
        }
    }
}

const mapProviderStateToProps = (state, ownProps) => {
    return {
        currentTheme: state.themes.currentTheme,
    };
}

const mapProviderDispatchToProps = (dispatch, ownProps) => {
    return {
        setTheme: (theme: Theme) => {
            dispatch(executeSetTheme(theme));
        },
    };
}

export function withReduxThemes(Component) {
    return connect(
        mapProviderStateToProps,
        mapProviderDispatchToProps,
    )(Component);
};

export interface ThemeSetterRawProps {
    children: (props: any) => React.ReactNode;
}

export class ThemeSetterRaw extends React.Component<ThemeSetterRawProps, undefined> {
    render() {
        return this.props.children(this.props);
    }
}

export const ThemeSetter = withReduxThemes(ThemeSetterRaw);

export class ThemeProviderRaw extends React.Component<{
    currentTheme: Theme;
    setTheme: (theme: Theme) => void;
    children: JSX.Element;
}, undefined> {
    render() {
        
        if (this.props.currentTheme === null) {
            return null;
        }
        
        return (
            <StyledThemeProvider
                theme={this.props.currentTheme}
            >
                {this.props.children}
            </StyledThemeProvider>
        );
    }
}

export const ThemeProvider = withReduxThemes(ThemeProviderRaw);

