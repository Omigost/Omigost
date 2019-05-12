import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";

import Form from "./index";
import { NodeType } from "./schemaTypes";

storiesOf("Form", module)
    .add("basic string form", () => {
        const Wrapper = styled.div`
            width: 40vw;
        `;
        return (
            <Wrapper>
                <Form
                    onSubmit={(value) => alert(JSON.stringify(value, null, 2))}
                >
                    {{
                        type: NodeType.OBJECT,
                        properties: {
                            "name": {
                                title: "User name",
                                type: NodeType.STRING,
                            },
                            "surname": {
                                title: "User surname",
                                type: NodeType.STRING,
                            },
                        },
                    }}
                </Form>
            </Wrapper>
        );
    })
    .add("nested objects", () => {
        const Wrapper = styled.div`
            width: 40vw;
        `;
        return (
            <Wrapper>
                <Form
                    onSubmit={(value) => alert(JSON.stringify(value, null, 2))}
                >
                    {{
                        type: NodeType.OBJECT,
                        properties: {
                            "basicInformation": {
                                title: "Basic user information",
                                type: NodeType.OBJECT,
                                properties: {
                                    "name": {
                                        title: "User name",
                                        type: NodeType.STRING,
                                    },
                                    "surname": {
                                        title: "User surname",
                                        type: NodeType.STRING,
                                    },
                                },
                            },
                            "extendedData": {
                                title: "Extended user information",
                                type: NodeType.OBJECT,
                                properties: {
                                    "address": {
                                        title: "Address",
                                        type: NodeType.OBJECT,
                                        properties: {
                                            "street": {
                                                title: "Street address",
                                                type: NodeType.STRING,
                                            },
                                            "no": {
                                                title: "Street number",
                                                type: NodeType.STRING,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    }}
                </Form>
            </Wrapper>
        );
    });
