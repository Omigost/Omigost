import * as React from "react";
import styled  from "styled-components";

import Button from "../Button";
import { transformSchemaIntoTree } from "./schemaParser";
import { FormContext, NodeAny, NodeState, RootNode, Schema } from "./schemaTypes";

const Wrapper = styled.div`
  width: 100%;
  color: black;
  font-family: ${(props) => props.theme.primaryFont};
  font-size: 1vw;
`;

const SubmitButtonWrapper = styled.div`
  width: 50%;
  margin-top: 1vw;
  margin-bottom: 1vw;
  
  width: 40%;
`;

export interface FormProps {
    fontSize?: string;
    theme?: any;
    validateOnChange?: boolean;
    validateOnInit?: boolean;
    children: Schema;
    onSubmit: (data: any) => void;
    onChange: (data: any) => void;
    submitButton?: any;
    defaultValue?: any;
    value?: any;
}

interface FormState {
    tree: RootNode;
    formContext: FormContext;
}

const debounce = (func, wait, immediate) => {
	let timeout;
	return () => {
		const context = this, args = arguments;
		const later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export default class Form extends React.Component<FormProps, FormState> {

    state: FormState;

    constructor(props) {
        super(props);
        
        this.state = {
            tree: null,
            disableOnChangeListener: false,
            formContext: {
                errors: [],
                getErrorsForNode: () => [],
            },
        };
        
        this.handleChangeEvent = debounce(this.handleChangeEvent.bind(this), 250);
    }
    
    handleChangeEvent() {
        if (this.state.disableOnChangeListener) return;
        if (this.props.validateOnChange !== false) {
            this.state.tree.validate();
        }
        if (this.state.tree && this.props.onChange) {
            this.props.onChange(this.state.tree.getData());
        }
    }

    handleFormStateUpdate(state: NodeState<any>, root: RootNode) {
        if (this.state.disableOnChangeListener) return;
        this.setState({
            tree: root,
        }, () => {
            this.handleChangeEvent();
        });
    }

    handleFormContextUpdate(context: FormContext, source: NodeAny) {
        if (this.state.disableOnChangeListener) return;
        this.setState({
            formContext: {
                ...this.state.formContext,
                ...context,
            },
        });
    }

    handleFormContextMapping(fn: (context: FormContext) => FormContext, source: NodeAny) {
        if (this.state.disableOnChangeListener) return;
        this.handleFormContextUpdate(fn(this.state.formContext), source);
    }

    createTree() {
        const schema = this.props.children;

        if (!this.state.tree) {
            setTimeout(() => {
                const tree = transformSchemaIntoTree(schema, null, {
                    rootSetState: (state: NodeState<any>, root: RootNode) => this.handleFormStateUpdate(state, root),
                    rootSetContext: (context: FormContext, source: NodeAny) => this.handleFormContextUpdate(context, source),
                    rootModifyContext: (fn: (context: FormContext) => FormContext, source: NodeAny) => this.handleFormContextMapping(fn, source),
                    rootState: {},
                });

                if (this.props.defaultValue) {
                    this.setState({
                        disableOnChangeListener: true,
                    }, () => {
                        tree.setValue(this.props.defaultValue);
                        this.setState({
                            disableOnChangeListener: false,
                        });
                    });
                }
                
                this.setState({
                    tree,
                }, () => {
                    if (this.props.validateOnInit !== false) {
                        this.state.tree.validate();
                    }
                });
            });
        }
    }

    componentDidMount() {
        this.createTree();
    }

    render() {
        this.createTree();
        
        return (
            <Wrapper>
                {(this.state.tree) ? (this.state.tree.render(this.state.formContext)) : (null)}
                {
                    (this.state.tree && this.props.onSubmit) ? (
                        <SubmitButtonWrapper
                            style={{
                                marginLeft: "30%",
                                marginRight: "30%",
                            }}
                        >
                            <Button
                                onClick={() => {
                                    if (this.state.tree && this.props.onSubmit) {
                                        this.props.onSubmit(this.state.tree.getData());
                                    }
                                }}
                            >
                                {this.props.submitButton || "Save"}
                            </Button>
                        </SubmitButtonWrapper>
                    ) :(null)
                }
            </Wrapper>
        );
    }
}
