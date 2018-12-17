import * as React from 'react';
import styled from 'styled-components';

import { withRouter } from 'react-router-dom';

import TextInput from 'components/TextInput';
import Button from 'components/Button';
import Description from 'components/Description';
import Text from 'components/Text';

export interface LoginPanelProps {
    history: any,
    location: any,
    match: any
}

class LoginPanel extends React.Component<LoginPanelProps, undefined> {
    render() {
        return (
            <Description
              size='L'
              text={<Text translate>login_description</Text>}
            >
                <TextInput
                  size='XXL'
                  label={<Text translate compact>login_label</Text>}
                />
                <TextInput
                  size='XXL'
                  type='password'
                  label={<Text translate compact>password_label</Text>}
                />
                <Button
                  size='XL'
                  onClick={() => {
                      this.props.history.push('/loading');
                  }}
                >
                    <Text translate compact>login_button_label</Text>
                </Button>
                <Button size='XL'>
                    <Text translate compact>reset_password_label</Text>
                </Button>
            </Description>
        );
    }
};

export default withRouter(LoginPanel);