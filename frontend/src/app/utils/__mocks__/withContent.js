import React from 'react'
const { Provider, Consumer } = React.createContext({});

export default function withContent(Component) {
    const PropsContentProvider = class extends React.Component {
        constructor(props) {
            super(props);

            this.handleChangeLang = this.handleChangeLang.bind(this);
            this.handleRequestContent = this.handleRequestContent.bind(this);
        }

        handleChangeLang(lang, options) {
            const { onChangeLang } = this.props;
            if(onChangeLang) {
                onChangeLang(lang, options);
            }
        }

        handleRequestContent(options) {
            const { onRequestContent } = this.props;
            if(onRequestContent) {
                onRequestContent(options);
            }
        }

        render() {
            return (
                <Consumer>
                    {
                        (contextValue) => {
                            const props = Object.assign({}, (contextValue || {}).contentContext, this.props);

                            return (
                                <Provider value={{
                                    contentContext: props
                                }}>
                                    <Component
                                        {...props}
                                        changeLang={this.handleChangeLang}
                                        requestContent={this.handleRequestContent}
                                        lang={props.lang || 'en'}
                                        content={props.content || {}}
                                        contentUpdateTimestamp={+new Date()}
                                    />
                                </Provider>
                            );
                        }
                    }
                </Consumer>
            );
        }
    };

    return PropsContentProvider;
};