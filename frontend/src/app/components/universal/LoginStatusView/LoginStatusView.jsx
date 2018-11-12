import React from 'react'
import * as styles from './LoginStatusView.css'

import withContent from 'utils/withContent.js'

import { Link } from 'react-router';
import userStatus from 'requests/userStatus.js'

class LoginStatusView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      authData: null
    };

    this._requestAuthStatus = this._requestAuthStatus.bind(this);
  }

  _requestAuthStatus() {
    this.setState({
      loading: true,
      authData: null
    });
    userStatus({}, (data) => {
      this.setState({
        loading: false,
        authData: data
      });
    }, (error) => {
      this.setState({
        loading: false,
        authData: null
      });
    });
  }

  componentDidMount() {
    this._requestAuthStatus();
  }

  render() {
      
    const authData = this.state.authData;
    const username = (authData || {}).login;
    const { small, inExpander, plainButton, onLinkSwitched, isCollapsed } = this.props;
    const inMenu = !small;
    
    return (
      <div
        styleName={(this.props.content.registration.enabled)?('LoginStatusView'):('LoginStatusViewHidden')}
        className={
          (!inExpander && !small)?(styles.LoginStatusViewFree):('') +
          ' ' +
          (inExpander)?(styles.LoginStatusViewInExpander):('') +
          ' ' +
          (plainButton)?(styles.LoginStatusViewPlainButton):('')
        }
      >
        {
          (username)?(
            <div styleName='UserStatusWrapper'>
              <Link
                onClick={() => {
                  if(onLinkSwitched) {
                    onLinkSwitched();
                  }
                }}
                styleName='UserName'
                to={$ROUTER_BASE + '/user'}
              >
                {
                  (!small)?(
                    <img styleName='UserAvatar' src={authData.avatar} />
                  ):(null)
                }
                {
                  (small)?(
                      <i styleName='UserIconSmall' className="far fa-address-card"></i>
                  ):(
                    <div styleName='UserIconText'>
                        Your account
                    </div>
                  )
                }
                {
                    (small)?(
                      <div styleName='UserIconSmallText'>
                          Your account
                      </div>
                  ):(null)
                }
              </Link>
            </div>
          ):(
            <Link
              onClick={() => {
                if(onLinkSwitched) {
                  onLinkSwitched();
                }
              }}
              styleName='LoginButton'
              className={
                  ((small)?(styles.LoginButtonSmall):('')) + ' ' +
                  ((inMenu)?(styles.LoginButtonMenu):('')) + ' ' +
                  ((isCollapsed)?(styles.LoginButtonCollapsed):(''))
              }
              to={$ROUTER_BASE + '/login'}
            >
              <span
                styleName='LoginButtonIcon'
              >
                <i className="far fa-arrow-alt-circle-right"></i>  
              </span>
              Zaloguj się
            </Link>
          )
        }
      </div>
    )
  }
}

export default withContent(LoginStatusView)
