import React from 'react'
import './Section.css'
import ReactDOM from 'react-dom';

import { withRouter } from 'react-router'

import SectionHeader from 'components/SectionHeader/SectionHeader.jsx'
import SectionLeft from 'components/SectionLeft/SectionLeft.jsx'
import SectionRight from 'components/SectionRight/SectionRight.jsx'


class Section extends React.Component {
  constructor(props) {
      super(props);
      this.pageLocationParsed = false;
  }

  componentDidMount() {
      this.pageLocationParsed = false;
  }

  render() {
    let {
      children,
      title,
      inverted,
      rotated,
      icon,
      centeredTitle,
      id,
      withoutMargin,
      autolink,
      empty,
      rightContent
    } = this.props;

    let className = 'Section';
    if(inverted) {
      className = 'SectionInverted';
    }

    if(rotated) {
      className += ' SectionRotated';
    }

    if(centeredTitle === null ||
      typeof centeredTitle === 'undefined') {

      centeredTitle = true;
    }

    const { location } = this.props;

    if(location && location.hash && id && `#${id}` === location.hash) {
       if(this.pageLocationParsed === location.key) {

       } else {
           const scrollToLocationElement = (retryNo) => {
               let node = null;

               console.log('--> Try to find using jquery: #'+id);
               node = $(`#${id}`)[0];

               if(!node) {
                   try {
                       console.log('--> Try to find using ReactDOM');
                       node = ReactDOM.findDOMNode(this);
                   } catch(e) {
                       node = null;
                   }
               }

               if (!node) {
                   console.log('--> Failed');
                   setTimeout(() => {
                       scrollToLocationElement(retryNo + 1);
                   }, 500);
                   return;
               }

               console.log('--> Success');

               if (node.scrollIntoView) {
                   node.scrollIntoView();
                   window.scrollBy(0, -80);
               } else {
                   console.log('--> Scroll');
                   const vh = (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) || 0) / 100.0;
                   console.log("VH = "+vh);
                   window.scrollTo(0, node.offsetTop + vh * 90);
               }
           };
           setTimeout(scrollToLocationElement, 0);
           this.pageLocationParsed = location.key || Math.random();
       }
    } else {
        this.pageLocationParsed = null;
    }

    if(empty) return (
      <div
        id={id}
        styleName={className}
      >
        <div></div>
      </div>
    );

    return (
      <div
        id={id}
        styleName={className}
      >
        <SectionHeader
          title={title}
          icon={icon}
          centered={rotated || centeredTitle}
          sectionId={id}
          autolink={autolink}
          inverted={inverted}
        />
        <div styleName='SectionContent'>
          <SectionLeft
            withoutMargin={withoutMargin}
          >
            {children}
          </SectionLeft>
          {
              (rightContent)?(
                <SectionRight>
                    {rightContent}
                </SectionRight>
              ):(null)
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Section)
