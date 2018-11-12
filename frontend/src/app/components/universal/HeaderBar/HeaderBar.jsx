import React from 'react'
import * as styles from './HeaderBar.css'

import HeaderMenu from 'components/HeaderMenu/HeaderMenu.jsx'
import Logo from 'components/Logo/Logo.jsx'
import TopExpandableMenu from 'components/TopExpandableMenu/TopExpandableMenu.jsx'

class HeaderBar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.mounted = false;
    
    this._collapse = this._collapse.bind(this);
    this._scrollListener = this._scrollListener.bind(this);
  }

  _scrollListener(e) {
    const scrollY = window.scrollY || 0;
    if(scrollY > 100) {
      this._collapse(true);
    } else {
      this._collapse(false);
    }
  }
  
  _collapse(shouldCollapse) {
    if(!this.mounted) return;
    this.setState({
      collapsed: shouldCollapse
    });
  }
  
  componentDidMount() {
    this.mounted = true;
    window.addEventListener('scroll', this._scrollListener);
  }
  
  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('scroll', this._scrollListener);
  }
  
  render() {
    const isCollapsed = this.state.collapsed;

    //if(!isCollapsed) return null;

    return (
      <div
        styleName={
          (isCollapsed)?('HeaderBarCollapsed'):('HeaderBar')
        }
        className={(!isCollapsed)?(styles.Hidden):('')}
      >
        {
            (isCollapsed)?(
                <div styleName='ExpandableMenuWrapper'>
                    <TopExpandableMenu />
                </div>
            ):(null)
        }
        <div styleName='LogoWrapper'>
          <Logo small />
        </div>
        <div styleName='MenuWrapper'>
          <HeaderMenu isCollapsed={isCollapsed} small plainLoginButton={!isCollapsed}/>
        </div>
      </div>
    )
  }
}

export default HeaderBar