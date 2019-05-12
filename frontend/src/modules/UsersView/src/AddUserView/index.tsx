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


class AddUserView extends React.Component<any, undefined> {

    render() {
        const userEditMode = this.props.userEditMode;
        const userToEdit = (userEditMode) ? (this.props.userToEdit) : (undefined);
        const pathToSliceOnBack = (userEditMode) ? (3) : (2);

        return (
            <div>
                <PanelHeader>
                    Users
                    <this.props.app.UI.Breadcrumbs>
                        {[
                            {
                                name: "Users",
                                onClick: () => this.props.history.push(this.props.match.url.split("/").reverse().slice(pathToSliceOnBack).reverse().join("/")),
                            },
                            {
                                name: "Add user",
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
                                        <this.props.app.client.component mutation>
                                            {({data, error, loading}, post) => {
                                                if (loading) return null;
                                                return (
                                                    <this.props.app.UI.Form
                                                        submitButton={(userEditMode) ? ("Save changes") : ("Add new user")}
                                                        defaultValue={userToEdit}
                                                        onSubmit={(data) => {
                                                            const defaultUserCreateRoute = () => {
                                                                post(client => client.createUser({
                                                                    name: data.name,
                                                                })).then(() => {
                                                                    // Add all accounts to the user
                                                                    const { accounts } = data;
                                                                    const addNextAccount = (index, callback) => {
                                                                        if (index >= accounts.length) {
                                                                            callback();
                                                                            return;
                                                                        }
                                                                        post(client => client.addAccountToUser({
                                                                            userName: data.name,
                                                                            accountName: accounts[index],
                                                                        })).then(() => {
                                                                            addNextAccount(index + 1, callback);
                                                                        });
                                                                    };
                                                                    addNextAccount(0, () => {
                                                                        const communications = userToEdit.communications || [];
                                                                        const addNextCommunication = (index, callback) => {
                                                                            if (index >= communications.length) {
                                                                                callback();
                                                                                return;
                                                                            }
                                                                            post(client => client.addCommunicationToUser({
                                                                                userName: data.name,
                                                                                communicationName: communications[index].name,
                                                                                communicationValue: communications[index].value,
                                                                            })).then(() => {
                                                                                addNextCommunication(index + 1, callback);
                                                                            });
                                                                        };
                                                                        addNextCommunication(0, () => {
                                                                            this.props.history.push(this.props.match.url.split("/").reverse().slice(pathToSliceOnBack).reverse().join("/"));
                                                                        });
                                                                    });
                                                                });
                                                            };
                                                            if (userEditMode) {
                                                                post(client => client.deleteUser({
                                                                    name: userToEdit.name,
                                                                })).then(() => {
                                                                    defaultUserCreateRoute();
                                                                });
                                                            } else {
                                                                defaultUserCreateRoute();
                                                            }
                                                        }}
                                                    >
                                                        {{
                                                            title: "A registration form",
                                                            description: "The description",
                                                            type: "object",
                                                            properties: {
                                                                "name": {
                                                                    type: "string",
                                                                    title: "The user name",
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
                                                                            label: `${account.name} (${account.email})`,
                                                                        })),
                                                                        enum: accountsData.map(account => account.name),
                                                                        description: "Account",
                                                                        minLength: 0,
                                                                        layout: "inlineLabel",
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
                        </div>
                    </Box>
                </Flex>
            </div>
        );
    }
}

export default withRouter(AddUserView);