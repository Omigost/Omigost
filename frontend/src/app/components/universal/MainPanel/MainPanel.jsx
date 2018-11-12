import React from 'react'
import './MainPanel.css'

import withContent from 'utils/withContent.js'

import MD from 'components/MD/MD.jsx';
import headerText from 'content/header.md';
import subheaderText from 'content/subheader.md';

class MainPanel extends React.Component {
  constructor(props) {
      super(props);

      this.onClickMoreButton = this.onClickMoreButton.bind(this);
  }

  onClickMoreButton() {
    window.location = '#about';
  }

  render() {

    return (
      <div styleName='MainPanel'>
        <p styleName='Header'>
          <b>
            <MD>{headerText}</MD>
          </b>
        </p>
        <p styleName='Subheader'>
             <MD>{subheaderText}</MD>
        </p>
        <p>
          <div styleName='LogoWrapper'>
            <img styleName='Logo' src="/img/main_panel_image.png" />
          </div>
          <br />
          <div styleName='SeeMoreButton'>
            <div styleName='SeeMoreButtonIcon'>
                <i className="fas fa-car-side"></i>
            </div>
            <div styleName='SeeMoreButtonText' onClick={this.onClickMoreButton}>
                Start saving money!
            </div>
          </div>
        </p>
        {
            (false && this.props.content.social.show_header_links)?(
                <div styleName='SocialLinksWrapper'>
                    <ContactPanel minimal />
                </div>
            ):(null)
        }
      </div>
    )
  }
}

export default withContent(MainPanel)
