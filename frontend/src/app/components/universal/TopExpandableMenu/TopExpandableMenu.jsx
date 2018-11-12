import React from 'react'
import * as styles from './TopExpandableMenu.css'

import HeaderMenu from 'components/HeaderMenu/HeaderMenu.jsx'

class TopExpandableMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };

        this._onButtonExpandClicked = this._onButtonExpandClicked.bind(this);
    }

    _onButtonExpandClicked() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        const { expanded } = this.state;
        const { coverScreen } = this.props;

        return (
            <div
              styleName='TopExpandableMenu'
              className={
                (coverScreen)?(styles.CoverScreen):('')
              }
            >
                <div styleName='Bar'>
                    <div
                        styleName='BarButtonExpand'
                        onClick={() => this._onButtonExpandClicked()}
                    >
                        {
                            (expanded)?(
                                <i className="fas fa-chevron-left"></i>
                            ):(
                                <i className="fas fa-bars"></i>
                            )
                        }
                    </div>
                </div>
                {
                    (expanded)?(
                        <div styleName='ExpandedContent'>
                           <HeaderMenu inExpander onLinkSwitched={() => {
                               this.setState({
                                   expanded: false
                               });
                           }}/>
                        </div>
                    ):(null)
                }
            </div>
        );
    }
}

export default TopExpandableMenu
