import * as React from 'react';
import styled from 'styled-components';

import TextInput from 'components/TextInput';
import Button from 'components/Button';
import Description from 'components/Description';
import Text from 'components/Text';

export interface LoginPanelProps {
}

export default class LoginPanel extends React.Component<LoginPanelProps, undefined> {
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
                <Button size='XL'>
                    <Text translate compact>login_button_label</Text>
                </Button>
                <Button size='XL'>
                    <Text translate compact>reset_password_label</Text>
                </Button>
            </Description>
        );
    }
};