import * as React from "react";
import styled  from "styled-components";

import { Tab, Tabs as TabsComponent, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

const Wrapper = styled.div`
  padding: 1.2vw;
  width: 100%;
`;

export interface TabsSpecs {
    name: string;
    content: () => React.ReactNode;
}

export interface TabsProps {
    tabs: Array<TabSpecs>;
}

export default class Tabs extends React.Component<TabsProps, undefined> {
    render() {
        return (
            <Wrapper>
                <TabsComponent>
                    <TabList>
                        {this.props.tabs.map((tab, index) => (
                            <Tab key={`tab-${index}`}>
                                {tab.name}
                            </Tab>
                        ))}
                    </TabList>
                    {
                        this.props.tabs.map((tab, index) => {
                            return (
                                <TabPanel key={`tab-content-${index}`}>
                                    {tab.content()}
                                </TabPanel>
                            );
                        })
                    }
                </TabsComponent>
            </Wrapper>
        );
    }
}
