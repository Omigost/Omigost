import * as React from 'react';
import styled  from 'styled-components';

const Wrapper = styled.div`
  padding: 0.5vw;
  width: 100%;
`;

interface InputProps {
  fontSize?: string,
  theme?: any,
  type?: string
};

const Input = styled.input<InputProps>`
  background: none;
  border: none;
  border-bottom: solid 2px ${(props: InputProps) => props.theme.colors.accent};
  border-left: none;
  font-family: ${(props: InputProps) => props.theme.primaryFont};
  font-size: ${(props: InputProps) => props.theme.fontSize[props.fontSize || 'default']};
  color: ${(props: InputProps) => props.theme.colors.accent};
  padding-left: 1.5vw;
  
  &:focus {
    border-bottom: solid 2px ${(props: InputProps) => props.theme.colors.primary};
    border-left: solid 2px ${(props: InputProps) => props.theme.colors.primary};
  }
  
  font-weight: ${(props: InputProps) => (props.type == 'password')?('bold'):('normal')};
  width: 100%;
`;

const Label = styled.div<InputProps>`
  font-family: ${(props: InputProps) => props.theme.primaryFont};
  font-size: ${(props: InputProps) => props.theme.fontSize[props.fontSize || 'default']};
  color: ${(props: InputProps) => props.theme.colors.accent};
`;

export interface TextInputProps {
    size?: string,
    type?: string,
    label?: string
}

export default class TextInput extends React.Component<TextInputProps, undefined> {
    render() {
        return (
            <Wrapper>
                {
                    (this.props.label)?(
                        <Label>
                            {this.props.label}
                        </Label>
                    ):(null)
                }
                <Input
                  fontSize={this.props.size}
                  type={this.props.type}
                />
            </Wrapper>
        );
    }
}
