import * as React from "react";


import { Route } from "react-router";
import { withRouter } from "react-router-dom";


class InstanceSettingsPanel extends React.Component<any, undefined> {
    render() {

        return (
            <div>
                <Route
                    exact
                    path={`${this.props.match.url}`}
                    component={() => {
                        return (
                            <div>
                                <this.props.app.UI.Breadcrumbs>
                                    {[
                                        {
                                            name: "Settings",
                                            onClick: () => this.props.onGoBack(),
                                        },
                                        {
                                            name: "Instance settings",
                                        },
                                    ]}
                                </this.props.app.UI.Breadcrumbs>
                                <div>
                                    <this.props.app.client.component mutation>
                                        {(mutationData, post) => {
                                            return (
                                                <this.props.app.client.component
                                                    request={(client) => client.getSettings()}
                                                >
                                                    {({data, error, loading}, refresh) => {
                                                        if (loading || !data) return null;
                                                        const settings = data.properties || {};

                                                        const checkAssign = (props, key, value) => {
                                                            if (value !== null && typeof value !== "undefined") {
                                                                props[key] = value;
                                                            }
                                                        };

                                                        return (
                                                            <this.props.app.UI.Form
                                                                submitButton="Save the settings"
                                                                onSubmit={(data) => {
                                                                    const awsProperties = {};

                                                                    checkAssign(awsProperties, "logging.level.com.omigost.server", data.loggingLevel);
                                                                    checkAssign(awsProperties, "aws.region", data.awsRegion);

                                                                    checkAssign(awsProperties, "aws.accessKey", data.AWSCredentials.accessKey);
                                                                    checkAssign(awsProperties, "aws.secretKey", data.AWSCredentials.secretKey);

                                                                    checkAssign(awsProperties, "slack.oauth.bot.token", data.SlackCredentials.OAuthToken);

                                                                    checkAssign(awsProperties, "spring.datasource.url", data.ServicesSetup.Database.url);
                                                                    checkAssign(awsProperties, "spring.datasource.username", data.ServicesSetup.Database.login);
                                                                    checkAssign(awsProperties, "spring.datasource.password", data.ServicesSetup.Database.password);
                                                                    checkAssign(awsProperties, "localstack.postgres.useExternal", !data.ServicesSetup.Database.notUseExternal);

                                                                    checkAssign(awsProperties, "localstack.services.ip", data.ServicesSetup.sns.ip);
                                                                    checkAssign(awsProperties, "localstack.services.sns.port", data.ServicesSetup.sns.port);
                                                                    checkAssign(awsProperties, "localstack.services.useExternal", !data.ServicesSetup.sns.useExternal);

                                                                    checkAssign(awsProperties, "localstack.localAWSBudgets.ip", data.ServicesSetup.budgets.ip);
                                                                    checkAssign(awsProperties, "localstack.localAWSBudgets.port", data.ServicesSetup.budgets.port);
                                                                    checkAssign(awsProperties, "localstack.localAWSBudgets.useExternal", !data.ServicesSetup.budgets.useExternal);

                                                                    checkAssign(awsProperties, "localstack.motocker.iam.ip", data.ServicesSetup.iam.ip);
                                                                    checkAssign(awsProperties, "localstack.motocker.iam.port", data.ServicesSetup.iam.port);
                                                                    checkAssign(awsProperties, "localstack.motocker.iam.useExternal", !data.ServicesSetup.iam.useExternal);

                                                                    checkAssign(awsProperties, "localstack.motocker.ec2.ip", data.ServicesSetup.ec2.ip);
                                                                    checkAssign(awsProperties, "localstack.motocker.ec2.port", data.ServicesSetup.ec2.port);
                                                                    checkAssign(awsProperties, "localstack.motocker.ec2.useExternal", !data.ServicesSetup.ec2.useExternal);

                                                                    checkAssign(awsProperties, "localstack.motocker.organizations.ip", data.ServicesSetup.organizations.ip);
                                                                    checkAssign(awsProperties, "localstack.motocker.organizations.port", data.ServicesSetup.organizations.port);
                                                                    checkAssign(awsProperties, "localstack.motocker.organizations.useExternal", !data.ServicesSetup.organizations.useExternal);

                                                                    post(client => client.updateSettings({
                                                                        properties: awsProperties,
                                                                    })).then(() => {
                                                                        refresh();
                                                                    });
                                                                }}
                                                                defaultValue={{
                                                                    loggingLevel: settings["logging.level.com.omigost.server"],
                                                                    awsRegion: settings["aws.region"],
                                                                    AWSCredentials: {
                                                                        accessKey: settings["aws.accessKey"],
                                                                        secretKey: settings["aws.secretKey"],
                                                                    },
                                                                    SlackCredentials: {
                                                                        OAuthToken: settings["slack.oauth.bot.token"],
                                                                    },
                                                                    ServicesSetup: {
                                                                        Database: {
                                                                            url: settings["spring.datasource.url"],
                                                                            login: settings["spring.datasource.username"],
                                                                            password: settings["spring.datasource.password"],
                                                                            notUseExternal: !settings["localstack.postgres.useExternal"],
                                                                        },
                                                                        sns: {
                                                                            ip: settings["localstack.services.ip"],
                                                                            port: settings["localstack.services.sns.port"],
                                                                            notUseExternal: !settings["localstack.services.useExternal"],
                                                                        },
                                                                        budgets: {
                                                                            ip: settings["localstack.localAWSBudgets.ip"],
                                                                            port: settings["localstack.localAWSBudgets.port"],
                                                                            notUseExternal: !settings["localstack.localAWSBudgets.useExternal"],
                                                                        },
                                                                        iam: {
                                                                            ip: settings["localstack.motocker.iam.ip"],
                                                                            port: settings["localstack.motocker.iam.port"],
                                                                            notUseExternal: !settings["localstack.motocker.iam.useExternal"],
                                                                        },
                                                                        ec2: {
                                                                            ip: settings["localstack.motocker.ec2.ip"],
                                                                            port: settings["localstack.motocker.ec2.port"],
                                                                            notUseExternal: !settings["localstack.motocker.ec2.useExternal"],
                                                                        },
                                                                        organizations: {
                                                                            ip: settings["localstack.motocker.organizations.ip"],
                                                                            port: settings["localstack.motocker.organizations.port"],
                                                                            notUseExternal: !settings["localstack.motocker.organizations.useExternal"],
                                                                        },
                                                                    },
                                                                }}
                                                            >
                                                                {{
                                                                    title: "Instance settings",
                                                                    description: "Setup runtime application properties",
                                                                    type: "object",
                                                                    properties: {
                                                                        "loggingLevel": {
                                                                            type: "string",
                                                                            ui: "enum",
                                                                            enum: [
                                                                                "INFO",
                                                                                "DEBUG",
                                                                            ],
                                                                            title: "Application logging level",
                                                                        },
                                                                        "awsRegion": {
                                                                            type: "string",
                                                                            ui: "enum",
                                                                            enum: [
                                                                                "us-east-2",
                                                                                "us-east-1",
                                                                                "us-west-1",
                                                                                "us-west-2",
                                                                                "ap-east-1",
                                                                                "ap-south-1",
                                                                                "ap-northeast-2",
                                                                                "ap-southeast-1",
                                                                                "ap-southeast-2",
                                                                                "ap-northeast-1",
                                                                                "ca-central-1",
                                                                                "cn-north-1",
                                                                                "cn-northwest-1",
                                                                                "eu-central-1",
                                                                                "eu-west-1",
                                                                                "eu-west-2",
                                                                                "eu-west-3",
                                                                                "eu-north-1",
                                                                                "sa-east-1",
                                                                                "us-gov-east-1",
                                                                                "us-gov-west-1",
                                                                            ],
                                                                            title: "AWS Region name",
                                                                        },
                                                                        "AWSCredentials": {
                                                                            type: "object",
                                                                            title: "AWS credentials",
                                                                            properties: {
                                                                                "accessKey": {
                                                                                    type: "string",
                                                                                    nullable: true,
                                                                                    ui: "password",
                                                                                    title: "AWS Access Key",
                                                                                },
                                                                                "secretKey": {
                                                                                    type: "string",
                                                                                    nullable: true,
                                                                                    ui: "password",
                                                                                    title: "AWS Secret Key",
                                                                                },
                                                                            },
                                                                        },
                                                                        "SlackCredentials": {
                                                                            type: "object",
                                                                            title: "Slack credentials",
                                                                            properties: {
                                                                                "OAuthToken": {
                                                                                    type: "string",
                                                                                    title: "Slack Bot OAuth token",
                                                                                    nullable: true,
                                                                                    ui: "password",
                                                                                },
                                                                            },
                                                                        },
                                                                        "ServicesSetup": {
                                                                            type: "object",
                                                                            title: "Dependency services setup",
                                                                            properties: {
                                                                                "Database": {
                                                                                    type: "object",
                                                                                    title: "Database configuration",
                                                                                    properties: {
                                                                                        "url": {
                                                                                            type: "string",
                                                                                            title: "JDBC Url",
                                                                                        },
                                                                                        "login": {
                                                                                            type: "string",
                                                                                            title: "Database login",
                                                                                        },
                                                                                        "password": {
                                                                                            type: "string",
                                                                                            title: "Database password",
                                                                                            nullable: true,
                                                                                            ui: "password",
                                                                                        },
                                                                                        "notUseExternal": {
                                                                                            type: "boolean",
                                                                                            title: "Use Docker container via Docker deamon",
                                                                                        },
                                                                                    },
                                                                                },
                                                                                "sns": {
                                                                                    type: "object",
                                                                                    title: "AWS SNS Configuration",
                                                                                    properties: {
                                                                                        "ip": {
                                                                                            type: "string",
                                                                                            title: "SNS Service IP",
                                                                                        },
                                                                                        "port": {
                                                                                            type: "string",
                                                                                            title: "SNS Port",
                                                                                        },
                                                                                        "notUseExternal": {
                                                                                            type: "boolean",
                                                                                            title: "Use Docker container via Docker deamon",
                                                                                        },
                                                                                    },
                                                                                },
                                                                                "budgets": {
                                                                                    type: "object",
                                                                                    title: "AWS Budgets Configuration",
                                                                                    properties: {
                                                                                        "ip": {
                                                                                            type: "string",
                                                                                            title: "Budgets Service IP",
                                                                                        },
                                                                                        "port": {
                                                                                            type: "string",
                                                                                            title: "Budgets Port",
                                                                                        },
                                                                                        "notUseExternal": {
                                                                                            type: "boolean",
                                                                                            title: "Use Docker container via Docker deamon",
                                                                                        },
                                                                                    },
                                                                                },
                                                                                "iam": {
                                                                                    type: "object",
                                                                                    title: "AWS IAM Configuration",
                                                                                    properties: {
                                                                                        "ip": {
                                                                                            type: "string",
                                                                                            title: "IAM Service IP",
                                                                                        },
                                                                                        "port": {
                                                                                            type: "string",
                                                                                            title: "IAM Port",
                                                                                        },
                                                                                        "notUseExternal": {
                                                                                            type: "boolean",
                                                                                            title: "Use Docker container via Docker deamon",
                                                                                        },
                                                                                    },
                                                                                },
                                                                                "ec2": {
                                                                                    type: "object",
                                                                                    title: "AWS EC2 Configuration",
                                                                                    properties: {
                                                                                        "ip": {
                                                                                            type: "string",
                                                                                            title: "EC2 Service IP",
                                                                                        },
                                                                                        "port": {
                                                                                            type: "string",
                                                                                            title: "EC2 Port",
                                                                                        },
                                                                                        "notUseExternal": {
                                                                                            type: "boolean",
                                                                                            title: "Use Docker container via Docker deamon",
                                                                                        },
                                                                                    },
                                                                                },
                                                                                "organizations": {
                                                                                    type: "object",
                                                                                    title: "AWS Organizations Configuration",
                                                                                    properties: {
                                                                                        "ip": {
                                                                                            type: "string",
                                                                                            title: "Organizations Service IP",
                                                                                        },
                                                                                        "port": {
                                                                                            type: "string",
                                                                                            title: "Organizations Port",
                                                                                        },
                                                                                        "notUseExternal": {
                                                                                            type: "boolean",
                                                                                            title: "Use Docker container via Docker deamon",
                                                                                        },
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
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}

export default withRouter(InstanceSettingsPanel);