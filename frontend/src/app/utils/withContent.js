import React from 'react'
import { connect, Provider } from 'react-redux'
import * as actions from '../reducers/actions.js'

export default function withContent(component) {
    const mapStateToProps = state => {
        return {
            lang: state.app.lang,
            content: state.app.content,
            contentUpdateTimestamp: state.app.contentUpdateTimestamp
        }
    };

    const mapDispatchToProps = dispatch => {
        return {
            requestContent: (options) => {
                
                //TODO: FIX IT!
                //FIXME: REMOVE SOMEWHERE ELSE
                if(window.AOS) window.AOS.init();

                if(!options || !options.lang || (typeof options.contentUpdateTimestamp !== 'number')) {
                    throw "requestContent prop of withContent(...) misusage: Please provide valid options.";
                }
                return actions.requestContent(dispatch, options.lang, options.contentUpdateTimestamp);
            },
            changeLang: (lang, options) => {
                if(options.lang == lang) return null;

                dispatch(actions.changeLang(lang));
                options = Object.assign({}, options, {
                    lang,
                    contentUpdateTimestamp: 0
                });

                if(!options || !options.lang || (typeof options.contentUpdateTimestamp !== 'number')) {
                    throw "changeLang prop of withContent(...) misusage: Please provide valid options.";
                }
                return actions.requestContent(dispatch, options.lang, options.contentUpdateTimestamp);
            }
        }
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(component);
};
