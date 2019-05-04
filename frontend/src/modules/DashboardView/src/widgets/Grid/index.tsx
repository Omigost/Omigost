import * as React from "react";
import styled from "styled-components";

const GridWrapper = styled.div`
    height: 92%;
    width: 100%;
    position: relative;
    top: -1vw;
`;

export default (app) => ({
    name: "grid",
    description: "Budgeting data grid",
    initialOptions: {},
    content: (options) => (
        <app.client.component
            request={(client) => client.getUserSpendings({
                userId: "815845460664",
                "dateInterval": {
                    "start": "2019-01-01",
                    "end": "2019-04-29",
                },
            })}
        >
            {({data, error, loading}, refresh) => {
                if (loading || !data) return null;
                return (
                    <app.UI.DataProvider
                        data={{
                            columns: [
                                {
                                    name: "Day",
                                    field: "day",
                                    type: "string",
                                },
                                {
                                    name: "Spending",
                                    field: "spending",
                                    type: "string",
                                },
                            ],
                            rows: data,
                        }}
                    >
                        <GridWrapper>
                            <app.UI.DataGrid />
                        </GridWrapper>
                    </app.UI.DataProvider>
                );
            }}
        </app.client.component>
    ),
    width: 6,
    height: 7,
});