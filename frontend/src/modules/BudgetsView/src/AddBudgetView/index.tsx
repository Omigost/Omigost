import * as React from "react";

import { Box, Flex } from "@rebass/grid";
import { withRouter } from "react-router-dom";
import styled from "styled-components";


const PanelHeader = styled.div`
  font-family: ${(props) => props.theme.primaryFont};
  font-size: ${(props) => props.theme.fontSize.XXL};
  color: #727277;
  margin-left: 1vw;
  margin-top: 2vw;
`;


class AddBudgetView extends React.Component<any, undefined> {

    render() {
        return (
            <div>
                <PanelHeader>
                    Your budgets
                    <this.props.app.UI.Breadcrumbs>
                        {[
                            {
                                name: "Budgets",
                                onClick: () => this.props.history.push(this.props.match.url.split("/").reverse().slice(2).reverse().join("/")),
                            },
                            {
                                name: "Add budget",
                            },
                        ]}
                    </this.props.app.UI.Breadcrumbs>
                </PanelHeader>
                <Flex>
                    <Box p={2} width={1}>
                        <div style={{ padding: "2vw", color: "black" }}>
                            <this.props.app.client.component
                                request={(client) => client.getAccounts()}
                            >
                                {({data, error, loading}, refresh) => {
                                    if (loading || !data) return null;
                                    const accountsData = data;
                                    return (
                                        <this.props.app.client.component
                                            request={(client) => client.getRecentEC2CostAllocationTags()}
                                        >
                                            {({data, error, loading}, refresh) => {
                                                if (loading || !data) return null;
                                                const tagsData = data;
                                                return (
                                                    <this.props.app.client.component mutation>
                                                        {({data, error, loading}, post) => {
                                                            if (loading) return null;
                                                            return (
                                                                <this.props.app.UI.Form
                                                                    submitButton="Save new budget"
                                                                    onSubmit={(data) => {
                                                                        const tagMapping = {};
                                                                        data.tags.forEach(tagSpec => {
                                                                            if (!tagMapping[tagSpec.tagKey]) {
                                                                                tagMapping[tagSpec.tagKey] = [];
                                                                            }
                                                                            tagMapping[tagSpec.tagKey].push(tagSpec.tagValue);
                                                                        });
                                                                        post(client => client.createBudget({
                                                                            limit: parseInt(data.limit),
                                                                            linkedAccounts: data.accounts,
                                                                            tags: tagMapping,
                                                                        })).then(() => {
                                                                            this.setState({
                                                                                showBudgetNewDialog: false,
                                                                            }, () => {
                                                                                this.props.history.push(this.props.match.url.split("/").reverse().slice(2).reverse().join("/"));
                                                                            });
                                                                        });
                                                                    }}
                                                                >
                                                                    {{
                                                                        title: "A registration form",
                                                                        description: "The description",
                                                                        type: "object",
                                                                        properties: {
                                                                            "limit": {
                                                                                type: "string",
                                                                                title: "The budget limit",
                                                                                minLength: 1,
                                                                            },
                                                                            "accounts": {
                                                                                type: "array",
                                                                                title: "Attached accounts",
                                                                                items: {
                                                                                    type: "string",
                                                                                    ui: "enum",
                                                                                    enumLabels: accountsData.map(account => ({
                                                                                        name: account.name,
                                                                                        label: `${account.name} (${account.email})`
                                                                                    })),
                                                                                    enum: accountsData.map(account => account.name),
                                                                                    description: "Account",
                                                                                    minLength: 0,
                                                                                    layout: "inlineLabel",
                                                                                },
                                                                            },
                                                                            "tags": {
                                                                                type: "array",
                                                                                title: "Apply budget only to specified EC2 tags",
                                                                                items: {
                                                                                    type: "object",
                                                                                    title: "Filter",
                                                                                    layout: "inlineLabel",
                                                                                    properties: {
                                                                                        "tagKey": {
                                                                                            type: "string",
                                                                                            description: "EC2 tag",
                                                                                            minLength: 1,
                                                                                            /*type: "string",
                                                                                            ui: "enum",
                                                                                            enumLabels: [],
                                                                                            enum: [],
                                                                                            description: "EC2 tag",
                                                                                            minLength: 0,*/
                                                                                        },
                                                                                        "tagValue": {
                                                                                            type: "string",
                                                                                            description: "Tag value",
                                                                                            minLength: 1,
                                                                                        },
                                                                                    },
                                                                                },
                                                                            },
                                                                        },
                                                                    }}
                                                                </this.props.app.UI.Form>
                                                            );
                                                        }}
                                                    </this.props.app.client.component>
                                                );
                                            }}
                                        </this.props.app.client.component>
                                    );
                                }}
                            </this.props.app.client.component>
                        </div>
                    </Box>
                </Flex>
            </div>
        );
    }
}

export default withRouter(AddBudgetView);