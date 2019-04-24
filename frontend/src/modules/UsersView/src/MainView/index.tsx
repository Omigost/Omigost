import * as React from "react";

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { withRouter } from "react-router-dom";

import {
    faCommentAlt, faCommentDots, faCommentSlash,
    faDownload, faEnvelope,
    faPlus, faTimes, faTools,
} from "@fortawesome/free-solid-svg-icons";

import {
    faSlackHash,
} from "@fortawesome/free-brands-svg-icons";


import { Box, Flex } from "@rebass/grid";

const GridWrapper = styled.div`
  height: 90vh;
  width: 100%;
`;

const PanelHeader = styled.div`
  font-family: ${(props) => props.theme.primaryFont};
  font-size: ${(props) => props.theme.fontSize.XXL};
  color: #727277;
  margin-left: 1vw;
  margin-top: 2vw;
`;

const UserItemIconWrapper = styled.span`
  display: inline-block;
  font-size: 1vw;
  margin-left: 0.2vw;
`;

const UserNameWrapper = styled.div`
  display: inline-block;
`;

const UserIconsContainer = styled.div`
  display: inline-block;
  margin-left: 0.5vw;
`;

const CommunicationDescriptionName = styled.span`
  margin-left: 0.3vw;
`;

const CommunicationCardExpandedListWrapper = styled.div`
  width: 50vw;
`;

const UserItemIconDescription = styled.div`
  max-width: 20vw;
`;

let DATA = {};

function getSpecsForCommunication(com) {
    if (com.name === "slack") {
        return {
            description: "This user will be notified by slack",
            icon: faSlackHash,
        };
    } else if (com.name === "email") {
        return {
            description: "This user will be notified by an email message",
            icon: faEnvelope.iconName,
        };
    } else if (com.name === "silent") {
        return {
            title: "No notifications",
            description: "This user won't receive any notifications. You can set them up via the settings button next to the user",
            icon: faCommentSlash.iconName,
        };
    }

    return {
        description: `This user will be notified using non-standard messaging method.`,
        icon: faCommentDots.iconName,
    };
}

const CommunicationCardListContainer = styled.div`
  width: 60vw;
`;

const AVAILABLE_COMMUNICATION_METHODS = [
    {
        name: "Slack",
        img: "https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/27/48/e1/2748e123-cf02-3d88-cfc8-e7753809a390/slack.png/320x0w.png",
        description: "Slack integration let you receive budgets notifications via Slack channel.",
        value: "slack",
    },
    {
        name: "Email",
        img: "https://img.icons8.com/pastel-glyph/384/secured-letter.png",
        description: "This communication channel let you receive an email every time we want you to notify you about the budgets.",
        value: "email",
    },
];

interface MainViewState {
    activeItem: string;
}

class MainView extends React.Component<any, MainViewState> {

    state: MainViewState;

    constructor(props) {
        super(props);

        this.state = {
            activeItem: null,
        };
    }

    componentDidMount() {
        DATA = {
            columns: [
                {
                    name: "Budget Name",
                    field: "name",
                    type: "string",
                },
            ],
            rows: [],
        };
    }

    render() {
        return (
            <this.props.app.client.component
                request={(client) => client.getUsers()}
            >
                {({data, error, loading}, refresh) => {
                    if (loading || !data) return null;

                    return (
                        <this.props.app.client.component mutation>
                            {(mutationData, post) => {
                                return (
                                    <this.props.app.UI.DataProvider
                                        data={{
                                            ...DATA,
                                            rows: data,
                                        }}
                                    >

                                        <PanelHeader>
                                            Users
                                        </PanelHeader>

                                        <this.props.app.UI.Dialog
                                            name="test-dialog"
                                            transparent
                                        >
                                            {({ closeDialog, parameters }) => {
                                                return (
                                                    <CommunicationCardListContainer>
                                                        <this.props.app.UI.CardVerticalList
                                                            onSelected={(item) => {
                                                                post(client => client.addCommunicationToUser({
                                                                    userName: parameters.userName,
                                                                    communicationName: item.value,
                                                                    communicationValue: "",
                                                                })).then(() => {
                                                                    closeDialog();
                                                                    refresh();
                                                                });
                                                            }}
                                                            items={parameters.availableCommunications}
                                                        />
                                                    </CommunicationCardListContainer>
                                                );
                                            }}
                                        </this.props.app.UI.Dialog>

                                        <this.props.app.UI.DialogsConsumer>
                                            {({ openDialog }) => {
                                                return (
                                                    <Flex>
                                                        <Box p={2} width={1}>
                                                            <Flex flexDirection="column">
                                                                <this.props.app.UI.ExportXLSX>
                                                                    {
                                                                        (doExport) => {
                                                                            return (
                                                                                 <this.props.app.UI.TinyButtons
                                                                                    items={
                                                                                        [
                                                                                            {
                                                                                                icon: faPlus.iconName,
                                                                                                text: "Add user",
                                                                                                onClick: () => {
                                                                                                  this.props.history.push(`${this.props.match.url}/users/add`);
                                                                                                },
                                                                                            },
                                                                                            {
                                                                                                icon: faDownload.iconName,
                                                                                                text: "Export CSV",
                                                                                                onClick: () => doExport({
                                                                                                    format: "csv",
                                                                                                }),
                                                                                            },
                                                                                        ]
                                                                                    }
                                                                                 />
                                                                            );
                                                                        }
                                                                    }
                                                                </this.props.app.UI.ExportXLSX>
                                                                <GridWrapper>
                                                                    <this.props.app.UI.CustomDataRenderer
                                                                        renderData={(data) => {
                                                                            return (
                                                                                <this.props.app.UI.SearchableList
                                                                                    renderItem={(row) => {
                                                                                        const name = row.name;
                                                                                        let communications = row.communications || [];

                                                                                        if (communications.length === 0) {
                                                                                            communications = [ { name: "silent" } ];
                                                                                        }

                                                                                        return (
                                                                                            <this.props.app.UI.Card
                                                                                                action={
                                                                                                    <this.props.app.UI.TinyButtons>
                                                                                                        {(this.state.activeItem === row.name) ? ([]) : ([
                                                                                                                {
                                                                                                                    icon: faCommentAlt.iconName,
                                                                                                                    onClick: () => this.setState({ activeItem: row.name }),
                                                                                                                },
                                                                                                        ])}
                                                                                                    </this.props.app.UI.TinyButtons>
                                                                                                }
                                                                                                description={
                                                                                                    <div>
                                                                                                        <UserNameWrapper>
                                                                                                            {name}
                                                                                                        </UserNameWrapper>
                                                                                                        <UserIconsContainer>
                                                                                                        {
                                                                                                            communications.map(com => {
                                                                                                                const { description, icon, title } = getSpecsForCommunication(com);
                                                                                                                return (
                                                                                                                    <UserItemIconWrapper>
                                                                                                                        <this.props.app.UI.Tooltip
                                                                                                                            content={
                                                                                                                                <div>
                                                                                                                                    <div>
                                                                                                                                        <FontAwesomeIcon icon={icon} />
                                                                                                                                        <CommunicationDescriptionName>
                                                                                                                                            {title || com.name}
                                                                                                                                        </CommunicationDescriptionName>
                                                                                                                                    </div>
                                                                                                                                    <UserItemIconDescription>
                                                                                                                                        {description}
                                                                                                                                    </UserItemIconDescription>
                                                                                                                                </div>
                                                                                                                            }
                                                                                                                        >
                                                                                                                            <FontAwesomeIcon icon={icon} />
                                                                                                                        </this.props.app.UI.Tooltip>
                                                                                                                    </UserItemIconWrapper>
                                                                                                                );
                                                                                                            })
                                                                                                        }
                                                                                                        </UserIconsContainer>
                                                                                                        <this.props.app.UI.Collapse
                                                                                                            collapsed={this.state.activeItem !== row.name}
                                                                                                        >
                                                                                                            <CommunicationCardExpandedListWrapper>
                                                                                                                <this.props.app.UI.PlainList
                                                                                                                    items={
                                                                                                                        communications.map((com, index) => {
                                                                                                                            const comMethod = AVAILABLE_COMMUNICATION_METHODS.find(item => item.value === com.name);
                                                                                                                            if (!comMethod) {
                                                                                                                                return null;
                                                                                                                            }

                                                                                                                            return {
                                                                                                                                img: comMethod.img,
                                                                                                                                name: comMethod.name || com.name,
                                                                                                                                actions: [
                                                                                                                                    {
                                                                                                                                        icon: faTimes.iconName,
                                                                                                                                        text: "Disable",
                                                                                                                                        onClick: () => {
                                                                                                                                            post(client => client.deleteUserCommunication({
                                                                                                                                                userName: row.name,
                                                                                                                                                communicationName: com.name,
                                                                                                                                                communicationValue: com.value,
                                                                                                                                            })).then(() => {
                                                                                                                                                refresh();
                                                                                                                                            });
                                                                                                                                        },
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        icon: faTools.iconName,
                                                                                                                                        text: "Settings",
                                                                                                                                        onClick: () => {
                                                                                                                                            this.props.history.push(`${this.props.match.url}/users/${row.name}/communication/${index}`);
                                                                                                                                        },
                                                                                                                                    },
                                                                                                                                ],
                                                                                                                            };
                                                                                                                        })
                                                                                                                    }
                                                                                                                />
                                                                                                            </CommunicationCardExpandedListWrapper>
                                                                                                            <this.props.app.UI.Button
                                                                                                                onClick={() => openDialog("test-dialog", {
                                                                                                                    userName: row.name,
                                                                                                                    availableCommunications: AVAILABLE_COMMUNICATION_METHODS,
                                                                                                                })}
                                                                                                            >
                                                                                                                Add new communication!
                                                                                                            </this.props.app.UI.Button>
                                                                                                        </this.props.app.UI.Collapse>
                                                                                                    </div>
                                                                                                }
                                                                                            />
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    {data.rows}
                                                                                </this.props.app.UI.SearchableList>
                                                                            );
                                                                        }}
                                                                    />
                                                                </GridWrapper>
                                                            </Flex>
                                                        </Box>
                                                    </Flex>
                                                );
                                            }}
                                        </this.props.app.UI.DialogsConsumer>
                                    </this.props.app.UI.DataProvider>
                                );
                            }}
                        </this.props.app.client.component>
                    );
                }}
            </this.props.app.client.component>
        );
    }
}

export default withRouter(MainView);