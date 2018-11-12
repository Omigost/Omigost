import React from 'react'
import * as styles from './SectionHeader.css'


class SectionHeader extends React.Component {
  render() {
    const { title, centered, sectionId, inverted } = this.props;
    let { autolink } = this.props;

    if(autolink === null || typeof autolink === 'undefined') {
        autolink = true;
    }
    
    return (
      <div styleName='SectionHeader'>
        <div
          styleName={(centered)?('CenteredTitleWrapper'):('TitleWrapper')}
        >
          {
              (autolink)?(
                  <a
                    styleName='TitleAutolink'
                    className={(inverted)?(styles.TitleAutolinkInverted):(null)}
                    href={`#${sectionId}`}
                  >
                    {title}
                  </a>
              ):(title)
          }
        </div>
      </div>
    )
  }
}

export default SectionHeader