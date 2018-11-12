import React from 'react'
import { connect, Provider } from 'react-redux'
import * as actions from 'reducers/actions.js'
import withContent from 'utils/withContent.js'

import * as styles from './Page.css'

import Header from 'components/Header/Header.jsx'
import Content from 'components/Content/Content.jsx'
import Loading from 'components/Loading/Loading.jsx'

import NotificationSystem from 'react-notification-system'
import notification from 'utils/notification.js'

class Page extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      children,
      content,
      headerElement,
      onlyHeader,
      centerHeaderElement,
      single,
      doNotLimitBackgroundImage,
      fullBackgroundImage
    } = this.props;

    let contentNode = children;

    setTimeout(() => {
        this.props.requestContent(this.props);
    }, 0);

    // FIXME: False here to disable content async loading
    if(content) {
        if(!content.loaded) {
            return (
                <div
                    styleName='Page'
                    className={(single)?(styles.PageSingle):''}
                >
                    <Loading />
                </div>
            );
        }
    }

    setTimeout(() => this.props.requestContent(this.props), 1000);

    return (
      <div
          styleName='Page'
          className={(single)?(styles.PageSingle):''}
      >
        <Header
          headerElement={headerElement}
          fullScreen={onlyHeader}
          centerHeaderElement={centerHeaderElement}
          doNotLimitBackgroundImage={doNotLimitBackgroundImage}
          fullBackgroundImage={fullBackgroundImage}
        />
        {
          (onlyHeader)?(null):(
            <Content>
              {contentNode}
            </Content>
          )
        }
        <NotificationSystem
          ref={(el) => {
            notification.setTarget(el);
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        content: state.app.content,
        contentUpdateTimestamp: state.app.contentUpdateTimestamp
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestContent: (contentUpdateTimestamp) => actions.requestContent(dispatch, contentUpdateTimestamp)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withContent(Page))
