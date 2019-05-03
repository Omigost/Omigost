import * as React from "react";
import * as moment from 'moment';
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
  width: 10vw;
`;

const UserEmailWrapper = styled.i`
  display: inline-block;
  margin-left: 1wv;
  
`

const UserIconsContainer = styled.div`
  display: inline-block;
  margin-left: 0.5vw;
`;

const UserItemIconDescription = styled.div`
  max-width: 20vw;
`;

const UserDetailRow = styled.div`
  width: 50%;
`;

const UserDetailName = styled.div`
  display: inline-block;
  width: 70%;
`;

const UserDetailValue = styled.div`
  display: inline-block;
  width: 30%;
  text-align: left;
`;

const truncateWithEllipses = (text, max) => {
    return text.substr(0,max-1)+(text.length>max?'...':''); 
}

interface TabAccountsState {
    activeItem: string;
}

class TabAccounts extends React.Component<any, TabAccountsState> {

    state: TabAccountsState;

    constructor(props) {
        super(props);

        this.state = {
            activeItem: null,
        };
    }

    render() {
        return (
            <this.props.app.client.component
                request={(client) => client.getAccounts()}
            >
                {({data, error, loading}, refresh) => {
                    if (loading || !data) return null;

                    return (
                        <this.props.app.client.component mutation>
                            {(mutationData, post) => {
                                return (
                                    <this.props.app.UI.DataProvider
                                        data={{
                                            columns: [],
                                            rows: data,
                                        }}
                                    >

                                        <PanelHeader>
                                            Accounts
                                        </PanelHeader>

                                        <this.props.app.UI.Dialog
                                            name="test-dialog-2"
                                            transparent
                                        >
                                            {({ closeDialog, parameters }) => {
                                                return (
                                                    <div>Hello!</div>
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
                                                                                        const { email, name } = row;

                                                                                        return (
                                                                                            <this.props.app.UI.Card
                                                                                                action={
                                                                                                    <this.props.app.UI.TinyButtons
                                                                                                        items={(this.state.activeItem === row.name) ? ([]) : ([
                                                                                                                {
                                                                                                                    icon: faCommentAlt.iconName,
                                                                                                                    onClick: () => this.setState({ activeItem: row.name }),
                                                                                                                },
                                                                                                        ])}
                                                                                                    />
                                                                                                }
                                                                                                description={
                                                                                                    <div>
                                                                                                        <UserNameWrapper>
                                                                                                            {name}
                                                                                                        </UserNameWrapper>
                                                                                                        <UserEmailWrapper>
                                                                                                            {email}
                                                                                                        </UserEmailWrapper>
                                                                                                        <UserIconsContainer>
                                                                                                        
                                                                                                        </UserIconsContainer>
                                                                                                        <this.props.app.UI.Collapse
                                                                                                            collapsed={this.state.activeItem !== row.name}
                                                                                                        >
                                                                                                            <UserDetailRow>
                                                                                                                <this.props.app.UI.ClipboardCopy text={row.id}>
                                                                                                                    <UserDetailName>
                                                                                                                        User ID is
                                                                                                                    </UserDetailName>
                                                                                                                    <UserDetailValue>
                                                                                                                        {truncateWithEllipses(row.id, 20)}
                                                                                                                    </UserDetailValue>
                                                                                                                </this.props.app.UI.ClipboardCopy>
                                                                                                            </UserDetailRow>
                                                                                                            <UserDetailRow>
                                                                                                                <this.props.app.UI.ClipboardCopy text={row.arn}>
                                                                                                                    <UserDetailName>
                                                                                                                        User ARN is
                                                                                                                    </UserDetailName>
                                                                                                                    <UserDetailValue>
                                                                                                                        {truncateWithEllipses(row.arn, 20)}
                                                                                                                    </UserDetailValue>
                                                                                                                </this.props.app.UI.ClipboardCopy>
                                                                                                            </UserDetailRow>
                                                                                                            <UserDetailRow>
                                                                                                                <this.props.app.UI.ClipboardCopy text={row.joinedTimestamp}>
                                                                                                                    <UserDetailName>
                                                                                                                        User joined
                                                                                                                    </UserDetailName>
                                                                                                                    <UserDetailValue>
                                                                                                                        {moment(row.joinedTimestamp).fromNow()}
                                                                                                                    </UserDetailValue>
                                                                                                                </this.props.app.UI.ClipboardCopy>
                                                                                                            </UserDetailRow>
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

export default withRouter(TabAccounts);