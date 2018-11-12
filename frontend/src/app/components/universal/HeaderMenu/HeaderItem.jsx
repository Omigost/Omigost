import React from 'react'
import * as styles from './HeaderItem.css'

import { Link } from 'react-router';

class HeaderItem extends React.Component {
  render() {
    const { name, link, small, inExpander, onLinkSwitched, isInFirstGroup, isCollapsed } = this.props;

    if(!name) return null;

    if(link.disabled) {
        return null;
    }

    const { page, element, url, scroll } = link;

    const handleScroll = () => {
      if(scroll === 'top') {
        window.scrollTo(0, 0);
        console.log('!scrolltop!');
      }
    };

    if(!url) {

        return (
            <Link
                onClick={() => {
                    handleScroll();
                    if(onLinkSwitched) {
                        onLinkSwitched();
                    }
                }}
                to={
                    (element)?($ROUTER_BASE + `${page}#${element}`):($ROUTER_BASE + page)
                }
                styleName={
                    (small)?('HeaderItemSmall'):('HeaderItem')
                }
                className={
                    ` ${(inExpander)?(styles.HeaderItemInExpander):(styles.HeaderItemNotInExpander)} ${(isInFirstGroup)?(styles.PrimaryGroup):(styles.SecondaryGroup)} `
                }
            >
                {name}
            </Link>
        )
    }

    return (
      <a
        href={url}
        onClick={handleScroll}
        styleName={
          (small)?('HeaderItemSmall'):('HeaderItem')
        }
        className={
            ` ${(inExpander)?(styles.HeaderItemInExpander):(styles.HeaderItemNotInExpander)} ${(isInFirstGroup)?(styles.PrimaryGroup):(styles.SecondaryGroup)} `
        }
      >
        {name}
      </a>
    )
  }
}

/*<a
  href={link}
  styleName='HeaderItem'
>
  {name}
</a>*/

export default HeaderItem
