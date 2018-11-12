import React from 'react'
import * as styles from './Header.css'

import HeaderBar from 'components/HeaderBar/HeaderBar.jsx'
import MainPanel from 'components/MainPanel/MainPanel.jsx'
import HeaderMenu from 'components/HeaderMenu/HeaderMenu.jsx'
import TopExpandableMenu from 'components/TopExpandableMenu/TopExpandableMenu.jsx'


class Header extends React.Component {
  render() {
    let {
      headerElement,
      fullScreen,
      centerHeaderElement,
      doNotLimitBackgroundImage,
      fullBackgroundImage
    } = this.props;

    if(!headerElement) {
      headerElement = (
        <MainPanel />
      );
    }

    return (
      <div
        styleName={
          (fullScreen)?('FullHeader'):('Header')
        }
        className={
          (doNotLimitBackgroundImage)?(styles.NotLimitedImageHeader):(null)
        }
       >
        <HeaderBar />
        <div styleName='HeaderMenuWrapper'>
            <HeaderMenu />
        </div>
        <HeaderMenu />
        <div styleName='BackgroundImageWrapper'>
          <div
            styleName='BackgroundImage'
            className={
              (fullBackgroundImage)?(styles.BackgroundImageFull):('')
            }
          />
        </div>
        <div
          styleName={
            (centerHeaderElement)?(
              'HeaderElementWrapperCentered'
            ):('HeaderElementWrapper')
          }
        >
          {headerElement}
        </div>
        <div styleName='ExpandableMenuWrapper'>
          <TopExpandableMenu coverScreen={true}/>
        </div>
      </div>
    )
  }
}

//<!--<div styleName='BackgroundImageWrapperFilter'></div>-->

export default Header
