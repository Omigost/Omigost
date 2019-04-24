import * as React from "react";
import styled from "styled-components";
import client from "../../../client/OmigostClient";
import {REQUEST_STATES} from "../../../client/formHelpers";


const Header = styled.header`
  height: auto;
`;
const Wrapper = styled.div``;
const Textarea = styled.textarea`display: block;`;
const Label = styled.label`display: block;`;
const Submit = styled.button`display: block;`;
const ErrorDisplay = styled.div`color: #d12;`;

type RequestLimitsFormProps = {};
type RequestLimitsFormState = {reason: string, requestState: REQUEST_STATES, error: string};



export default class RequestLimitsForm extends React.Component<RequestLimitsFormProps, RequestLimitsFormState> {
    constructor (props) {
        super(props);

        new URLSearchParams(window.location.search).get("token");

        this.state = {
            reason: "",
            requestState: REQUEST_STATES.READY,
            error: "",
        };
    }

    handleChange(value: string): void {
        return this.setState({reason: value});
    }

    failWith(reason: string): void {
        this.setState({requestState: REQUEST_STATES.READY, error: reason});
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        const urlparams = new URLSearchParams(window.location.search); // TODO add polyfill?
        const reason = this.state.reason, token = urlparams.get("token");
        if (!reason) return this.failWith("Reason cannot be empty");
        if (!token) return this.failWith("This address doesn't have a valid request token");

        const payload = { reason, token };
        client.postBudgetIncreaseLimit(this, payload);
    }

    form(): React.ReactNode {
        return (
            <Wrapper>
                <Header>
                    <h1>
                        Request Budget Increase Limit
                    </h1>
                </Header>

                <article>
                    <form onSubmit={this.handleSubmit}>
                        <Label htmlFor="reason">Reasons For Increasing The Limit:</Label>
                        <Textarea id="reason" onChange={e => this.handleChange(e.target.value)} value={this.state.reason}/>
                        <Submit type="submit">
                            Submit
                        </Submit>
                    </form>

                    <ErrorDisplay>
                        {this.state.error}
                    </ErrorDisplay>
                </article>
            </Wrapper>
        );
    }

    spinner(): React.ReactNode {
        return (
            <article>
                Sending...
            </article>
        );
    }

    success(): React.ReactNode {
        return (
            <article>
                Request was successfully submitted!
            </article>
        );
    }

    render() {
        switch (this.state.requestState) {
            case REQUEST_STATES.SUCCESS:
                return this.success();
            case REQUEST_STATES.IN_PROGRESS:
                return this.spinner();
            default:
                return this.form();
        }
    }
}
