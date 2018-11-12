import React from 'react'
import * as styles from './LoginPanel.css'

import login from 'requests/login.js'
import notification from 'utils/notification.js'

import { Link } from 'react-router';
import { withRouter } from 'react-router'

import SideDescription from 'components/SideDescription/SideDescription.jsx'
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner.jsx'

class LoginPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      passwd: '',
      loading: false,
      message: null,
      messageType: null
    };

    this._onLoginRequest = this._onLoginRequest.bind(this);
    this._onLoginChanged = this._onLoginChanged.bind(this);
    this._onPasswdChanged = this._onPasswdChanged.bind(this);
    this._onRegisterButtonClick = this._onRegisterButtonClick.bind(this);
    this._onForgotButtonClick = this._onForgotButtonClick.bind(this);
  }

  _onLoginRequest(event) {
    const { router } = this.props;

    event.preventDefault();
    this.setState({
        loading: true,
        message: null
    });
    login({
      login: this.state.login,
      passwd: this.state.passwd
    }, (data) => {
      this.setState({
          loading: false
      });
      document.location = $ROUTER_BASE + "/user";
      //router.push($ROUTER_BASE + "/user");
      this.setState({
        login: '',
        passwd: '',
        messageType: 'ok',
        message: 'You were logged in'
      });
    }, (error) => {
      this.setState({
        loading: false
      });
      //notification.show('Could not login. '+error, 'error');
      this.setState({
        login: '',
        passwd: '',
        messageType: 'error',
        message: 'Could not login. '+error
      });
    });
  }

  _onLoginChanged(event) {
    this.setState({
      login: event.target.value,
      message: null
    });
  }

  _onPasswdChanged(event) {
    this.setState({
      passwd: event.target.value,
      message: null
    });
  }

  _onRegisterButtonClick(event) {
    const { router } = this.props;
    router.push($ROUTER_BASE + '/register');
    if(event) event.preventDefault();
  }

  _onForgotButtonClick(event) {
      const { router } = this.props;
      router.push($ROUTER_BASE + '/password/forgot');
      if(event) event.preventDefault();
  }

  render() {

    const { loading, message, messageType } = this.state;

    if(loading) {
        return (
            <div styleName='LoginPanel'>
                <div styleName='Spinner'>
                    <LoadingSpinner />
                </div>
            </div>
        );
    }

    let messageNode = null;
    if(message) {
        const type = messageType || 'error';
        messageNode = (
            <div styleName={(type=='ok')?('MessageOk'):('MessageWarn')}>
                <i
                    className={(type=='ok')?("far fa-check-circle"):("fas fa-exclamation-triangle")}
                    styleName={(type=='ok')?('MessageOkIcon'):('MessageWarnIcon')}
                ></i>
                <span styleName={(type=='ok')?('MessageOkText'):('MessageWarnText')}>
                    {message}
                </span>
            </div>
        );
    }

    return (
      <div styleName='LoginPanel'>
      {messageNode}
        <SideDescription
          className={styles.LoginContent}
          for='login'
        >
          <form>
            <table>
              <tbody>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    Email:
                                </td>
                                <td>
                                    <input
                                        required
                                        styleName='Input'
                                        type='text'
                                        name='login'
                                        value={this.state.login}
                                        onChange={this._onLoginChanged}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Password:
                                </td>
                                <td>
                                    <input
                                        required
                                        styleName='Input'
                                        type='password'
                                        name='passwd'
                                        value={this.state.passwd}
                                        onChange={this._onPasswdChanged}
                                    />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td>
                        <input
                            styleName='Submit'
                            type='submit'
                            value='Login'
                            onClick={this._onLoginRequest}
                        />
                        <input
                            styleName='Submit'
                            type='button'
                            value='Register new account'
                            onClick={this._onRegisterButtonClick}
                        />
                        <button
                            styleName='Submit'
                            onClick={this._onForgotButtonClick}
                        >
                            I forgot my password
                        </button>
                    </td>
                </tr>
{/*
                <tr>
                    <td>
                        <div styleName='LoginButtonSocialWrapper'>
                            <a
                                styleName='LoginButtonSocial'
                                href={$ROUTER_BASE + '/auth/facebook'}
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a
                                styleName='LoginButtonSocial'
                                href={$ROUTER_BASE + '/auth/github'}
                            >
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                    </td>
                </tr>
*/}                
              </tbody>
            </table>
          </form>
        </SideDescription>
      </div>
    )
  }
}

export default withRouter(LoginPanel)
