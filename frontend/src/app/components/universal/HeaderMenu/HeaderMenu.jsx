import React from 'react'
import * as styles from './HeaderMenu.css'

import withContent from 'utils/withContent.js'
import HeaderItem from './HeaderItem.jsx'

class HeaderMenu extends React.Component {
  render() {
    const { small, inExpander, plainLoginButton, onLinkSwitched, isCollapsed } = this.props;
    const buttonsRenderIndexThreshold = -1;

    return (
      <div
        styleName={
          (small)?('HeaderMenuSmall'):('HeaderMenu')
        }
        className={
          (inExpander)?(styles.HeaderMenuInExpander):(styles.HeaderMenuNotInExpander)
        }
      >
        {
          (this.props.content.registration.enabled)?(
            <HeaderItem
                key={`header-USER`}
                name={'User'}
                link={'USER'}
                small={small}
                inExpander={inExpander}
                plainButton={plainLoginButton}
                onLinkSwitched={onLinkSwitched}
                isCollapsed={isCollapsed}
            />
          ):(null)
        }
        {
          Object.keys(this.props.content.menu).map((header, index) => {
            return (
                <HeaderItem
                  key={`header-${header}-${index}`}
                  name={header}
                  link={this.props.content.menu[header]}
                  small={small}
                  inExpander={inExpander}
                  onLinkSwitched={onLinkSwitched}
                  isInFirstGroup={index <= buttonsRenderIndexThreshold}
                  isCollapsed={isCollapsed}
                />
            );
          })
        }
      </div>
    )
  }
}

export default withContent(HeaderMenu)
