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

class CommunicationSettingsView extends React.Component<any, undefined> {

    render() {
        const { match: { params } } = this.props;

        return (
            <this.props.app.client.component
                request={(client) => client.getUsers()}
            >
                {({data, error, loading}, refresh) => {
                    if (loading || !data) return null;

                    const userData = data.find(user => user.name === params.user);
                    const communicationData = userData.communications[parseInt(params.com)];

                    return (
                        <div>
                            <PanelHeader>
                                Users
                                <this.props.app.UI.Breadcrumbs>
                                    {[
                                        {
                                            name: "Users",
                                            onClick: () => this.props.history.push(this.props.match.url.split("/").reverse().slice(4).reverse().join("/")),
                                        },
                                        {
                                            name: userData.name,
                                            onClick: () => this.props.history.push(this.props.match.url.split("/").reverse().slice(4).reverse().join("/")),
                                        },
                                        {
                                            name: `Communication via ${communicationData.name}`,
                                        },
                                    ]}
                                </this.props.app.UI.Breadcrumbs>
                            </PanelHeader>
                            <div>
                                {JSON.stringify(communicationData.value, null, 2)}
                            </div>
                            <Flex>
                                <Box p={2} width={1}>
                                    <div style={{ padding: "2vw", color: "black" }}>
                                        <this.props.app.client.component mutation>
                                            {({data, error, loading}, post) => {
                                                if (loading) return null;
                                                return (
                                                    <this.props.app.UI.Form
                                                        submitButton="Save settings"
                                                        onSubmit={(data) => {
                                                            post(client => client.deleteUserCommunication({
                                                                userName: userData.name,
                                                                communicationName: communicationData.name,
                                                                communicationValue: communicationData.value,
                                                            })).then(() => {
                                                                post(client => client.addCommunicationToUser({
                                                                    userName: userData.name,
                                                                    communicationName: communicationData.name,
                                                                    communicationValue: data.value,
                                                                })).then(() => {
                                                                    this.props.history.push(this.props.match.url.split("/").reverse().slice(4).reverse().join("/"));
                                                                });
                                                            });
                                                        }}
                                                    >
                                                        {{
                                                            title: "A registration form",
                                                            description: "The description",
                                                            type: "object",
                                                            properties: {
                                                                "value": {
                                                                    type: "string",
                                                                    title: "The Slack user name", // TODO make this dependent on the communcation type
                                                                    minLength: 1,
                                                                },
                                                            },
                                                        }}
                                                    </this.props.app.UI.Form>
                                                );
                                            }}
                                        </this.props.app.client.component>
                                    </div>
                                </Box>
                            </Flex>
                        </div>
                    );

                }}
            </this.props.app.client.component>
        );
    }
}

export default withRouter(CommunicationSettingsView);